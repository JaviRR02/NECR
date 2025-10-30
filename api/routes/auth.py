# api/routes/auth.py
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import get_db
from crud.admin import get_admin_by_email, create_admin
from dependencies.auth import verify_password, create_access_token, get_current_admin
from schemas.auth import CreateAdminRequest

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    admin = get_admin_by_email(db, form_data.username)
    if not admin or not verify_password(form_data.password, admin.password_hash):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    access_token = create_access_token(data={"sub": admin.id})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/create-admin")
def create_new_admin(
    request: CreateAdminRequest,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)  # ← PROTEGIDA
):
    if get_admin_by_email(db, request.email):
        raise HTTPException(status_code=400, detail="Email ya registrado")
    admin_id = create_admin(db, request.email, request.password)
    return {"message": "Admin creado exitosamente", "id": admin_id}