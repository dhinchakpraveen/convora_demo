from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RecordingBase(BaseModel):
    room_id: str
    title: str
    description: Optional[str] = None

class RecordingCreate(RecordingBase):
    file_url: str
    created_by: str

class Recording(RecordingBase):
    id: str
    file_url: str
    transcript: Optional[str]
    summary: Optional[str]
    duration: Optional[float]
    created_at: datetime