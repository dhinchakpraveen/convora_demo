from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from .routers import auth, rooms, recordings
from .config import settings
from .websocket import WebRTCSignaling

app = FastAPI(title="Convora API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(settings.MONGODB_URL)
    app.mongodb = app.mongodb_client[settings.DB_NAME]

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(rooms.router, prefix="/api/rooms", tags=["rooms"])
app.include_router(recordings.router, prefix="/api/recordings", tags=["recordings"])

# WebRTC signaling
signaling = WebRTCSignaling()

@app.websocket("/ws/signaling/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await signaling.connect(websocket, room_id)
    try:
        while True:
            data = await websocket.receive_json()
            await signaling.handle_message(websocket, room_id, data)
    except:
        await signaling.disconnect(websocket, room_id)