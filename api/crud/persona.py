# api/crud/persona.py
from sqlalchemy.orm import Session
from models.persona import Persona
from typing import List

def create_persona(db: Session, foto: str, nombre: str, apellido: str, edad: int, lugar_residencia: str, lugar_encontrado: str = "Querétaro"):
    nueva_persona = Persona(
        foto=foto,
        nombre=nombre,
        apellido=apellido,
        edad=edad,
        lugar_residencia=lugar_residencia,
        lugar_encontrado=lugar_encontrado
    )
    db.add(nueva_persona)
    db.commit()
    db.refresh(nueva_persona)
    return nueva_persona

def get_personas(db: Session) -> List[Persona]:
    return db.query(Persona).all()

def get_persona_by_id(db: Session, persona_id: int) -> Persona:
    return db.query(Persona).filter(Persona.id == persona_id).first()