from fastapi import WebSocket
from typing import Dict, Set
import json

class WebRTCSignaling:
    def __init__(self):
        self.active_connections: Dict[str, Set[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room_id: str):
        await websocket.accept()
        if room_id not in self.active_connections:
            self.active_connections[room_id] = set()
        self.active_connections[room_id].add(websocket)

    async def disconnect(self, websocket: WebSocket, room_id: str):
        self.active_connections[room_id].remove(websocket)
        if not self.active_connections[room_id]:
            del self.active_connections[room_id]

    async def handle_message(self, sender: WebSocket, room_id: str, message: dict):
        # Broadcast the message to all other peers in the room
        for connection in self.active_connections[room_id]:
            if connection != sender:
                await connection.send_json(message)