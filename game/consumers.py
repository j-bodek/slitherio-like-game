# game/consumers.py
import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import random
from .food import generate_food_coordinates
from django.shortcuts import redirect

food_coordinates = []
player_coordinates = []
players = []

class ChatConsumer(WebsocketConsumer):
    
    
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        if not food_coordinates:
            food_coordinates.append(generate_food_coordinates())

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

        # send first message after two players were connected
        message = [self.channel_name, [0, 0, 3, 10]]
        if message not in players: players.append(message)
        if not player_coordinates: player_coordinates.append([self.channel_name, 100, 500])
        
        if len(players) == 2:

            # Send message to room group
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': players,
                    'food': 'generate'
                }
            )
            players.clear()

        



    def disconnect(self, close_code):
        # Leave room group
        players.clear()
        player_coordinates.clear()
        food_coordinates.clear()
        
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
        


    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        message = [self.channel_name,data['message']]
        if message not in players: players.append(message)
        if not player_coordinates: player_coordinates.append([self.channel_name, 100, 1900])
        
        if len(players) == 2:

            # Send message to room group
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': players,
                    'food': data['food']
                }
            )
            players.clear()


    # Receive message from room group
    def chat_message(self, event):
        
        data = event['message']
        receiver = data[0] if data[0][0] != self.channel_name else data[1]
        sender = data[0] if data[0][0] == self.channel_name else data[1]

        coordinates = [player_coordinates[0][1],player_coordinates[0][2]] if self.channel_name == player_coordinates[0][0] else [player_coordinates[0][2],player_coordinates[0][1]]

        food_type = event['food']

        food_message = food_coordinates[0] if food_type == 'generate' else []
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'sender': sender[1],
            'receiver': receiver[1],
            'food': food_message,
            'player_coordinates':coordinates
        }))
      




