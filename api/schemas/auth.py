# api/schemas/auth.py
from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class CreateAdminRequest(BaseModel):
    email: EmailStr
    password: str

class CreateAdminRequest(BaseModel):
    email: EmailStr
    password: str