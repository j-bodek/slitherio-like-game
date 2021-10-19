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





// let ball = {
//     x: centerX,
//     y: centerY,
//     screenX: 0,
//     screenY: 0,
//     vx: 0,
//     vy: 0,
//     radius: 25,
//     color: '#e9c46a',
//     shade: '#F2DCA6',
//     tail: [],



//     draw: function (x, y, radius, color) {

//         ctx.beginPath();
//         ctx.arc(x, y, radius, 0, Math.PI * 2, true);
//         ctx.closePath();
//         ctx.fillStyle = color;
//         ctx.fill();

//     },

// };



// let leave_mass = function () {
//     ball.tail.forEach((e) => {
//         let x = Math.floor(e[0] + (Math.random() * 40));
//         let y = Math.floor(e[1] + (Math.random() * 40));
//         let radius = (2 + Math.floor(Math.random() * 4));
//         let color = 'red';
//         // display food
//         generate_point(x, y, radius, color)
//     })
// }




// let display_tail = function () {
//     if (ball.tail.length < len) {
//         ball.tail.push([ball.x, ball.y])
//         index = 0
//     } else if (ball.tail.length == len) {
//         ball.tail.shift()
//         ball.tail.push([ball.x, ball.y])
//         index = 0
//     }
// }


// let eat_food = function () {
//     food_coordinates.forEach((food) => {
//         if (Math.sqrt(Math.pow(food['x'] - ball.x, 2) + Math.pow(food['y'] - ball.y, 2)) < 25) {
//             // remove food
//             let index = food_coordinates.indexOf(food);
//             food_coordinates.splice(index, 1)
//             ctx_food.clearRect(food['x'] - food['radius'], food['y'] - food['radius'], 2 * food['radius'], 2 * food['radius']);
//             // make snake longer
//             len++
//             // generate new point coordinates
//             let [x, y, radius, color] = generateCoorginates()
//             // display point
//             generate_point(x, y, radius, color)
//         }
//     })
// }

let createparts = function (Snake) {
    for (let i = 0; i < Snake.len; i++) {

        Snake.warmParts.push(new warmPart(Snake.x, Snake.y,
            (Snake.speed / 3) * ((Math.random() * 8) - 4),
            (Snake.speed / 3) * ((Math.random() * 8) - 4),
            colors[(Math.round(Math.random() * 5))],
            (5 + Math.floor(Math.random() * 5))
        ))
    }
}


// let die = function () {

//     len > 0 ? createparts() : 0;
//     len = 0
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     warmParts.forEach((part) => {
//         part.update()
//     })
// }






// function draw() {


//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     index++
//     display_tail()


//     // display shades while speeding
//     if (speed == 8) {
//         ball.tail.forEach((el) => {
//             ball.draw(el[0], el[1], 28, ball.shade)
//         })
//     }


//     // display main warm
//     ball.tail.forEach((el) => {
//         ball.draw(el[0], el[1], 25, ball.color)
//     })



//     ball.x += ball.vx;
//     ball.y += ball.vy;


//     // after eating food
//     eat_food()


//     // change camera view
//     ball.screenX = (ball.x < centerX) ? 0 : (ball.x > (2000 - centerX)) ? (2000 - (2 * centerX)) : (ball.x - centerX);
//     ball.screenY = (ball.y < centerY) ? 0 : (ball.y > (2000 - centerY)) ? (2000 - (2 * centerY)) : (ball.y - centerY);

//     container.scrollTo((ball.x - centerX), (ball.y - centerY))


//     // lose mass logic
//     if (lose_mass % mass_losing_speed == 0) {
//         // subtract one from length
//         lose_mass = 1
//         len--
//         ball.tail.shift()
//     } else {
//         lose_mass++
//     }



//     // after hiting border
//     if (ball.y > canvas.height ||
//         ball.y < 0) {
//         die()
//     }
//     if (ball.x > canvas.width ||
//         ball.x < 0) {
//         die()
//     }


//     raf = window.requestAnimationFrame(draw);

// }




















display_tail = function (Snake) {
    if (Snake.tail.length < Snake.len) {
        Snake.tail.push([Snake.x, Snake.y])
        Snake.index = 0
    } else if (Snake.tail.length == Snake.len) {
        Snake.tail.shift()
        Snake.tail.push([Snake.x, Snake.y])
        Snake.index = 0
    }
}

draw_ball = function (x, y, radius, color) {

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

}




eat_food = function (Snake) {
    food_coordinates.forEach((food) => {
        if (Math.sqrt(Math.pow(food['x'] - Snake.x, 2) + Math.pow(food['y'] - Snake.y, 2)) < 25) {
            // remove food
            let food_index = food_coordinates.indexOf(food);
            food_coordinates.splice(food_index, 1)
            ctx_food.clearRect(food['x'] - food['radius'], food['y'] - food['radius'], 2 * food['radius'], 2 * food['radius']);
            // make snake longer
            Snake.len++
        }
    })
}

die = function (Snake) {

    Snake.len > 0 ? createparts(Snake) : 0;
    Snake.len = 0
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Snake.warmParts.forEach((part) => {
        part.update()
    })
}



draw = function (Snake_player, Snake_oponent) {


    ctx.clearRect(0, 0, canvas.width, canvas.height);

    [Snake_player, Snake_oponent].forEach((Snake) => {
        Snake.index++
        display_tail(Snake)


        // display shades while speeding
        if (Snake.speed == 8) {
            Snake.tail.forEach((el) => {
                draw_ball(el[0], el[1], 28, Snake.shade)
            })
        }


        // display main warm
        // console.log(Snake.tail);

        Snake.tail.forEach((el) => {
            draw_ball(el[0], el[1], 28, Snake.color)
        })


        Snake.x += Snake.vx;
        Snake.y += Snake.vy;


        // // after eating food
        eat_food(Snake)


        // // change camera view
        if (Snake.type == 'player') {
            Snake.screenX = (Snake.x < Snake.centerX) ? 0 : (Snake.x > (2000 - Snake.centerX)) ? (2000 - (2 * Snake.centerX)) : (Snake.x - Snake.centerX);
            Snake.screenY = (Snake.y < Snake.centerY) ? 0 : (Snake.y > (2000 - Snake.centerY)) ? (2000 - (2 * Snake.centerY)) : (Snake.y - Snake.centerY);

            container.scrollTo((Snake.x - Snake.centerX), (Snake.y - Snake.centerY))
        }


        // // // lose mass logic
        if (Snake.lose_mass % Snake.mass_losing_speed == 0) {
            // subtract one from length
            Snake.lose_mass = 1
            Snake.len--
            Snake.tail.shift()
        } else {
            Snake.lose_mass++
        }



        // // // after hiting border
        if (Snake.y > canvas.height ||
            Snake.y < 0) {
            die(Snake)
        }
        if (Snake.x > canvas.width ||
            Snake.x < 0) {
            die(Snake)
        }
    })


    raf = window.requestAnimationFrame(function () {
        draw(Snake_player, Snake_oponent);
    });

}











class Warm {


    constructor(Snake_color, Snake_type, start_coordinates) {
        this.raf;
        this.type = Snake_type
        this.running = false;
        this.index = 0;
        this.lose_mass = 1;
        this.len = 10;
        this.speed = 3;
        this.mass_losing_speed = 100;
        this.warmParts = []



        this.centerX = window.innerWidth / 2;
        this.centerY = window.innerHeight / 2;

        this.x = start_coordinates;
        this.y = start_coordinates;
        this.screenX = 0;
        this.screenY = 0;
        this.vx = 0;
        this.vy = 0;
        this.radius = 25;
        this.color = Snake_color;
        this.shade = '#F2DCA6';
        this.tail = [];
    }

}























// chatSocket.onmessage = function (e) {

//     chatSocket.send(JSON.stringify({
//         'message': ball.tail,
//         // 'id': snakeid
//     }));

//     const data = JSON.parse(e.data);

//     ctx.clearRect(0, 0, canvas.width, canvas.height);


//     index++
//     display_tail()


//     // display shades while speeding
//     if (speed == 8) {
//         ball.tail.forEach((el) => {
//             ball.draw(el[0], el[1], 28, ball.shade)
//         })
//     }


//     // display main warm
//     ball.tail.forEach((el) => {
//         ball.draw(el[0], el[1], 25, ball.color)
//     })



//     ball.x += ball.vx;
//     ball.y += ball.vy;


//     // after eating food
//     eat_food()


//     // change camera view
//     ball.screenX = (ball.x < centerX) ? 0 : (ball.x > (2000 - centerX)) ? (2000 - (2 * centerX)) : (ball.x - centerX);
//     ball.screenY = (ball.y < centerY) ? 0 : (ball.y > (2000 - centerY)) ? (2000 - (2 * centerY)) : (ball.y - centerY);

//     container.scrollTo((ball.x - centerX), (ball.y - centerY))






//     // // display main warm
//     // data['message'].forEach((el) => {
//     //     ball.draw(el[0], el[1], 25, ball.color)
//     // })




// };