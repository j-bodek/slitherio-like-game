canvas.addEventListener('mousedown', (e) => {
    if (running && len > 0) {
        speed = 8
        mass_losing_speed = 10
        let len = Math.sqrt(Math.pow(ball.tail.at(-1)[0] - (e.clientX + ball.screenX), 2) + Math.pow(ball.tail.at(-1)[1] - (e.clientY + ball.screenY), 2))
        let scale = speed / len

        ball.vx = ((e.clientX + ball.screenX - ball.tail.at(-1)[0]) * scale)
        ball.vy = ((e.clientY + ball.screenY - ball.tail.at(-1)[1]) * scale)
    }
})

canvas.addEventListener('mouseup', (e) => {
    if (running && len > 0) {
        speed = 3
        mass_losing_speed = 100
        let len = Math.sqrt(Math.pow(ball.tail.at(-1)[0] - (e.clientX + ball.screenX), 2) + Math.pow(ball.tail.at(-1)[1] - (e.clientY + ball.screenY), 2))
        let scale = speed / len

        ball.vx = ((e.clientX + ball.screenX - ball.tail.at(-1)[0]) * scale)
        ball.vy = ((e.clientY + ball.screenY - ball.tail.at(-1)[1]) * scale)
    }
})

// on mouse move change angle 
canvas.addEventListener('mousemove', function (e) {
    if (running && len > 0) {
        let len = Math.sqrt(Math.pow(ball.tail.at(-1)[0] - (e.clientX + ball.screenX), 2) + Math.pow(ball.tail.at(-1)[1] - (e.clientY + ball.screenY), 2))
        let scale = speed / len

        vx = ((e.clientX + ball.screenX - ball.tail.at(-1)[0]) * scale)
        vy = ((e.clientY + ball.screenY - ball.tail.at(-1)[1]) * scale)



        // if (Math.abs(Math.abs(ball.vx) - Math.abs(vx)) > 0.5 || Math.abs(Math.abs(ball.vy) - Math.abs(vy)) > 0.5) {
        //     // ball.vx = vx
        //     // ball.vy = vy
        //     // console.log(ball.vy == oldvy);

        //     chatSocket.send(JSON.stringify({
        //         'message': [vx, vy],
        //         // 'id': snakeid
        //     }));

        // }

    }
});



// window.setInterval(function () {

//     chatSocket.send(JSON.stringify({
//         'message': [vx, vy],
//         // 'id': snakeid
//     }));

// }, 50);



canvas.addEventListener('mouseover', function (e) {
    if (!running && len > 0) {
        raf = window.requestAnimationFrame(draw);

        running = true;
    }
});




canvas.addEventListener('mouseout', function (e) {
    window.cancelAnimationFrame(raf);
    running = false;
});