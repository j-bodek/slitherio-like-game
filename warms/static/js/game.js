let Snake_player;
let Snake_oponent;
let running = false
let vx = 0;
let vy = 0;
let speed = 3;
let mass_losing_speed = 100;
let score_box = document.querySelector('.score')
let raf;
let winner_score = 0

canvas.addEventListener('mousedown', (e) => {
    if (running && Snake_player && Snake_oponent) {
        speed = 8
        mass_losing_speed = 10
    }
})

canvas.addEventListener('mouseup', (e) => {
    if (running && Snake_player && Snake_oponent) {
        speed = 3
        mass_losing_speed = 100
    }
})

// // // on mouse move change angle 
canvas.addEventListener('mousemove', function (e) {
    if (running && Snake_player && Snake_oponent) {
        let len = Math.sqrt(Math.pow(Snake_player.tail.at(-1)[0] - (e.clientX + Snake_player.screenX), 2) + Math.pow(Snake_player.tail.at(-1)[1] - (e.clientY + Snake_player.screenY), 2))
        let scale = Snake_player.speed / len

        vx = ((e.clientX + Snake_player.screenX - Snake_player.tail.at(-1)[0]) * scale)
        vy = ((e.clientY + Snake_player.screenY - Snake_player.tail.at(-1)[1]) * scale)
    }
});




// // after receiving another message change warm moveing direction and send another message
// chatSocket.onmessage = function (e) {

//     const data = JSON.parse(e.data);
//     Snake.vx = data['message'][0]
//     Snake.vy = data['message'][1]


//     chatSocket.send(JSON.stringify({
//         'message': [vx, vy],
//     }));

// }





canvas.addEventListener('mouseover', function (e) {
    if (!running) {
        // on mouse over send first 'starting position message'
        chatSocket.send(JSON.stringify({
            'message': [0, 0, speed, mass_losing_speed],
            'food': 'generate',
        }));
    }
});




// canvas.addEventListener('mouseout', function (e) {
//     window.cancelAnimationFrame(Snake.raf);
//     Snake.running = false;
// });


chatSocket.onmessage = function (e) {

    if (end_game) {

        winner = loser == 'oponent' ? 'Player_score' : 'Oponent_score'
        winner_score_box = document.getElementById(winner)
        winner_score = parseInt(winner_score_box.textContent.slice(-5, -4)) + 1

        if (winner_score == 2) {
            score_box.innerHTML = winner.replace('_score', '') + ' won!'
        } else {
            winner_score_box.textContent = winner_score_box.textContent.slice(0, -5) + winner_score + ' / 3'
        }

        // // display score
        score_box.style.display = 'block'

        // after 5 seconds 
        setTimeout(function () {

            // reset settings
            running = false
            loser;
            end_game = false;

            // delete animation
            window.cancelAnimationFrame(raf);

            // delete snake_player and snake_oponent
            delete Snake_player
            delete Snake_oponent

            // send new message
            chatSocket.send(JSON.stringify({
                'message': [0, 0, speed, mass_losing_speed],
                'food': 'generate',
            }))

            // if one user won redirect
            if (winner_score == 2) {
                window.location.href = "http://127.0.0.1:8000/game";
            }

        }, 2000);




    }

    const data = JSON.parse(e.data);

    if (!running) {

        // hide score box
        score_box.style.display = 'none'

        Snake_player = new Warm('#e9c46a', 'player', data['player_coordinates'][0])
        Snake_oponent = new Warm('#2a9d8f', 'oponent', data['player_coordinates'][1])

        raf = window.requestAnimationFrame(function () {
            draw(Snake_player, Snake_oponent)
        });

        // copy of data['food']
        food_coordinates = data['food'].slice()

        display_food(food_coordinates)

        running = true
    }



    if (!end_game) {

        Snake_player.vx = data['sender'][0]
        Snake_player.vy = data['sender'][1]
        Snake_player.speed = data['sender'][2]
        Snake_player.mass_losing_speed = data['sender'][3]


        Snake_oponent.vx = data['receiver'][0]
        Snake_oponent.vy = data['receiver'][1]
        Snake_oponent.speed = data['receiver'][2]
        Snake_oponent.mass_losing_speed = data['receiver'][3]

        chatSocket.send(JSON.stringify({
            'message': [vx, vy, speed, mass_losing_speed],
            'food': false
        }));
    }

}