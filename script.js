const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let ipName = prompt(`Enter Player's name:`)

const GameBoard = function (width, height) {
    this.width = width;
    this.height = height;

}

const Player = function (name, score = 0) {
    this.name = name;
    this.score = score;

    this.drawName = function () {
        ctx.font = "20px Arial";
        ctx.fillStyle = "#FF6D28";
        if (this.name !== '') {
            ctx.fillText(`Player: ${this.name}`, canvas.width - 115, 20);
        } else {
            ctx.fillText(`Player: Null`, canvas.width - 115, 20);
        }
    }

    this.drawScore = function () {
        ctx.font = "20px Arial";
        ctx.fillStyle = "#FF6D28";
        ctx.fillText(`Score: ${this.score}`, 8, 20);
    }

    this.increaseScore = function () {
        this.score++;
    }
}


const Ball = function (x = canvas.width / 2, y = canvas.height - 30, radius = 10, speedBall = 10) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    // this.radian = radian;
    this.speed_ball = speedBall;
    this.dx = 2;
    this.dy = -2;

    //Move
    this.moveBall = function () {
        this.x += this.dx;
        this.y += this.dy;
    }

    //Connect Paddle
    this.connectPaddle = function (newpaddle) {
        this.paddle = newpaddle;
    }

    this.changeDirection = function () {
        // Ball hit the wall
        if (this.x + this.dx > canvas.width - this.radius || (this.x + this.dx - this.radius) < 0) this.dx = -this.dx;
        if (this.y + this.dy < this.radius) this.dy = -this.dy
        // Paddle hit the ball
        else if (this.y + this.dy > canvas.height - this.radius * 2) {
            if (this.x > this.paddle.paddleX - this.radius && this.x < this.paddle.paddleX + this.paddle.paddleWidth + this.radius) {
                player.increaseScore();
                this.dy = -this.dy
            }
            else {
                if (this.y === canvas.height - this.radius) {
                    alert("GAME OVER");
                    document.getElementById("btn-reset").removeAttribute("disabled");
                    document.getElementById("btn-start").setAttribute("disabled","");
                    reset; // gọi tên hàm reset
                    clearInterval(interval);    //Sử dụng để xóa nhiệm vụ mà ta đã thiết lập trong phương thức setInterval().
                }
            }
        }
    }

    this.drawBall = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
};

const Paddles = function (paddleWidth = 75, paddleHeight = 10) {
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.paddleX = (canvas.width - this.paddleWidth) / 2;
    this.rightPressed = false;
    this.leftPressed = false;

    //Move
    this.movePaddles = function () {
        if (this.rightPressed) {
            this.paddleX = Math.min(this.paddleX + 5, canvas.width - this.paddleWidth);
        } else if (this.leftPressed) {
            this.paddleX = Math.max(this.paddleX - 5, 0);
        }

        // if (this.rightPressed) {
        //     this.paddleX = Math.min(this.paddleX + 5, canvas.width - this.paddleWidth);
        // } else if (this.leftPressed) {
        //     this.paddleX = Math.max(this.paddleX - 5, 0);
        // }
    }

    // Draw Paddle:
    this.drawPaddle = function () {
        ctx.beginPath();
        ctx.rect(this.paddleX, canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}


let ball = new Ball();
let paddle = new Paddles();
let player = new Player(ipName);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);


function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "D" || e.key === "d") {
        paddle.rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "A" || e.key === "a") {
        paddle.leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "D" || e.key === "d") {
        paddle.rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "A" || e.key === "a") {
        paddle.leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle.paddleX = relativeX - paddle.paddleWidth / 2;
    } else {
        if (relativeX <= 0) {
            paddle.paddleX = 0
        }

        if (relativeX >= canvas.width) {
            paddle.paddleX = canvas.width - paddle.paddleWidth;
        }
    }
}

const main = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    ball.connectPaddle(paddle);
    ball.changeDirection();
    ball.moveBall();
    paddle.drawPaddle();
    paddle.movePaddles();
    player.drawName();
    player.drawScore();
};


let interval;

function start() {
    var btn = document.getElementById("btn-start");
    if (btn.innerHTML.trim() === 'Start') {
        //start play
        interval = setInterval(main, 10); //gọi một hàm hoặc đánh giá một biểu thức sau một khoảng thời gian xác định (tính bằng mili giây)
        btn.innerHTML = 'Stop';
        btn.style.backgroundColor = "#DD5353";
    } else {
        //stop play
        clearInterval(interval);     //Sử dụng để xóa nhiệm vụ mà ta đã thiết lập trong phương thức setInterval().
        btn.innerHTML = 'Start';
        btn.style.backgroundColor = "#98A8F8";
    }
}

function reset() {
    document.location.reload(); //Load lại trang web
}