let canvas = document.getElementById('box');
let ctx = canvas.getContext('2d');

let raf;
let running = false;
let index = 0;


let ball = {
    x: 100,
    y: 100,
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
    if (ball.tail.length < 10 && index % 3 == 0) {
        ball.tail.push([ball.x, ball.y])
        index = 0
    } else if (ball.tail.length == 10 && index % 3 == 0) {
        ball.tail.shift()
        ball.tail.push([ball.x, ball.y])
        index = 0
    }



    ball.tail.forEach((el) => {
        ball.draw(el[0], el[1])
    })


    ball.x += ball.vx;
    ball.y += ball.vy;



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


// on mouse move change angle 
canvas.addEventListener('mousemove', function (e) {
    if (running) {
        let len = Math.sqrt(Math.pow(ball.tail.at(-1)[0] - e.clientX, 2) + Math.pow(ball.tail.at(-1)[1] - e.clientY, 2))
        let scale = 3 / len

        ball.vx = ((e.clientX - ball.tail.at(-1)[0]) * scale)
        ball.vy = ((e.clientY - ball.tail.at(-1)[1]) * scale)
    }
});

canvas.addEventListener('mouseover', function (e) {
    if (!running) {
        raf = window.requestAnimationFrame(draw);
        running = true;
    }
});

canvas.addEventListener('mouseout', function (e) {
    window.cancelAnimationFrame(raf);
    running = false;
});

ball.draw();