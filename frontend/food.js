let canvas_food = document.getElementById('food_box');
let ctx_food = canvas_food.getContext('2d');

let food_coordinates = []


let food = function (x, y, radius, color) {
    ctx_food.beginPath();
    ctx_food.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx_food.closePath();
    ctx_food.fillStyle = color;
    ctx_food.fill();
}


let display_food = function () {
    for (let i = 0; i < 200; i++) {
        let x = Math.floor(Math.random() * 2000);
        let y = Math.floor(Math.random() * 2000);
        let radius = (5 + Math.floor(Math.random() * 5));
        let color = 'red';

        food_coordinates.push({
            'x': x,
            'y': y,
            'radius': radius,
            'color': color
        })

        food(x, y, radius, color)
    }
}

display_food()