from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class RoomBase(BaseModel):
    name: str
    description: Optional[str] = None

class RoomCreate(RoomBase):
    created_by: str

class Room(RoomBase):
    id: str
    participants: List[str]
    created_at: datetime
    is_active: bool = True