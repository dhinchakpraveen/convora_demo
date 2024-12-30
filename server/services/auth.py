from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from ..models.user import UserCreate, User
from ..config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    def __init__(self):
        self.pwd_context = pwd_context

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return self.pwd_context.verify(plain_password, hashed_password)

    def get_password_hash(self, password: str) -> str:
        return self.pwd_context.hash(password)

    def create_access_token(self, data: dict) -> str:
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=30)
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, settings.JWT_SECRET, algorithm="HS256")

    async def create_user(self, user: UserCreate) -> User:
        # Implementation for user creation
        pass

    async def authenticate_user(self, username: str, password: str):
        # Implementation for user authentication
        pass