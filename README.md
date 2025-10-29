# NECR – Prototipo

**Registro de Esperanza y Cuidado**  
*Prototipo funcional para la Fiscalía General del Estado de Querétaro*

---

## Descripción

**NECR** es un sistema híbrido (sitio web + app móvil) diseñado para gestionar un **catálogo público y respetuoso de personas fallecidas cuyos cuerpos no han sido reclamados**. Facilita la identificación por parte de familiares o autoridades, con un enfoque digno, profesional y humanitario.

Este prototipo unifica frontend y backend moderno, priorizando **usabilidad, accesibilidad y sensibilidad**.

---

## Tecnologías Actualizadas

| Capa           | Tecnología                     |
|----------------|--------------------------------|
| **Frontend**   | React Native (iOS & Android)   |
| **Backend**    | FastAPI (Python)               |
| **Base de Datos** | MySQL                       |
| **Autenticación** | JWT + BCrypt                |
| **Almacenamiento de Fotos** | Cloudinary o AWS S3 (URL en BD) |
| **Hosting (futuro)** | Vercel (web), Render/Fly.io (API), App Store / Play Store |

---

## Funcionalidades (MVP)

| Rol           | Funcionalidad |
|---------------|-------------|
| **Público**   | Ver catálogo en cards → Acceder a vista detallada |
| **Admin**     | Iniciar sesión → Registrar persona (foto, datos, ubicación) |

> **Campo por defecto**: Lugar encontrado = *Querétaro*

---

## Estructura del Repositorio
