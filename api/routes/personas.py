# api/routes/personas.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from crud.persona import create_persona, get_personas, get_persona_by_id
from dependencies.auth import get_current_admin
from pydantic import BaseModel

router = APIRouter(prefix="/personas", tags=["personas"])

class PersonaCreate(BaseModel):
    foto: str
    nombre: str
    apellido: str
    edad: int
    lugar_residencia: str
    lugar_encontrado: str = "Querétaro"

@router.post("/")
def alta_persona(persona: PersonaCreate, db: Session = Depends(get_db), admin = Depends(get_current_admin)):
    return create_persona(
        db=db,
        foto=persona.foto,
        nombre=persona.nombre,
        apellido=persona.apellido,
        edad=persona.edad,
        lugar_residencia=persona.lugar_residencia,
        lugar_encontrado=persona.lugar_encontrado
    )

@router.get("/")
def catalogo_publico(db: Session = Depends(get_db)):
    return get_personas(db)

@router.get("/{persona_id}")
def detalle_persona(persona_id: int, db: Session = Depends(get_db)):
    persona = get_persona_by_id(db, persona_id)
    if not persona:
        raise HTTPException(status_code=404, detail="Persona no encontrada")
    return persona