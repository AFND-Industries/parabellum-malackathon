# Malackathon 2024 - Gestión de Embalses Españoles

### Descripción del Reto:
El objetivo del reto Malackathon 2024, realizado el 17-18 de octubre, es diseñar una aplicación web segura que gestione y analice la información de los embalses en España, accediendo a la base de datos autónoma proporcionada por Oracle Cloud (OCI). La solución debe ser eficiente, permitir consultas avanzadas, y prever las necesidades de agua a partir de datos históricos.

## Fases del Reto:

### Fase 1 (obligatoria):
1. Descargar la información de las siguientes tablas:
   - **EMBALSES**: Contiene información básica de los embalses.
   - **AGUA_ALMACENADA**: Registra el agua almacenada en los embalses en diversas fechas.
   - **LISTADO_EMBALSES**: Datos adicionales de los embalses.

2. Cargar los datos en una base de datos autónoma de Oracle Cloud (OCI).
3. Establecer relaciones entre los datos de las tablas para los embalses de Andalucía. Se pueden crear tablas intermedias y añadir índices.

### Fase 2 (obligatoria):
1. Desarrollar una aplicación web segura, accesible desde dispositivos móviles.
2. La aplicación debe:
   - Mostrar embalses en un radio de 100 km alrededor de la ubicación del usuario o una ubicación GPS dada.
   - Incluir funcionalidades para filtrar datos y calcular estadísticas (máximos, mínimos, medias).
   - Prestar especial atención al agua embalsada a final del año hidrológico.
3. Implementar medidas de seguridad para evitar ataques de web scraping y denegación de servicio.

### Fase 3:
1. Modificar el modelo de datos según sea necesario.
2. Enriquecer la información de los embalses con datos adicionales (pluviometría, temperatura, consumo de agua, etc.).

### Fase 4:
1. Analizar patrones de consumo de agua en los últimos 5 años.
2. Predecir las necesidades de agua para los próximos 12 meses.

### Fase 5:
1. Proponer soluciones de trasvase de agua entre embalses cercanos.
2. Evaluar capacidad, disponibilidad y predicciones para asegurar una distribución equilibrada.
   
## Valoración del Proyecto:
- **Rendimiento**: Evaluar la rapidez del procesamiento de datos.
- **Eficiencia**: Uso óptimo de recursos computacionales.
- **Optimización**: Mejora en la distribución del agua.
- **Precisión**: Calidad de las predicciones y recomendaciones.
- **Metodologías**: Uso riguroso de metodologías de desarrollo y herramientas de IA.
- **Seguridad**: Integración de aspectos de seguridad.
- **UI/UX**: Accesibilidad y usabilidad en la interfaz de usuario.

## Tecnologías Utilizadas:
### Backend:
- **Express.js** y **FastAPI**: Gestión de la API y conexión con la base de datos.
  
### Frontend:
- **React**: Interfaz de usuario para dispositivos móviles y escritorio.
  
### Base de Datos:
- **Oracle Cloud Infrastructure (OCI)**: Base de datos autónoma para almacenar y procesar los datos de los embalses.

## Seguridad:
1. **CAPTCHA**: Protección contra web scraping y ataques de automatización.
2. **Rate Limiting**: Límite de peticiones para prevenir denegación de servicio.
3. **Análisis de User-Agent**: Detectar scraping mediante User-Agent de navegadores.
4. **Retardos en las Respuestas**: Introducción de retardos para ralentizar las herramientas automatizadas.

## Uso de la Aplicación:
1. **Filtro de Coordenadas**: Ingrese las coordenadas o utilice la ubicación GPS para encontrar embalses cercanos.
2. **Estadísticas**: Realice consultas sobre el nivel de agua, embalses eléctricos, y más.
3. **Seguridad**: La aplicación utiliza varios mecanismos de seguridad para asegurar un uso adecuado por parte de los usuarios.

## Instalación y Ejecución:

### Backend:
1. Clonar el repositorio del proyecto.
2. Instalar dependencias con `npm install` (Express) y `pip install` (FastAPI).
3. Configurar las variables de entorno necesarias para la conexión con la base de datos OCI.
4. Ejecutar el backend con:
   - Express: `npm start`
   - FastAPI: `uvicorn main:app --reload`

### Frontend:
1. Clonar el repositorio del frontend.
2. Instalar las dependencias con `npm install`.
3. Configurar las variables de entorno para el acceso a la API y Google reCAPTCHA.
4. Ejecutar el frontend con `npm start`.

## Contribuciones:
Este proyecto fue desarrollado por los participantes del equipo durante la competición Malackathon 2024. Cada miembro contribuyó en áreas específicas como backend, frontend, y la integración con OCI.
