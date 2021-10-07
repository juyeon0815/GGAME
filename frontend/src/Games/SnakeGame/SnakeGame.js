import React, { Component } from 'react';
import axios from 'axios'
import VisionRecognition from './VisionRecognition';
import SnakeTitle from '../../assets/images/snake_title.GIF'
import SnakeImg from '../../assets/images/snake_main.png'
import './SnakeGame.css';

// game constants
const CANVAS_WIDTH = 650;
const CANVAS_HEIGHT = 650;
const SNAKE_LENGTH = 15; // should be divisible by both canvas height and width
const FRAME_RATE = 30;
const START_BUTTON = { width: 200, height: 50 };
START_BUTTON.x = CANVAS_WIDTH / 3;
START_BUTTON.y = (4 * CANVAS_HEIGHT) / 5 - START_BUTTON.height / 2;

const RESTART_BUTTON = { width: 200, height: 50 };
RESTART_BUTTON.x = CANVAS_WIDTH / 3;
RESTART_BUTTON.y = (4 * CANVAS_HEIGHT) / 5 - START_BUTTON.height / 2;

class SnakeGame extends Component {
  initialSnakeBody = [
    { x: 0 * SNAKE_LENGTH, y: 0 * SNAKE_LENGTH },
    { x: 1 * SNAKE_LENGTH, y: 1 * SNAKE_LENGTH },
    { x: 2 * SNAKE_LENGTH, y: 2 * SNAKE_LENGTH }
  ];
  initialDirections = { x: 1, y: 0 };
  initialSnakeSpeed = 5;

  constructor(props)
  {
    super(props);
    this.state = {
      canvas: null,
      ctx: null,
      vision: null,
      gameActive: false,
      direction: -1,
      isNew: true,
    }
    this.handleDirectionChange = this.handleDirectionChange.bind(this)
  }

  componentDidMount() {
    const cvs = document.getElementById('canvas');
    const ctx = cvs.getContext('2d');
    this.setState({ ctx: ctx });

    this.clearCanvas(ctx);
    this.drawStartButton(ctx);
    requestAnimationFrame(() => {this.update()});
  }

  update() {
    this.movePlayer();
    requestAnimationFrame(() => {this.update()});
  }

  handleDirectionChange(newdirection) {
    this.setState({
      direction: newdirection
    });
  }

  startGame = () => {
    const { canvas, createNewFood, drawGame } = this;
    this.setState(
      {
        food: createNewFood(),
        score: 0,
        gameActive: true,
        snakeBody: [...this.initialSnakeBody],
        snakeDirection: this.initialDirections,
        snakeSpeed: this.initialSnakeSpeed
      },
      () => {
        const cvs = document.getElementById('canvas');
        const ctx = cvs.getContext('2d');
        drawGame(ctx);
      }
    );
  };

  stopGame = ctx => {
    const { score, gameInterval } = this.state;
    const { highScore } = this.props;
    this.setState({ gameActive: false }, () => clearInterval(gameInterval));
    this.clearCanvas(ctx);
    this.setState({snakeBody: null, food: null, isNew: false});
    this.drawRanking(ctx, score);
  };

  drawRanking = (ctx, my_score) => {
    ctx.fillStyle = "RGB(179,161,151)";
    ctx.clearRect(50, 50, CANVAS_WIDTH-100, CANVAS_HEIGHT-100);
    ctx.fillRect(50, 50, CANVAS_WIDTH-100, CANVAS_HEIGHT-100);

    ctx.fillStyle = "black";
    ctx.font = "50px arcade-font";
    ctx.fillText(
      `RANKING`,
      CANVAS_WIDTH / 3,
      100
    );

    // mock server
    axios.get('https://bf644dcb-5b6d-4aef-bed5-a659391a90f8.mock.pstmn.io/ranking')
      .then((Response) => {
        const res = Response.data
        let temp = 0 
        for (let i = 0; i < res.length; i++) {
          // 내 점수와 비교
          if (my_score >= res[i]['score']) {
            ctx.fillText(
              `Your Score : ${my_score}`,
              CANVAS_WIDTH / 3,
              100 + 50*(i+1)
            );
            temp += 1
          }

          ctx.fillText(
            `${res[i]['name']} : ${res[i]['score']}`,
            CANVAS_WIDTH / 3,
            100 + 50*(i+temp+1)
          );
        }
      })
      .catch((Error)=>{console.log(Error)})

    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.strokeRect(
      RESTART_BUTTON.x,
      RESTART_BUTTON.y,
      START_BUTTON.width,
      START_BUTTON.height
    );
    ctx.font = "20px arcade-font";
    ctx.fillStyle = "black";
    ctx.fillText("다시하기", (2*CANVAS_WIDTH) / 5, (4 * CANVAS_HEIGHT) / 5 + 25);
  }

  drawGame = ctx => {
    let currentFrame = 0;
    const game = setInterval(() => {
      this.clearCanvas(ctx);
      this.displayScore(ctx);
      Math.floor(currentFrame % (FRAME_RATE / this.state.snakeSpeed)) === 0 &&
        this.moveSnake();
      this.drawFood(ctx);
      this.drawSnake(ctx);
      this.checkGameOver(ctx, game);
      currentFrame++;
    }, 1000 / FRAME_RATE);
    this.setState({
      gameInterval: game
    });
  };

  displayScore = ctx => {
    const { score } = this.state;
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(`Score: ${score}`, CANVAS_WIDTH * 0.5, 30);
  };

  drawSnake = ctx => {
    if (this.state.gameActive) {
      const { snakeBody } = this.state;
      ctx.strokeStyle = "green";
      for (let part of snakeBody) {
        ctx.strokeRect(part.x, part.y, SNAKE_LENGTH, SNAKE_LENGTH);
      }
    }
  };

  createNewFood = () => {
    const x = Math.floor(Math.random() * CANVAS_WIDTH);
    const y = Math.floor(Math.random() * CANVAS_HEIGHT);
    return {
      x: x - (x % SNAKE_LENGTH),
      y: y - (y % SNAKE_LENGTH)
    };
  };

  drawFood = ctx => {
    if (this.state.gameActive) {
      const { food } = this.state;
      ctx.fillStyle = "red";
      ctx.fillRect(food.x, food.y, SNAKE_LENGTH, SNAKE_LENGTH);
    }
  };

  moveSnake = () => {
    const { snakeDirection, snakeBody } = this.state;
    const snakeHead = snakeBody[snakeBody.length - 1];
    const newHead = {
      x: snakeHead.x + snakeDirection.x * SNAKE_LENGTH,
      y: snakeHead.y + snakeDirection.y * SNAKE_LENGTH
    };

    if (newHead.x >= CANVAS_WIDTH) {
      this.stopGame(this.state.ctx);  
    }
    if (newHead.x < 0) {
      this.stopGame(this.state.ctx);  
    }
    if (newHead.y >= CANVAS_HEIGHT) {
      this.stopGame(this.state.ctx);  
    }
    if (newHead.y < 0) {
      this.stopGame(this.state.ctx);  
    }

    snakeBody.push(newHead);
    snakeBody.shift();
    this.eatFood();
  };

  changeSnakeDirection = (x, y) => {
    // 위-아래 / 좌-우는 방향 안바뀌게
    this.setState(
      {
        snakeDirection: { x, y }
      },
    );
  };

  eatFood = () => {
    if (this.state.gameActive) {
      const { food, snakeBody } = this.state;
      const snakeHead = snakeBody[snakeBody.length - 1];
      if (food.x === snakeHead.x && food.y === snakeHead.y) {
        this.setState(
          prevState => ({
            ...prevState,
            food: this.createNewFood(),
            score: ++prevState.score
          }),
          () => {
            this.growSnake();
            this.adjustDifficulty();
          }
        );
      }
    }
  };

  growSnake = () => {
    const { snakeBody, snakeDirection } = this.state;
    const snakeTail = snakeBody[0];
    const newSnakeTail = {
      x: snakeTail.x - snakeDirection.x,
      y: snakeTail.y - snakeDirection.y
    };
    snakeBody.unshift(newSnakeTail);
  };

  adjustDifficulty = () => {
    const snakeLen = this.state.snakeBody.length;
    if (snakeLen % 10 === 0 && snakeLen < 100) {
      this.setState(prevState => ({
        ...prevState,
        snakeSpeed: prevState.snakeSpeed * 1.25
      }));
    }
  };

  checkSnakeTailCollision = () => {
    if (this.state.gameActive) {
      const { snakeBody } = this.state;
      const snakeHead = snakeBody[snakeBody.length - 1];
      for (let part of snakeBody) {
        if (
          part !== snakeHead &&
          part.x === snakeHead.x &&
          part.y === snakeHead.y
        ) {
          return true;
        }
      }
    }
  };

  checkGameOver = ctx => {
    const dead = this.checkSnakeTailCollision();
    if (dead) {
      this.stopGame(this.state.ctx);   
    } 
  };

  clearCanvas = ctx => {
    ctx.fillStyle = "RGB(220,220,200)";
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  drawStartButton = ctx => {      
    const titleImage = new Image();
    titleImage.src = SnakeTitle
    titleImage.onload = function () {
      ctx.drawImage(titleImage, CANVAS_WIDTH / 6, CANVAS_HEIGHT / 10)
    }

    const mainImage = new Image();
    mainImage.src = SnakeImg
    mainImage.onload = function () {
      ctx.drawImage(mainImage, CANVAS_WIDTH / 5, CANVAS_HEIGHT / 4, 350, 250)
    }

    ctx.fillStyle = "black";
    ctx.strokeStyle = "green";
    ctx.strokeRect(
      START_BUTTON.x,
      START_BUTTON.y,
      START_BUTTON.width,
      START_BUTTON.height
    );
    ctx.font = "20px arcade-font";
    ctx.fillStyle = "black";
    ctx.fillText("Click to Start", START_BUTTON.x + 30, START_BUTTON.y + 30);

    ctx.fillText(
      "학습을 완료하고 게임을 시작하세요",
      CANVAS_WIDTH / 4,
      START_BUTTON.y + 100
    );
  };

  handleClick = e => {
    const { layerX, layerY } = e.nativeEvent;
    const { gameActive, isNew } = this.state;
    // start
    if (
      !gameActive &&
      isNew &&
      layerX > START_BUTTON.x &&
      layerX < START_BUTTON.x + START_BUTTON.width &&
      layerY > START_BUTTON.y &&
      layerY < START_BUTTON.y + START_BUTTON.height
    ) {
      this.startGame();
    }
    // restart
    if (
      !gameActive &&
      !isNew &&
      layerX > RESTART_BUTTON.x &&
      layerX < RESTART_BUTTON.x + RESTART_BUTTON.width &&
      layerY > RESTART_BUTTON.y &&
      layerY < RESTART_BUTTON.y + RESTART_BUTTON.height
    ) {
      this.startGame();
    }
  };

  // teachable machine 움직임
  movePlayer() {
    if (this.state.gameActive) {
      const { snakeDirection } = this.state;
      switch (this.state.direction) {
      case 0:
        snakeDirection.y !== 1 && this.changeSnakeDirection(0, -1);
        break;
      case 1:
        snakeDirection.y !== -1 && this.changeSnakeDirection(0, 1);
        break;
      case 2:
        snakeDirection.x !== 1 && this.changeSnakeDirection(-1, 0);
        break;
      case 3:
        snakeDirection.x !== -1 && this.changeSnakeDirection(1, 0);
        break;
      }
    }
  }

  render() {
    return (
      <div className={"snake-container"}>
        <canvas 
          id="canvas"
          tabIndex="0"
          width={CANVAS_WIDTH} height={CANVAS_HEIGHT} 
          onClick={this.handleClick}/> 
        <VisionRecognition 
          onDirectionChange={this.handleDirectionChange}
        />
      </div>
    );
  }
}

export default SnakeGame;