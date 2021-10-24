let Snake_player;
let Snake_oponent;
let running = false
let vx = 0;
let vy = 0;
let speed = 3;
let mass_losing_speed = 100;
let score_box = document.querySelector('.score')
let raf;
let starting = true
let winner_score = 0
let nickname = localStorage.getItem('nickname') ? localStorage.getItem('nickname') : ''

const roomName = JSON.parse(document.getElementById('room-name').textContent);

const chatSocket = new WebSocket(
    'ws://' +
    window.location.host +
    '/ws/chat/' +
    roomName +
    '/'
);


// on mousedown speed up
canvas.addEventListener('mousedown', (e) => {
    if (running && Snake_player && Snake_oponent && !end_game) {
        speed = 8
        mass_losing_speed = 10
    }
})

// after mouseup set normal speed
canvas.addEventListener('mouseup', (e) => {
    if (running && Snake_player && Snake_oponent && !end_game) {
        speed = 3
        mass_losing_speed = 100
    }
})

// on mouse move change moving direction angle 
canvas.addEventListener('mousemove', function (e) {
    if (running && Snake_player && Snake_oponent && !end_game) {
        let len = Math.sqrt(Math.pow(Snake_player.tail.at(-1)[0] - (e.clientX + Snake_player.screenX), 2) + Math.pow(Snake_player.tail.at(-1)[1] - (e.clientY + Snake_player.screenY), 2))
        let scale = Snake_player.speed / len

        vx = ((e.clientX + Snake_player.screenX - Snake_player.tail.at(-1)[0]) * scale)
        vy = ((e.clientY + Snake_player.screenY - Snake_player.tail.at(-1)[1]) * scale)
    }
});



// after receiving websocket message
chatSocket.onmessage = function (e) {

    if (end_game) {

        // get winner
        winner = loser == 'oponent' ? 'Player_score' : 'Oponent_score'
        winner_score_box = document.getElementById(winner)
        winner_score = parseInt(winner_score_box.textContent.slice(-5, -4)) + 1

        // if player have 3 scores display winner 
        if (winner_score == 3) {
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
            speed = 3;
            mass_losing_speed = 100;
            vx = 0
            vy = 0

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
            if (winner_score == 3) {
                window.location.href = "http://127.0.0.1:8000/game";
            }

        }, 2000);




    }


    if (!running && !end_game) {
        // get message data
        const data = JSON.parse(e.data);

        // hide waiting message
        document.querySelector('.waiting_message').style.display = 'none'

        // hide score box
        score_box.style.display = 'none'

        // create snakes
        Snake_player = new Warm('#e9c46a', 'player', data['player_coordinates'][0], nickname)
        Snake_oponent = new Warm('#2a9d8f', 'oponent', data['player_coordinates'][1], '')

        // request animation
        raf = window.requestAnimationFrame(function () {
            draw(Snake_player, Snake_oponent)
        });

        // copy of data['food']
        food_coordinates = data['food'].slice()

        display_food(food_coordinates)

        running = true
    }



    if (!end_game) {

        // get message data
        const data = JSON.parse(e.data);

        // change player moving settings
        Snake_player.vx = data['sender'][0]
        Snake_player.vy = data['sender'][1]
        Snake_player.speed = data['sender'][2]
        Snake_player.mass_losing_speed = data['sender'][3]

        // change oponent moving settings    
        Snake_oponent.vx = data['receiver'][0]
        Snake_oponent.vy = data['receiver'][1]
        Snake_oponent.speed = data['receiver'][2]
        Snake_oponent.mass_losing_speed = data['receiver'][3]

        // send websocket message with player moving data
        chatSocket.send(JSON.stringify({
            'message': [vx, vy, speed, mass_losing_speed],
            'food': false
        }));
    }

}