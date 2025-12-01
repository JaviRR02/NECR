# NECR – Prototipo  
**Registro de Esperanza y Cuidado**  
*Prototipo funcional para la Fiscalía General del Estado de Querétaro*

---

## Descripción  
**NECR** es un sistema híbrido (web + app móvil) que gestiona un catálogo público y digno de personas fallecidas no reclamadas. Su objetivo es facilitar la identificación por parte de familiares y autoridades, con un enfoque humanitario, priorizando usabilidad, accesibilidad y sensibilidad.

Este prototipo unifica frontend y backend modernos. Es un **MVP funcional**, sin releases publicadas ni paquetes externos. Planes futuros incluyen despliegue en Vercel, Render/Fly.io y publicación en App Store / Play Store.

---

## Tecnologías utilizadas

| Capa                  | Tecnología                    |
|-----------------------|-------------------------------|
| **Frontend**          | React Native (iOS & Android)  |
| **Backend**           | FastAPI (Python)              |
| **Base de Datos**     | MySQL                         |
| **Autenticación**     | JWT + BCrypt                  |
| **Almacenamiento de fotos** | Cloudinary o AWS S3 (URL en BD) |
| **Hosting (planeado)**| Vercel (web), Render/Fly.io (API), App Store / Play Store |

---

## Funcionalidades (MVP actual)

| Rol       | Funcionalidad                                           |
|-----------|---------------------------------------------------------|
| **Público** | Visualizar catálogo en tarjetas → acceder a detalle   |
| **Admin** | Iniciar sesión → registrar persona (foto, datos, ubicación) |

> **Campo por defecto**: Lugar encontrado = *Querétaro*

---

## Estado actual del proyecto  
- Prototipo funcional en desarrollo activo  
- Sin releases publicadas  
- Estructura del repositorio en constante evolución  
