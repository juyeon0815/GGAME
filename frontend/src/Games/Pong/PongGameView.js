/*
 * Some parts of the code for this app were taken from the Pong Game of Meth Meth Method.
 *
 * What: The basic structure of the game (define ball and players, their basic movements)
 * Where: https://github.com/meth-meth-method/pong
 * Why: We had no prior experience in game development, so we took inspiration from
 *      an existing pong game to create our own. However, we rewrote the original code in React,
 *      changed several methods and added many new features on top of it.
 */

import React, { Component } from "react";
import Ball from "./Ball";
import Player from "./Player";
import PongAchievement from "./PongAchievement";
import axios from 'axios'
import "./Pong.css";

import GestureRecognition from "./GestureRecognition";
import { PongRule } from "./PongRule";
import { Link } from "react-router-dom";

let gameWidth = 600,
  gameHeight = 400;

let rounds = [3, 7, "computer 10 points game over"];
let colors = ["#202020", "#4C4C4C", "#747474"];

let beep = new Audio(
  "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
);

class PongGameView extends Component {
  constructor(
    props //state값 초기화하거나 메서드 바인딩할때
  ) {
    super(props);
    this.state = {
      showPR: false,
      canvas: null,
      context: null,
      vision: null,
      gameActive: false,
      round: 0,
      boardColor: "#202020",
      direction: 2, //0 = UP, 1 = DOWN, 2 = IDDLE //초기 dirction 멈춤
      step : 1,
      showPA: false,
      achievement: []
    };
    this.initialSpeed = 250;
    this.ball = null;
    this.players = [];
  }

  //React native fct: invoked immediately after a component is mounted (inserted into the tree)
  componentDidMount() {
    //컴포넌트 마운트된 직후 호출
    const context = this.refs.canvas.getContext("2d"); //드로잉 컨텍스트에 액세스
    // this.drawText("Game over!");
    this.setState({ context: context });

    // 회원 정보 얻어오기
    let token = sessionStorage.getItem('token')
    axios.get("http://localhost:5000/user/me",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((result)=>{
      this.setState({ email: result.data.data[0].email})
      this.setState({ myName: result.data.data[0].name})
    })
    .catch((error) => {
      // 로그인 안되어 있을 시 로그인창으로 되돌리기
      console.log(error)
      alert('로그인이 필요한 페이지입니다.')
      document.location.href="/login"
    })

    this.initialize();
    requestAnimationFrame(() => {
      this.update();
    }); //애니메이션 구동 == 부드럽게 표현하기 위해서
  }

  update() {
    const cvs = this.state.canvas;

    if (this.state.gameActive) {
      //만약 게임 활성화되어있으면
      let dt = 0.02;
      const ball = this.ball;
      ball.pos.x += ball.vel.x * dt;
      ball.pos.y += ball.vel.y * dt;

      if (ball.right < 0 || ball.left > cvs.width) {
        ++this.players[(ball.vel.x < 0) | 0].score;
        this.reset(cvs);
        this.play();
      }

      if ((ball.vel.y < 0 && ball.top < 0) || (ball.vel.y > 0 && ball.bottom > cvs.height)) {
        ball.vel.y = -ball.vel.y;

        //avoid having the ball bouncing vertically
        if (ball.vel.x < 80 && ball.vel.x > -80) ball.vel.x += 100;
      }

      //if the ball is not boucing vertically, follow it
      if (!(ball.vel.x < 70 && ball.vel.x > -70)) {
        //the AI will follow the ball with an offset factor that decreases after each round
        this.players[1].pos.y = ball.pos.y * (1.4 - this.state.round / 10);
      }

      //prevent the paddles from going outside the board region
      this.players.forEach((player) => {
        if (player.pos.y - player.size.y / 2 <= 0) player.pos.y = player.size.y / 2;
        else if (player.pos.y >= cvs.height - player.size.y / 2)
          player.pos.y = cvs.height - player.size.y / 2;
      });

      this.players.forEach((player) => {
        player.update(dt);
        this.collide(player, ball);
      });

      //draw the board, the ball and the players
      this.draw();

      this.renderScore();

      // this.setState({
      //   direction: this.state.vision.direction //여기서 방향 전환
      // });
      // console.log("방향~",this.state.direction);
      this.movePlayer();

      if (this.state.step < 3) {
        //1,2라운드일 경우 =>
        if (this.players[0].score === rounds[this.state.round]) {
          //내가 이기는 방법
          this.ball.vel.x *= 1.3;
          this.ball.vel.y *= 1.3;

          let nextRound = this.state.round + 1;
          this.setState({
            step: this.state.step + 1,
            round: nextRound,
            boardColor: colors[nextRound],
          });
        } else if (this.players[1].score === rounds[this.state.round]) {
          //컴퓨터가 이길때
          this.setState({ gameActive: false });
          // 게임 결과 보내기
          console.log('게임결과보내기1')
          axios({
            method: 'post',
            url: 'http://localhost:5000/game/rank',
            data: { type: 'pong', email: this.state.email, score: this.players[0].score },
            headers: { 'Content-Type': 'application/json' },
            })
            .then( response => { this.drawRanking(this.players[0].score) } )
            .catch( response => { console.log(response) } );
          
          cvs.addEventListener("click", () => {
            this.initialize();
          });
        }
      } else {
        //3라운드일경우 => 무한대
        if (this.players[1].score === 10) {
          //컴퓨터가 이겨서 끝나는 조건만 체크
          this.setState({ gameActive: false });
          this.drawRanking(this.players[0].score)
          // this.drawText("Game over! 내 점수는 : "+this.players[0].score);
          // 게임 결과 보내기
          console.log('게임결과보내기2')
          axios({
            method: 'post',
            url: 'http://localhost:5000/game/rank',
            data: { type: 'pong', email: this.state.email, score: this.players[0].score },
            headers: { 'Content-Type': 'application/json' },
            })
            .then( response => { this.drawRanking(this.players[0].score) } )
            .catch( response => { console.log(response) } );
          cvs.addEventListener("click", () => {
            this.initialize();
          });
        }
      }
    } else {
      cvs.addEventListener("click", () => {
        this.initialize();
      });
    }
    // Next frame
    requestAnimationFrame(() => {
      this.update();
    });
  }

  drawRanking = (my_score) => {
    let canvas = this.state.canvas;
    let ctx = this.state.context;

    ctx.fillStyle = this.state.boardColor;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
    ctx.fillStyle = "white";
    ctx.font = "40px MaplestoryOTFBold";
    ctx.fillText(
      `RANKING`,
      canvas.width / 2,
      50
    );
    ctx.font = "20px MaplestoryOTFBold";
    ctx.fillText(
      `RANK  :     SCORE  :     NAME`,
      canvas.width / 2,
      100
    );
    console.log('랭킹 받아오기')
    axios.get('http://localhost:5000/game/rank', {params:{type: 'pong'}})
      .then((Response) => {

        const res = Response.data.data
        const resLength = (res.length <5 ? res.length : 5)
        let meCheck = false
        for (let i = 0; i < resLength; i++) {
          // 나일 경우 다르게 표시하기
          if (res[i]['name'] === this.state.myName && res[i]['score'] === my_score) {
            ctx.fillStyle = "blue";
            ctx.fillText(
              `${i+1}위                ${res[i]['score']}점                ${res[i]['name']}       NEW!`,
              canvas.width / 2,
              100 + 50*(i+1)
            );
            meCheck = true;
          } else {
            ctx.fillStyle = "white";
            ctx.fillText(
              `${i+1}위                ${res[i]['score']}점                ${res[i]['name']}`,
              canvas.width / 2,
              100 + 50*(i+1)
            );
          }
        }
        if (!meCheck) {
          ctx.fillStyle = "blue";
          ctx.fillText(
            `NEW!                ${my_score}점                ${this.state.myName}`,
            canvas.width / 2,
            100 + 50*(resLength + 1)
          );
        }
        this.checkNewAchievement()
      })
      .catch((Error)=>{console.log(Error)})

    canvas.addEventListener("click", () => {
      this.initialize();
    });
  }

  checkNewAchievement() {
    // 업적달성 확인
    axios.get("http://localhost:5000/game/pong/new-achievement", {params:{email : this.state.email}})
    .then((res)=>{
      if (res.data.data.length >= 1) {
        this.setState({ showPA: true, achievement: res.data.data})
      }
    }).catch((error)=>{
        console.log("error :", error);
    })
  }

  initialize() {
    //게임 초기화 ( 공 + 플레이어 생성 )
    const cvs = this.refs.canvas;
    const context = cvs.getContext("2d");

    this.setState({
      canvas: cvs,
      context: context,
      gameActive: true,
      round: 0,
      step: 1,
      boardColor: "#202020",
      direction: 2, //초기 상태는 멈춤
    });

    //Create ball and players
    this.ball = new Ball();
    this.players = [new Player(), new Player()];

    this.players[0].pos.x = 40;
    this.players[0].pos.y = 0;
    this.players[1].pos.x = cvs.width - 40;
    this.players.forEach((p) => {
      p.pos.y = cvs.height / 2;
    });

    this.reset(cvs);
    this.listen(cvs);
  }

  reset(cvs) {
    const b = this.ball;
    b.vel.x = 0;
    b.vel.y = 0;
    b.pos.x = cvs.width / 2;
    b.pos.y = cvs.height / 2;
  }

  collide(player, ball) {
    if (
      player.left < ball.right &&
      player.right > ball.left &&
      player.top < ball.bottom &&
      player.bottom > ball.top
    ) {
      ball.vel.x = -ball.vel.x * 1.05;
      const len = ball.vel.len;
      ball.vel.y += player.vel.y * 0.2;
      ball.vel.len = len;
      beep.play(); //충돌 소리
    }
  }

  listen(canvas) {
    canvas.addEventListener("click", () => {
      this.play();
    }); // canvas 클릭 시 게임 시작

    // canvas.addEventListener("mousemove", (event) => {
    //   // paddle mouse로 조작가능
    //   const scale = event.offsetY / event.target.getBoundingClientRect().height;
    //   this.players[0].pos.y = canvas.height * scale;
    // });
  }

  play() {
    const b = this.ball;
    if (b.vel.x === 0 && b.vel.y === 0) {
      b.vel.x = 200 * (Math.random() > 0.5 ? 1 : -1);
      b.vel.y = 200 * (Math.random() * 2 - 1);
      b.vel.len = this.initialSpeed;
    }
  }

  /*
   * If ball in certain region of player, we automatically move player to block the ball
   */
  helpPlayer() {
    let playerPosX = this.players[0].pos.x;
    let playerPosY = this.players[0].pos.y;
    let playerHeight = this.players[0].size.y;
    let ballPosX = this.ball.pos.x;
    let ballPosY = this.ball.pos.y;
    let margin = 30;

    let topLimit = playerPosY + playerHeight / 2 + margin;
    let bottLimit = playerPosY - playerHeight / 2 - margin;

    let cdt1 = ballPosY > playerPosY + playerHeight / 2 && ballPosY < topLimit;
    let cdt2 = ballPosY > bottLimit && ballPosY < playerPosY - playerHeight / 2;

    if ((cdt1 || cdt2) && ballPosX < playerPosX + 30) {
      if (ballPosY > playerPosY) this.players[0].pos.y += 15;
      else this.players[0].pos.y -= 15;
    }
  }

  movePlayer() {
    //only help the user if the ball is not boucing vertically (otherwise it will follow it and bounce itself)
    if (!(this.ball.vel.x < 50 && this.ball.vel.x > -50)) {
      this.helpPlayer();
    }
    if (this.state.direction === 0) {
      //위로
      this.players[0].pos.y -= 10;
    } else if (this.state.direction === 1) {
      //아래로
      this.players[0].pos.y += 10;
    }
  }

  draw() {
    //draw board
    let cvs = this.state.canvas;
    let ctx = this.state.context;

    ctx.fillStyle = this.state.boardColor;
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    let img = new Image();
    img.src = "./img/texture-background-wallpaper-black-wood1-1920x1080.jpg";
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };

    ctx.shadowBlur = 5; //Add some shadows to every element
    ctx.shadowColor = "#ddd"; //Silver

    //Draw the middle line
    ctx.beginPath();
    ctx.strokeStyle = "#ddd";
    ctx.moveTo(cvs.width / 2, 60);
    ctx.lineTo(cvs.width / 2, cvs.height);
    ctx.stroke();

    this.ball.render(ctx);
    //this.players.forEach(player => player.render(context));
    this.players[0].renderPlayer1(ctx); //player paddle 그리기
    this.players[1].renderPlayer2(ctx);
  }

  renderScore() {
    let canvas = this.state.canvas;
    let ctx = this.state.context;
    //round info
    let roundText = "Round " + (this.state.round + 1);
    let roundPts = rounds[this.state.round];
    if (this.state.step < 3) roundPts += " pts";
    ctx.fillStyle = "#fff";
    ctx.shadowBlur = 0;
    ctx.font = 15 + "px oswald";
    ctx.textAlign = "center";
    ctx.fillText(roundText, canvas.width / 2, 20);
    ctx.fillText(roundPts, canvas.width / 2, 40);

    //score
    const fontSize = 40;
    ctx.font = fontSize + "px oswald";
    ctx.fillStyle = "#fff";
    ctx.fillText(this.players[0].score, canvas.width / 2 - 100, 80);
    ctx.fillText(this.players[1].score, canvas.width / 2 + 100, 80);
  }

  drawText(text) {
    let canvas = this.state.canvas;
    let ctx = this.state.context;
    const fontSize = 30;
    ctx.font = fontSize + "px oswald";
    ctx.shadowBlur = 2;
    ctx.shadowColor = "#0086f8";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  }

  direction = (text) => {
    // console.log(text);
    this.setState({
      direction: text,
    });
  };

  stopVideo() {
    if (this.videoStream) {
      console.log(this.videoStream);
      this.videoStream.getVideoTracks().forEach((track) => {
        track.stop();
      });
      this.videoStream.getAudioTracks().forEach((track) => {
        track.stop();
      });

      this.videoStream = null;
      this.videoTag.current.srcObject = null;
    }

    this.initialize();
  }

  render() {
    return (
      <div className="pong-container">
        <h1>PingPong</h1>
        <div className="pong-main">
          <canvas ref="canvas" width={gameWidth} height={gameHeight} />
          <GestureRecognition direction={this.direction} />
        </div>
        <div>
          <button
            className="btn-pong btn-pong-rule"
            onClick={() => this.setState({ showPR: true })}
          >
            게임방법
          </button>
          <Link to="/">
            <button className="btn-pong btn-pong-out" onClick={() => this.stopVideo()}>
              게임나가기
            </button>
          </Link>
        </div>
        <PongRule
          isOpen = {this.state.showPR}
          close={()=> this.setState({showPR:false})}
        />
        <PongAchievement
          isOpen={this.state.showPA}
          close={() => this.setState({showPA: false})}
          achievement={this.state.achievement}
        />
      </div>
    );
  }
}

export default PongGameView;
