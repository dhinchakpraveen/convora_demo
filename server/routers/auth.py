from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from ..models.user import User, UserCreate
from ..services.auth import AuthService

router = APIRouter()
auth_service = AuthService()

@router.post("/register")
async def register(user: UserCreate):
    return await auth_service.create_user(user)

@router.post("/login")
async def login(username: str, password: str):
    return await auth_service.authenticate_user(username, password)