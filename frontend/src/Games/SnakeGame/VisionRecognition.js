import React from 'react'
import SnakeTrain from './SnakeTrain';
import { SnakeRule } from './SnakeRule';
import * as mobilenetModule from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import { range } from '@tensorflow/tfjs';
import { Link } from 'react-router-dom'

// Number of classes to classify
const NUM_CLASSES = 4;
// Webcam Image size. Must be 227. 
const IMAGE_SIZE = 227;
// K value for KNN
const TOPK = 10;

class VisionRecognition extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      training: -1,
      videoPlaying: false,
      showSR: false,
    }
    this.video = null;
    this.thumbNails = [];
    this.infoTexts = ["  동작을 등록해주세요!", "  동작을 등록해주세요!", "  동작을 등록해주세요!", "  동작을 등록해주세요!"];
    this.videoTag = React.createRef();

    // Initiate deeplearn.js math and knn classifier objects
    this.bindPage();
    this.mouseDownControl = this.mouseDownControl.bind(this)

    // Create video element that will contain the webcam image
    const video = document.createElement('video');
    video.setAttribute('autoplay', '');
    video.setAttribute('playsinline', '');
    this.video = video
    
    // Setup webcam
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (this.videoTag.current) {
          this.videoTag.current.srcObject = stream;
        }

        this.videoStream = stream;
        this.video.srcObject = stream;
        this.video.width = IMAGE_SIZE;
        this.video.height = IMAGE_SIZE;

        this.video.addEventListener('playing', () => this.setState({ videoPlaying: true }));
        this.video.addEventListener('paused', () => this.setState({ videoPlaying: false }));
      })
  }

  //capture
  getImage(i) {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {       
        const track = stream.getVideoTracks()[0];
        let imageCapture = new ImageCapture(track);
        imageCapture.takePhoto().then((imageBlob) => {
          this.thumbNails[i] = window.URL.createObjectURL(imageBlob)
        })
      })
  }

  async bindPage() {
    this.knn = knnClassifier.create();
    this.mobilenet = await mobilenetModule.load();

    this.start();
  }
  
  mouseDownControl(i) {
    this.setState({ training: i})
    this.getImage(i)
  }

  start() {
    if (this.timer) {
      this.stop();
    }
    this.video.play();
    this.timer = requestAnimationFrame(this.animate.bind(this));
  }

  stop() {
    this.video.pause();
    cancelAnimationFrame(this.timer);
  }

  async animate() {
    if (this.state.videoPlaying) {
      // Get image data from video element
      const image = tf.browser.fromPixels(this.video);

      let logits;
      // 'conv_preds' is the logits activation of MobileNet.
      const infer = () => this.mobilenet.infer(image, 'conv_preds');

      // Train class if one of the buttons is held down
      if (this.state.training != -1) {
        logits = infer();

        // Add current image to classifier
        this.knn.addExample(logits, this.state.training);
		    //console.log("help");
      }

      const numClasses = this.knn.getNumClasses();
      if (numClasses > 0) {

        // If classes have been added run predict
        logits = infer();
        const res = await this.knn.predictClass(logits, TOPK);

        let max = 0;

        for (let i = 0; i < NUM_CLASSES; i++) {

          // The number of examples for each class
          const exampleCount = this.knn.getClassExampleCount();

          // Make the predicted class bold
          // if (res.classIndex == i) {
          //   this.infoTexts[i].style.fontWeight = 'bold';
          // } else {
          //   this.infoTexts[i].style.fontWeight = 'normal';
          // }
		
    			let percentString = res.confidences[i];
    			let percent = parseFloat(percentString);
    			percent = Math.floor(percent * 100);

    			if(percent > max){
            this.props.onDirectionChange(i);
            max = percent;
    		  }
      
          // Update info text
          if (exampleCount[i] > 0) {
            this.infoTexts[i] = ` ${exampleCount[i]} examples - ${percent}%` 
          }
        }
        //reset
        max = 0;
      }

      // Dispose image when done
      image.dispose();
      if (logits != null) {
        logits.dispose();
      }
    }
    this.timer = requestAnimationFrame(this.animate.bind(this));
  }

  stopVideo() {
    if(this.videoStream) {
      console.log(this.videoStream)
      this.videoStream.getVideoTracks().forEach((track) => {
        track.stop();
      });
      this.videoStream.getAudioTracks().forEach((track) => {
        track.stop();
      });
      
      this.videoStream = null;
      this.videoTag.current.srcObject = null;
    }
  }



  render() {
    const imgClassname = ['snake-img-up', 'snake-img-down', 'snake-img-left', 'snake-img-right']
    return (
      <div className="vision-wrapper">
        <video
          autoPlay
          playsInline
          width="227px"
          height="227px"
          className="snake-video"
          ref={this.videoTag}
        />
        <div>
          {this.infoTexts.map((infoText, index) => (
            <div 
              key={index} 
              className={imgClassname[index]}
            >
              <img 
                width="220px"
                height="170px"
                src={this.thumbNails[index]}
                className="snake-capture"
              />
              <SnakeTrain 
                key={index}
                num={index}
                infoText={infoText}
                handleMouseDown={() => this.mouseDownControl(index)} 
                handleMouseUp={() => this.setState({training: -1})}
              />
            </div>
          ))}
        </div>
        <div>
          <button className="btn-snake btn-snake-rule" onClick={() => this.setState({showSR: true})}>게임방법</button>
          <Link to="/">
            <button className="btn-snake btn-snake-out" onClick={() => this.stopVideo()}>게임 나가기</button>
          </Link>
        </div>
        <SnakeRule
          isOpen={this.state.showSR}
          close={() => this.setState({showSR: false})}
        />
      </div>
    )
  }
}

export default VisionRecognition