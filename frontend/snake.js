const container = document.getElementById('world')
let canvas = document.getElementById('box');
let ctx = canvas.getContext('2d');


let raf;
let running = false;
let index = 0;
let len = 10;


let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;

let ball = {
    x: centerX,
    y: centerY,
    screenX: 0,
    screenY: 0,
    vx: 0,
    vy: 0,
    radius: 25,
    color: 'blue',
    tail: [],



    draw: function (x, y) {
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.arc(x, y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();

    },

};


function draw() {


    ctx.clearRect(0, 0, canvas.width, canvas.height);

    index++
    if (ball.tail.length < len && index % 1 == 0) {
        ball.tail.push([ball.x, ball.y])
        index = 0
    } else if (ball.tail.length == len && index % 1 == 0) {
        ball.tail.shift()
        ball.tail.push([ball.x, ball.y])
        index = 0
    }


    ball.tail.forEach((el) => {
        ball.draw(el[0], el[1])
    })

    ball.x += ball.vx;
    ball.y += ball.vy;


    food_coordinates.forEach((food) => {
        if (Math.sqrt(Math.pow(food['x'] - ball.x, 2) + Math.pow(food['y'] - ball.y, 2)) < 25) {
            let index = food_coordinates.indexOf(food);
            food_coordinates.splice(index, 1)
            ctx_food.clearRect(food['x'] - food['radius'], food['y'] - food['radius'], 2 * food['radius'], 2 * food['radius']);
            len++
        }
    })


    ball.screenX = (ball.x < centerX) ? 0 : (ball.x > (2000 - centerX)) ? (2000 - (2 * centerX)) : (ball.x - centerX);
    ball.screenY = (ball.y < centerY) ? 0 : (ball.y > (2000 - centerY)) ? (2000 - (2 * centerY)) : (ball.y - centerY);


    container.scrollTo((ball.x - centerX), (ball.y - centerY))




    if (ball.y + ball.vy > canvas.height ||
        ball.y + ball.vy < 0) {
        ball.vy = -ball.vy;
    }
    if (ball.x + ball.vx > canvas.width ||
        ball.x + ball.vx < 0) {
        ball.vx = -ball.vx;
    }

    raf = window.requestAnimationFrame(draw);
}