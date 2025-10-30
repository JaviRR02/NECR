# api/models/persona.py
from sqlalchemy import Column, Integer, String
from database.connection import Base

class Persona(Base):
    __tablename__ = "personas"

    id = Column(Integer, primary_key=True, index=True)
    foto = Column(String(500))
    nombre = Column(String(100))
    apellido = Column(String(100))
    edad = Column(Integer)
    lugar_residencia = Column(String(200))
    lugar_encontrado = Column(String(200), default="Querétaro")