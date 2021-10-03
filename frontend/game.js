// on mouse move change angle 
canvas.addEventListener('mousemove', function (e) {
    if (running && len > 0) {
        let len = Math.sqrt(Math.pow(ball.tail.at(-1)[0] - (e.clientX + ball.screenX), 2) + Math.pow(ball.tail.at(-1)[1] - (e.clientY + ball.screenY), 2))
        let scale = 3 / len

        ball.vx = ((e.clientX + ball.screenX - ball.tail.at(-1)[0]) * scale)
        ball.vy = ((e.clientY + ball.screenY - ball.tail.at(-1)[1]) * scale)

    }
});

canvas.addEventListener('mouseover', function (e) {
    if (!running && len > 0) {
        raf = window.requestAnimationFrame(draw);
        running = true;
    }
});

canvas.addEventListener('click', (e) => {
    if (running && len > 0) {
        raf = window.requestAnimationFrame(draw);
        running = true;
    }
})

canvas.addEventListener('mouseout', function (e) {
    window.cancelAnimationFrame(raf);
    running = false;
});

ball.draw();