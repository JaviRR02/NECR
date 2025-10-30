# api/schemas/persona.py
from pydantic import BaseModel
from typing import Optional

class PersonaCreate(BaseModel):
    nombre: str
    apellido: str
    edad: int
    lugar_residencia: str
    lugar_encontrado: str = "Querétaro"

class PersonaResponse(BaseModel):
    id: int
    foto: str
    nombre: str
    apellido: str
    edad: int
    lugar_residencia: str
    lugar_encontrado: str