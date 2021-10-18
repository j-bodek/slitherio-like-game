let Snake_player = new Warm()
let Snake_oponent = new Warm()
let running = false
let vx = 0;
let vy = 0;

// canvas.addEventListener('mousedown', (e) => {
//     if (Snake.running && Snake.len > 0) {
//         Snake.speed = 8
//         Snake.mass_losing_speed = 10
//     }
// })

// canvas.addEventListener('mouseup', (e) => {
//     if (Snake.running && Snake.len > 0) {
//         Snake.speed = 3
//         Snake.mass_losing_speed = 100
//     }
// })

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
        }));
    }
});




// canvas.addEventListener('mouseout', function (e) {
//     window.cancelAnimationFrame(Snake.raf);
//     Snake.running = false;
// });


canvas.addEventListener('click', (e) => {
    chatSocket.send(JSON.stringify({
        'message': [2, 2],
    }));
})



chatSocket.onmessage = function (e) {
    console.log(JSON.parse(e.data));
    if (!running) {
        Snake_player.raf = window.requestAnimationFrame(function () {
            draw(Snake_player, Snake_oponent)
        });

        running = true
    }

    const data = JSON.parse(e.data);
    Snake_player.vx = data['sender'][0]
    Snake_player.vy = data['sender'][1]
    Snake_oponent.vx = data['receiver'][0]
    Snake_oponent.vy = data['receiver'][1]


    chatSocket.send(JSON.stringify({
        'message': [vx, vy],
    }));
}