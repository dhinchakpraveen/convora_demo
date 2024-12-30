from fastapi import APIRouter, Depends, WebSocket
from ..models.room import Room, RoomCreate
from ..services.room import RoomService

router = APIRouter()
room_service = RoomService()

@router.post("/create")
async def create_room(room: RoomCreate):
    return await room_service.create_room(room)

@router.get("/{room_id}")
async def get_room(room_id: str):
    return await room_service.get_room(room_id)