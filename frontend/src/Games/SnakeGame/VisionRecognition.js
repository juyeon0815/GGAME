import React from 'react'
import SnakeTrain from './SnakeTrain';
import * as mobilenetModule from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import { range } from '@tensorflow/tfjs';

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
      video: null,
      stream: null,
    }

    // Initiate variables
    this.infoTexts = [" No examples added", " No examples added", " No examples added", " No examples added"];
    this.training = -1; // -1 when no class is being trained
    this.videoPlaying = false;
    this.thumbNails = [];
    this.videoTag = React.createRef()

    // Initiate deeplearn.js math and knn classifier objects
    this.bindPage();
    this.mouseDownControl = this.mouseDownControl.bind(this)

    // Direction of hand (where to move paddle): 1 if up, 0 if down (-1 if no direction set)
    this.direction = -1;

    // Create video element that will contain the webcam image
    const video = document.createElement('video');
    video.setAttribute('autoplay', '');
    video.setAttribute('playsinline', '');
    // this.setState({ video: video })
    this.state.video = video
    // document.getElementById("videoDiv").appendChild(this.state.video);
    // document.body.appendChild(this.state.video)
    
    // Setup webcam
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (this.videoTag.current) {
          this.videoTag.current.srcObject = stream;
        }

        this.state.video.srcObject = stream;
        this.state.video.width = IMAGE_SIZE;
        this.state.video.height = IMAGE_SIZE;

        this.state.video.addEventListener('playing', () => this.videoPlaying = true);
        this.state.video.addEventListener('paused', () => this.videoPlaying = false);
      })
  }

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
    this.training = i
    this.getImage(i)
  }

  start() {
    if (this.timer) {
      this.stop();
    }
    this.state.video.play();
    this.timer = requestAnimationFrame(this.animate.bind(this));
  }

  stop() {
    this.state.video.pause();
    cancelAnimationFrame(this.timer);
  }

  async animate() {
    if (this.videoPlaying) {
      // Get image data from video element
      const image = tf.browser.fromPixels(this.state.video);

      let logits;
      // 'conv_preds' is the logits activation of MobileNet.
      const infer = () => this.mobilenet.infer(image, 'conv_preds');

      // Train class if one of the buttons is held down
      if (this.training != -1) {
        logits = infer();

        // Add current image to classifier
        this.knn.addExample(logits, this.training);
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
              //console.log("Up: " + direction);
              this.direction = i;
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



  render() {
    return (
      <div>
        <button>게임방법</button>
        <p>사용자 모션 입력</p>
        <video
          autoPlay
          playsInline
          width="227"
          height="227"
          ref={this.videoTag}
        />
        {/* <SnakeVideo /> */}
        <div>
          <img 
            width="100px"
            height="100px"
            src={this.thumbNails[0]}
          />
          <img 
            width="100px"
            height="100px"
            src={this.thumbNails[1]}
          />
          <img 
            width="100px"
            height="100px"
            src={this.thumbNails[2]}
          />
          <img 
            width="100px"
            height="100px"
            src={this.thumbNails[3]}
          />
        </div>
        {/* <SnakeTrain /> */}
        <div>
          <div>
            <button 
              onMouseDown={() => this.mouseDownControl(0)}
              onMouseUp={() => this.training = -1}
            >위
            </button>
            <span>{this.infoTexts[0]}</span>
          </div>
          <div>
            <button 
              onMouseDown={() => this.mouseDownControl(1)}
              onMouseUp={() => this.training = -1}
            >아래
            </button>
            <span>{this.infoTexts[1]}</span>
          </div>
          <div>
            <button 
              onMouseDown={() => this.mouseDownControl(2)}
              onMouseUp={() => this.training = -1}
            >왼쪽
            </button>
            <span>{this.infoTexts[2]}</span>
          </div>
          <div>
            <button 
              onMouseDown={() => this.mouseDownControl(3)}
              onMouseUp={() => this.training = -1}
            >오른쪽
            </button>
            <span>{this.infoTexts[3]}</span>
          </div>
        </div>
        <button>게임나가기</button>
      </div>
    )
  }
}

export default VisionRecognition