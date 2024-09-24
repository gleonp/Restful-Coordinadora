# API RESTful de Gestión de Eventos

Esta es una API RESTful desarrollada en Node.js con Express y TypeScript para gestionar eventos y asistentes. La API sigue los principios de Clean Architecture para una mejor organización y mantenibilidad del código.

## Funcionalidades

*   **CRUD de Eventos:** Permite crear, leer, actualizar y eliminar eventos.
*   **Registro de Asistentes:** Permite registrar asistentes a eventos específicos.
*   **Consultas:** 
    *   Obtener todos los eventos
    *   Obtener detalles de un evento por su ID
    *   Obtener asistentes de un evento por su ID
    *   Obtener lugares cercanos a un evento utilizando la API de geocodificación de Mapbox
    *   Obtener un reporte de la cantidad de asistentes por día de la semana
*   **Autenticación:** Utiliza tokens JWT para autenticar a los usuarios y proteger los endpoints que realizan operaciones de transacción (crear, actualizar y eliminar eventos y asistentes).

## Tecnologías Utilizadas

*   **Backend:**
    *   Node.js
    *   Express
    *   TypeScript
    *   MySQL
    *   `mysql2` (driver de MySQL para Node.js)
    *   `jsonwebtoken` (para generar y verificar tokens JWT)
    *   `@mapbox/mapbox-sdk` (para interactuar con la API de Mapbox)
    *   `xlsx` (para procesar archivos Excel)
    *   `multer` (para manejar la subida de archivos)
*   **Frontend (opcional):**
    *   HTML, CSS y JavaScript básicos

## Instalación y Configuración

1.  **Clonar el repositorio:**

    ```bash
    git clone
    ```

2.  **Instalar las dependencias:**

    ```bash
    npm install
    ```

3.  **Configurar la base de datos:**

    *   **Crear la base de datos:** Crea una base de datos MySQL (por ejemplo, `eventos_db`).
    *   **Configurar las variables de entorno:** 
        *   Crea un archivo `.env` en la raíz del proyecto.
        *   Copia el contenido del archivo `.env.example` en tu archivo `.env`.
        *   Reemplaza los valores de las variables de entorno con tus propios datos (host, puerto, usuario, contraseña de MySQL, clave secreta de JWT y token de acceso de Mapbox).
    *   **Ejecutar los scripts DDL:** Ejecuta el archivo `crear_tablas.sql` en tu base de datos para crear las tablas necesarias.

4.  **Compilar el código TypeScript (si es necesario):**

    ```bash
    npm run build
    ```

5.  **Iniciar el servidor:**

    ```bash
    npm run dev  # Modo de desarrollo
    ```

    o

    ```bash
    npm run start # Modo de producción
    ```

## Documentación de la API

La documentación interactiva de la API, generada con Swagger, está disponible en la siguiente URL:

*   `http://localhost:3000/api-docs`

## Video Explicativo

*   [Enlace al video](https://www.youtube.com/watch?v=xh_VMUVXiAk): En este video, explico la solución que he implementado para el reto técnico, incluyendo la estructura del proyecto, las tecnologías utilizadas, las funcionalidades de la API y una demostración en funcionamiento.


## Ejemplos de Solicitudes en Postman

A continuación, se presentan ejemplos de cómo consumir los endpoints de la API utilizando Postman, incluyendo la autenticación con JWT. Se debe utilizarel header Authorization: Bearer `<tu_token_jwt>`.  Se debe reemplazar reemplazar `<tu_token_jwt>` con un token válido obtenido al registrar un usuario.

**1. Registrar un nuevo usuario**

*   **Método:** `POST`
*   **URL:** `http://localhost:3000/api/auth/registro`
*   **Headers:** `Content-Type: application/json`
*   **Body (JSON):**

```json
{
    "nombre": "Juan Pérez",
    "correoElectronico": "juan.perez@example.com",
    "password": "contraseña_segura"
}
