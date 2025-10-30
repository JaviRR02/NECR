# api/crud/admin.py
from sqlalchemy.orm import Session
from models.admin import Admin
from dependencies.auth import get_password_hash

def get_admin_by_email(db: Session, email: str):
    return db.query(Admin).filter(Admin.email == email).first()

def create_admin(db: Session, email: str, password: str):
    hashed = get_password_hash(password)
    new_admin = Admin(email=email, password_hash=hashed)
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    return new_admin.id