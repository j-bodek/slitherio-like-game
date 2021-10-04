let canvas_food = document.getElementById('food_box');
let ctx_food = canvas_food.getContext('2d');

let food_coordinates = []
let colors = ['#F2668B', '#7E49F2', '#A38DF2', '#BAF241', '#F29F05']


let generate_point = function (x, y, radius, color) {
    ctx_food.beginPath();
    ctx_food.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx_food.closePath();
    ctx_food.fillStyle = color;
    ctx_food.fill();
}


let generateCoorginates = function () {

    // generate random coordinates
    let x = Math.floor(Math.random() * 2000);
    let y = Math.floor(Math.random() * 2000);
    let radius = (5 + Math.floor(Math.random() * 5));
    let color = colors[Math.floor(Math.random() * 6)]

    // push food info to array
    food_coordinates.push({
        'x': x,
        'y': y,
        'radius': radius,
        'color': color
    })

    return [x, y, radius, color]
}


let display_food = function () {
    for (let i = 0; i < 200; i++) {
        let [x, y, radius, color] = generateCoorginates()
        // render food
        generate_point(x, y, radius, color)
    }
}

display_food()