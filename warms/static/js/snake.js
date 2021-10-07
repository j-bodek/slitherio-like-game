const container = document.getElementById('world')
let canvas = document.getElementById('box');
let ctx = canvas.getContext('2d');


const roomName = JSON.parse(document.getElementById('room-name').textContent);

const chatSocket = new WebSocket(
    'ws://' +
    window.location.host +
    '/ws/chat/' +
    roomName +
    '/'
);


let raf;
let running = false;
let index = 0;
let lose_mass = 1;
let len = 10;
let speed = 3;
let mass_losing_speed = 100;
let warmParts = []


let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;



class warmPart {
    constructor(x, y, velocityX, velocityY, color, radius) {
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.color = color;
        this.radius = radius;
    }

    draw_part() {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.draw_part()
        // lose speed
        this.x += .98 * this.velocityX
        this.y += .98 * this.velocityY
        this.velocityX = .98 * this.velocityX
        this.velocityY = .98 * this.velocityY

        // bounce from wall
        if ((this.y > canvas.height && this.velocityY > 0) ||
            (this.y < 0 && this.velocityY < 0)) {
            this.velocityY = -this.velocityY
        }
        if ((this.x > canvas.width && this.velocityX > 0) ||
            (this.x < 0 && this.velocityX < 0)) {
            this.velocityX = -this.velocityX
        }
    }
}





let ball = {
    x: centerX,
    y: centerY,
    screenX: 0,
    screenY: 0,
    vx: 0,
    vy: 0,
    radius: 25,
    color: '#e9c46a',
    shade: '#F2DCA6',
    tail: [],



    draw: function (x, y, radius, color) {

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();

    },

};



let leave_mass = function () {
    ball.tail.forEach((e) => {
        let x = Math.floor(e[0] + (Math.random() * 40));
        let y = Math.floor(e[1] + (Math.random() * 40));
        let radius = (2 + Math.floor(Math.random() * 4));
        let color = 'red';
        // display food
        generate_point(x, y, radius, color)
    })
}




let display_tail = function () {
    if (ball.tail.length < len) {
        ball.tail.push([ball.x, ball.y])
        index = 0
    } else if (ball.tail.length == len) {
        ball.tail.shift()
        ball.tail.push([ball.x, ball.y])
        index = 0
    }
}


let eat_food = function () {
    food_coordinates.forEach((food) => {
        if (Math.sqrt(Math.pow(food['x'] - ball.x, 2) + Math.pow(food['y'] - ball.y, 2)) < 25) {
            // remove food
            let index = food_coordinates.indexOf(food);
            food_coordinates.splice(index, 1)
            ctx_food.clearRect(food['x'] - food['radius'], food['y'] - food['radius'], 2 * food['radius'], 2 * food['radius']);
            // make snake longer
            len++
            // generate new point coordinates
            let [x, y, radius, color] = generateCoorginates()
            // display point
            generate_point(x, y, radius, color)
        }
    })
}

let createparts = function () {
    for (let i = 0; i < len; i++) {

        warmParts.push(new warmPart(ball.x, ball.y,
            (speed / 3) * ((Math.random() * 8) - 4),
            (speed / 3) * ((Math.random() * 8) - 4),
            colors[(Math.round(Math.random() * 5))],
            (5 + Math.floor(Math.random() * 5))
        ))
    }
}


let die = function () {

    len > 0 ? createparts() : 0;
    len = 0
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    warmParts.forEach((part) => {
        part.update()
    })
}





function draw() {


    index++
    display_tail()


    // display shades while speeding
    // if (speed == 8) {
    //     ball.tail.forEach((el) => {
    //         ball.draw(el[0], el[1], 28, ball.shade)
    //     })
    // }

    chatSocket.send(JSON.stringify({
        'message': ball.tail
    }));

    // display main warm
    // ball.tail.forEach((el) => {
    //     ball.draw(el[0], el[1], 25, ball.color)
    // })





    ball.x += ball.vx;
    ball.y += ball.vy;





    // lose mass logic
    if (lose_mass % mass_losing_speed == 0) {
        // subtract one from length
        lose_mass = 1
        len--
        ball.tail.shift()
    } else {
        lose_mass++
    }



    // after hiting border
    if (ball.y > canvas.height ||
        ball.y < 0) {
        die()
    }
    if (ball.x > canvas.width ||
        ball.x < 0) {
        die()
    }




}


chatSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);

    console.log(data['message'].length);

    // display main warm
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    data['message'].forEach((el) => {
        ball.draw(el[0], el[1], 25, ball.color)
    })

    // after eating food
    eat_food()


    // // change camera view
    // ball.screenX = (ball.x < centerX) ? 0 : (ball.x > (2000 - centerX)) ? (2000 - (2 * centerX)) : (ball.x - centerX);
    // ball.screenY = (ball.y < centerY) ? 0 : (ball.y > (2000 - centerY)) ? (2000 - (2 * centerY)) : (ball.y - centerY);

    // container.scrollTo((ball.x - centerX), (ball.y - centerY))

    raf = window.requestAnimationFrame(draw);
};