let canvas_food = document.getElementById('food_box');
let ctx_food = canvas_food.getContext('2d');

let food_coordinates = []
let colors = ['#F2668B', '#7E49F2', '#A38DF2', '#BAF241', '#F29F05']


let generate_point = function (x, y, radius, color) {
    ctx_food.beginPath();
    ctx_food.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx_food.closePath();
    ctx_food.fillStyle = colors[color];
    ctx_food.fill();
}


let generateCoorginates = function () {

    // generate random coordinates
    let x = Math.floor(Math.random() * 2000);
    let y = Math.floor(Math.random() * 2000);
    let radius = (5 + Math.round(Math.random() * 5));
    let color = Math.round(Math.random() * 6)

    return [x, y, radius, color]
}


let display_food = function (food_coordinates) {
    ctx_food
    food_coordinates.forEach((point) => {
        generate_point(point['x'], point['y'], point['radius'], point['color'])
    })

}