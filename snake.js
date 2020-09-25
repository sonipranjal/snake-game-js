function init() {
    canvas = document.getElementById("mycanvas");
    W = H = canvas.width = canvas.height = 1000;
    pen = canvas.getContext('2d');
    cs = 50;
    game_over = false;
    food = getRandomFood();
    score = 0;

    //create image object for food and trophy
    food_img = new Image();
    food_img.src = "Assets/apple.png";

    trophy_img = new Image();
    trophy_img.src = "Assets/trophy.png";

    snake = {
        init_len: 5,
        color: "brown",
        cells: [],
        direction: 'right',

        createSnake: function () {
            for (let i = this.init_len; i > 0; i--) {
                this.cells.push({
                    x: i,
                    y: 0
                });
            }
        },

        drawSnake: function () {
            for (let i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 1, cs - 1);
            }
        },

        updatesnake: function () {
            // console.log("in update section!");

            let headX = this.cells[0].x;
            let headY = this.cells[0].y;

            if (headX == food.x && headY == food.y) {
                console.log("food eaten");
                food = getRandomFood();
                score++;
            }
            else {
                this.cells.pop();
            }

            let X = headX + 1;
            let Y = headY;

            let nextx, nexty;

            if (this.direction == "right") {
                nextx = headX + 1;
                nexty = headY;
            } else if (this.direction == "left") {
                nextx = headX - 1;
                nexty = headY;
            } else if (this.direction == "up") {
                nextx = headX;
                nexty = headY - 1;
            } else {
                nextx = headX;
                nexty = headY + 1;
            }

            this.cells.unshift({
                x: nextx,
                y: nexty
            });

            let lastx = Math.round(W / cs);
            let lasty = Math.round(H / cs);

            if (this.cells[0].x < 0 || this.cells[0].y < 0 || this.cells[0].x > lastx || this.cells[0].y > lasty) {
                game_over = true;
            }

        }
    };

    snake.createSnake();

    //add event listener to document object modal

    function KeyPressed(e) {
        // console.log("key is pressed!",e.key);

        if (e.key == "ArrowDown" || e.key == "s") {
            snake.direction = "down"
        } else if (e.key == "ArrowUp" || e.key == "w") {
            snake.direction = "up"
        } else if (e.key == "ArrowRight" || e.key == "d") {
            snake.direction = "right"
        } else if (e.key == "ArrowLeft" || e.key == "a") {
            snake.direction = "left"
        }

    }

    document.addEventListener('keydown', KeyPressed);

}

function draw() {
    //erase the old frame
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
    pen.drawImage(trophy_img,10,10,cs*2,cs*2);
    
    // pen.fillStyle(food.color);
    // pen.fillStyle = "White";
    pen.font = "50px Roboto";
    pen.fillText(score,50,60);

}

function update() {
    snake.updatesnake();

}

function getRandomFood() {
    let foodx = Math.round(Math.random() * (W - cs) / cs);
    let foody = Math.round(Math.random() * (H - cs) / cs);

    let food = {
        x: foodx,
        y: foody,
        color: "red",
    }

    return food;
}

function gameloop() {
    // console.log("in game loop");
    if (game_over) {
        clearInterval(f);
        alert("Game over!");
    }
    draw();
    update();
}

init();
var f = setInterval(gameloop, 100);