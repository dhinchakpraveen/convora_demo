from fastapi import APIRouter, UploadFile, File
from ..services.storage import StorageService
from ..services.recording import RecordingService

router = APIRouter()
storage_service = StorageService()
recording_service = RecordingService()

@router.post("/upload")
async def upload_recording(file: UploadFile = File(...)):
    url = await storage_service.upload_file(file)
    return {"url": url}

@router.get("/{recording_id}")
async def get_recording(recording_id: str):
    return await recording_service.get_recording(recording_id)