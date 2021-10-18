let Snake = new Warm()

canvas.addEventListener('mousedown', (e) => {
    if (Snake.running && Snake.len > 0) {
        Snake.speed = 8
        Snake.mass_losing_speed = 10
    }
})

canvas.addEventListener('mouseup', (e) => {
    if (Snake.running && Snake.len > 0) {
        Snake.speed = 3
        Snake.mass_losing_speed = 100
    }
})

// // on mouse move change angle 
canvas.addEventListener('mousemove', function (e) {
    if (Snake.running && Snake.len > 0) {
        let len = Math.sqrt(Math.pow(Snake.tail.at(-1)[0] - (e.clientX + Snake.screenX), 2) + Math.pow(Snake.tail.at(-1)[1] - (e.clientY + Snake.screenY), 2))
        let scale = Snake.speed / len

        vx = ((e.clientX + Snake.screenX - Snake.tail.at(-1)[0]) * scale)
        vy = ((e.clientY + Snake.screenY - Snake.tail.at(-1)[1]) * scale)


    }
});




// after receiving another message change warm moveing direction and send another message
chatSocket.onmessage = function (e) {

    const data = JSON.parse(e.data);
    Snake.vx = data['message'][0]
    Snake.vy = data['message'][1]


    chatSocket.send(JSON.stringify({
        'message': [vx, vy],
    }));

}





canvas.addEventListener('mouseover', function (e) {
    if (!Snake.running && Snake.len > 0) {

        // window.requestAnimationFrame(Snake.draw);
        Snake.raf = window.requestAnimationFrame(function () {
            draw(Snake)
        });


        // on mouse over send first 'starting position message'
        chatSocket.send(JSON.stringify({
            'message': [0, 0],
        }));

        Snake.running = true;
    }
});




canvas.addEventListener('mouseout', function (e) {
    window.cancelAnimationFrame(Snake.raf);
    Snake.running = false;
});