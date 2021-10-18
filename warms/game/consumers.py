# game/consumers.py
import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import random

players = []

class ChatConsumer(WebsocketConsumer):
    
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

        



    def disconnect(self, close_code):
        # Leave room group
        players.clear()
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        message = [self.channel_name,data['message']]
        if message not in players: players.append(message)
        
        if len(players) == 2:
            print('hi')
            # Send message to room group
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': players
                }
            )
            players.clear()


    # Receive message from room group
    def chat_message(self, event):
        
        data = event['message']

        
        receiver = data[0] if data[0][0] != self.channel_name else data[1]
        sender = data[0] if data[0][0] == self.channel_name else data[1]
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'sender': sender[1],
            'receiver': receiver[1],
        }))
      




