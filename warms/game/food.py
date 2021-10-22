import random
import math

def generate_food_coordinates():
    food_coordinates = []

    for i in range(300):
        x = math.ceil(random.random() * 2000) 
        y = math.ceil(random.random() * 2000) 
        radius = (5 + math.ceil(random.random() * 5))
        color = round(random.random() * 4)

        food_coordinates.append(
            {
                'x':x,
                'y':y,
                'radius':radius,
                'color':color
            }
        )
    return food_coordinates
