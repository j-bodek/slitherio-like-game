let Snake_player = new Warm('#e9c46a', 'player')
let Snake_oponent = new Warm('#2a9d8f', 'oponent')
let running = false
let vx = 0;
let vy = 0;

canvas.addEventListener('mousedown', (e) => {
    if (running) {
        Snake_player.speed = 8
        Snake_player.mass_losing_speed = 10
    }
})

canvas.addEventListener('mouseup', (e) => {
    if (running) {
        Snake_player.speed = 3
        Snake_player.mass_losing_speed = 100
    }
})

// // // on mouse move change angle 
canvas.addEventListener('mousemove', function (e) {
    if (running) {
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
            'message': [0, 0],
            'food': 'generate',
        }));
    }
});




// canvas.addEventListener('mouseout', function (e) {
//     window.cancelAnimationFrame(Snake.raf);
//     Snake.running = false;
// });
let send = true
canvas.addEventListener('click', function (e) {
    send = false
})

chatSocket.onmessage = function (e) {

    const data = JSON.parse(e.data);

    if (!running) {
        Snake_player.raf = window.requestAnimationFrame(function () {
            draw(Snake_player, Snake_oponent)
        });

        // copy of data['food']
        food_coordinates = data['food'].slice()

        display_food(food_coordinates)

        running = true
    }

    Snake_player.vx = data['sender'][0]
    Snake_player.vy = data['sender'][1]
    Snake_oponent.vx = data['receiver'][0]
    Snake_oponent.vy = data['receiver'][1]



    chatSocket.send(JSON.stringify({
        'message': [vx, vy],
        'food': false
    }));
    // after sending eaten points clear them
}