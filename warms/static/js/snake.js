const container = document.getElementById('world')
let canvas = document.getElementById('box');
let ctx = canvas.getContext('2d');
let end_game = false
let loser;



// part of Snake after it crash
class snakePart {
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



// create list of snake parts after it crash
let createparts = function (Snake) {
    for (let i = 0; i < Snake.len; i++) {

        Snake.snakeParts.push(new snakePart(Snake.x, Snake.y,
            (Snake.speed / 3) * ((Math.random() * 8) - 4), // generate random speed that depends on snake speed
            (Snake.speed / 3) * ((Math.random() * 8) - 4),
            colors[(Math.round(Math.random() * 5))],
            (5 + Math.floor(Math.random() * 5))
        ))
    }
}



// display snake parts (tail and head)
display_tail = function (Snake) {
    // if snake tail list len is less then snake length
    if (Snake.tail.length < Snake.len) {
        // push coordinates of head to list
        Snake.tail.push([Snake.x, Snake.y])
    }
    //  if snake tail list len is equal to snake length
    else if (Snake.tail.length == Snake.len) {
        // remove first list element (last part of tail)
        Snake.tail.shift()
        // and push new 
        Snake.tail.push([Snake.x, Snake.y])
    }
}

// draw snake part
draw_ball = function (x, y, radius, color, text) {

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    if (text) {
        ctx.font = "14px Comic Sans MS"
        ctx.fillStyle = 'white';
        ctx.fillText(text, x, y);
    }

}



// after eating food
eat_food = function (Snake) {
    food_coordinates.forEach((food) => {
        // if distance from center of head snake and center of food is less then 25 (head radius) 
        if (Math.sqrt(Math.pow(food['x'] - Snake.x, 2) + Math.pow(food['y'] - Snake.y, 2)) < 25) {
            // remove food from area
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

    Snake.snakeParts.forEach((part) => {
        part.update()
    })
}


// draw snakes and their actions
draw = function (Snake_player, Snake_oponent) {

    // clear canvas before displaying new snakes positions
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (loser) {
        Snake_order_list = loser == 'player' ? [Snake_player, Snake_oponent] : [Snake_oponent, Snake_player]
    } else {
        Snake_order_list = [Snake_player, Snake_oponent]
    }



    Snake_order_list.forEach((Snake) => {
        display_tail(Snake)

        // for each part in snake tail draw it part
        Snake.tail.forEach((el) => {

            if (Snake.tail.indexOf(el) == Snake.tail.length - 1) {
                draw_ball(el[0], el[1], 28, Snake.color, Snake.SnakeName)
            } else {
                draw_ball(el[0], el[1], 28, Snake.color, false)
            }
        })


        // update Snake.x and Snake.y with x and y velocity
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


        // lose mass logic
        if (Snake.lose_mass % Snake.mass_losing_speed == 0) {
            // subtract one from length
            Snake.lose_mass = 1
            Snake.len--
            Snake.tail.shift()
        } else {
            Snake.lose_mass++
        }



        // specify moveing direction point
        moving_x = Snake.x + (28 / Snake.speed) * Snake.vx
        moving_y = Snake.y + (28 / Snake.speed) * Snake.vy


        // after hiting border
        if ((Snake.y > canvas.height ||
                Snake.y < 0) && !end_game) {
            loser = Snake.type
            end_game = true
        }
        if ((Snake.x > canvas.width ||
                Snake.x < 0) && !end_game) {

            loser = Snake.type
            end_game = true
        }

        // lose if snake length is less then 1
        if (Snake.len < 1 && !end_game) {
            loser = Snake.type
            end_game = true
        }



        // detect colision
        // start detecting if distance between snakes heads is less then 300
        if (Math.sqrt(Math.pow(Snake_oponent.x - Snake_player.x, 2) + Math.pow(Snake_oponent.y - Snake_player.y, 2)) < 300) {
            colision_snake = Snake.type == 'oponent' ? Snake_player : Snake_oponent
            colision_snake.tail.forEach(part => {
                // if distance between snake moveing point (point in front of snake head that specify moving diration) and any part of another snake is less then head radius
                if (Math.sqrt(Math.pow(moving_x - part[0], 2) + Math.pow(moving_y - part[0], 2)) < Snake.radius &&
                    !end_game) {
                    loser = Snake.type
                    end_game = true
                }
            })
        }

        // die after colision with another snake
        if (Snake.type == loser && end_game) {
            die(Snake)
        }
    })


    raf = window.requestAnimationFrame(function () {
        draw(Snake_player, Snake_oponent);
    });

}











class Warm {


    constructor(Snake_color, Snake_type, start_coordinates, SnakeName) {
        this.raf;
        this.type = Snake_type
        this.running = false;
        this.lose_mass = 1;
        this.len = 10;
        this.speed = 3;
        this.mass_losing_speed = 100;
        this.snakeParts = []
        this.SnakeName = SnakeName



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