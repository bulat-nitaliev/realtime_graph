from channels.generic.websocket import AsyncWebsocketConsumer
from random import randint
from asyncio import sleep
import json
from itertools import cycle




class GraphConsumer(AsyncWebsocketConsumer):
    def __init__(self):
        super().__init__()
        self.day_gen = cycle(['Mon', 'Tue', 'Thu', 'Fri', 'Sat', 'Sun'])
    async def connect(self):
        await self.accept()
        for i in range(1,1000):
            day = next(self.day_gen)
            await self.send(json.dumps({'value': randint(1,100), 'day': day}))
            await sleep(1)