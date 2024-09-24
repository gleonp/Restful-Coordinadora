import { Router } from 'express';
import * as eventoController from '../controllers/evento.controller';
import * as asistenteController from '../controllers/asistente.controller';
import * as authController from '../controllers/auth.controller';
import * as consultaTokenController from '../controllers/consulta-token.controller';
import * as uploadController from '../controllers/upload.controller';
import * as lugaresCercanosController from '../controllers/lugares-cercanos.controller';
import * as reporteController from '../controllers/reporte.controller';
import { autenticarUsuario } from '../middlewares/auth.middleware';

const router = Router();



// Rutas públicas (no requieren autenticación)
/**
 * @swagger
 * /auth/registro:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Registra un nuevo usuario en la aplicación y genera un token JWT para la autenticación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correoElectronico:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente. Retorna el token JWT generado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Error en la validación de datos o el correo electrónico ya está registrado.
 *       500:
 *         description: Error interno del servidor
 */
router.post('/auth/registro', authController.registroHandler);


/**
 * @swagger
 * /consultar-token:
 *   get:
 *     summary: Consultar el token de un usuario
 *     description: Retorna el token JWT de un usuario a partir de su correo electrónico.
 *     parameters:
 *       - in: query
 *         name: correoElectronico
 *         schema:
 *           type: string
 *         required: true
 *         description: Correo electrónico del usuario
 *     responses:
 *       200:
 *         description: Token encontrado. Retorna el token JWT del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Error en la validación de datos o faltan datos obligatorios
 *       404:
 *         description: Token no encontrado para el correo electrónico proporcionado
 */
router.get('/consultar-token', consultaTokenController.consultarTokenHandler);


/**
 * @swagger
 * /lugares-cercanos:
 *   get:
 *     summary: Obtiene lugares cercanos a una ubicación
 *     description: Retorna una lista de lugares cercanos a las coordenadas especificadas, dentro de un radio determinado.
 *     parameters:
 *       - in: query
 *         name: latitud
 *         schema:
 *           type: number
 *           format: double
 *         required: true
 *         description: Latitud de la ubicación central
 *       - in: query
 *         name: longitud
 *         schema:
 *           type: number
 *           format: double
 *         required: true
 *         description: Longitud de la ubicación central
 *       - in: query
 *         name: radio
 *         schema:
 *           type: integer
 *         required: true
 *         description: Radio de búsqueda en metros
 *     responses:
 *       200:
 *         description: Lugares cercanos encontrados. Retorna una lista de lugares cercanos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: 
 *                     type: string
 *                     description: ID del lugar en Mapbox
 *                   text:
 *                     type: string
 *                     description: Nombre del lugar
 *                   place_name:
 *                     type: string
 *                     description: Nombre completo del lugar, incluyendo contexto
 *                   center:
 *                     type: array
 *                     items:
 *                       type: number
 *                       format: double
 *                     description: Coordenadas [longitud, latitud] del centro del lugar
 *       400:
 *         description: Error en la validación de datos o faltan datos obligatorios
 *       500:
 *         description: Error interno del servidor o al comunicarse con la API de Mapbox
 */
router.get('/lugares-cercanos', lugaresCercanosController.obtenerLugaresCercanosHandler);



// Desde acá se listan las rutas que requieren autenticación
router.use(autenticarUsuario);



// Rutas para eventos
/**
 * @swagger
 * /eventos:
 *   get:
 *     summary: Obtiene todos los eventos
 *     description: Retorna una lista de todos los eventos registrados en la base de datos.
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Lista de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evento' 
 *   post:
 *     summary: Crea un nuevo evento
 *     description: Crea un nuevo evento en la base de datos.
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento' 
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento' 
 *       400:
 *         description: Error en la validación de datos o faltan datos obligatorios
 *       401:
 *         description: Acceso no autorizado (token JWT inválido o no proporcionado)
 *       500:
 *         description: Error interno del servidor
 *   put:
 *     summary: Actualiza un evento existente
 *     description: Actualiza un evento existente en la base de datos.
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento' 
 *     responses:
 *       200:
 *         description: Evento actualizado correctamente
 *       400:
 *         description: Error en la validación de datos o faltan datos obligatorios
 *       401:
 *         description: Acceso no autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/eventos', eventoController.obtenerTodosLosEventosHandler);
router.post('/eventos', autenticarUsuario, eventoController.crearEventoHandler);
router.put('/eventos', autenticarUsuario, eventoController.actualizarEventoHandler);

/**
 * @swagger
 * /eventos/{id}:
 *   get:
 *     summary: Obtiene un evento por su ID
 *     description: Retorna los detalles de un evento específico a partir de su ID.
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Evento encontrado. Retorna los detalles del evento.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 *       400:
 *         description: Error en la validación de datos o faltan datos obligatorios
 *       401:
 *         description: Acceso no autorizado
 *       404:
 *         description: Evento no encontrado
 *   delete:
 *     summary: Elimina un evento por su ID
 *     description: Elimina un evento específico de la base de datos a partir de su ID.
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Evento eliminado correctamente
 *       400:
 *         description: Error en la validación de datos o faltan datos obligatorios
 *       401:
 *         description: Acceso no autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/eventos/:id', eventoController.obtenerEventoPorIdHandler);
router.delete('/eventos/:id', autenticarUsuario, eventoController.eliminarEventoHandler);



// Rutas para asistentes
/**
 * @swagger
 * /asistentes:
 *   post:
 *     summary: Registra un nuevo asistente a un evento
 *     description: Registra un nuevo asistente a un evento específico.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asistente' 
 *     responses:
 *       201:
 *         description: Asistente registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación
 *                 asistente:
 *                   $ref: '#/components/schemas/Asistente'
 *       400:
 *         description: Error en la validación de datos, faltan datos obligatorios, el evento no existe o el evento está lleno.
 *       401:
 *         description: Acceso no autorizado
 *       500:
 *         description: Error interno del servidor
 *   put:
 *     summary: Actualiza un asistente existente
 *     description: Actualiza los datos de un asistente existente.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asistente' 
 *     responses:
 *       200:
 *         description: Asistente actualizado correctamente
 *       400:
 *         description: Error en la validación de datos o faltan datos obligatorios
 *       401:
 *         description: Acceso no autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/asistentes', autenticarUsuario, asistenteController.registrarAsistenteHandler);
router.put('/asistentes', autenticarUsuario, asistenteController.actualizarAsistenteHandler);

/**
 * @swagger
 * /asistentes/{id}:
 *   get:
 *     summary: Obtiene un asistente por su ID
 *     description: Retorna los detalles de un asistente específico a partir de su ID.
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del asistente
 *     responses:
 *       200:
 *         description: Asistente encontrado. Retorna los detalles del asistente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Asistente'
 *       400:
 *         description: Error en la validación de datos o faltan datos obligatorios
 *       401:
 *         description: Acceso no autorizado
 *       404:
 *         description: Asistente no encontrado
 *   delete:
 *     summary: Elimina un asistente por su ID
 *     description: Elimina un asistente específico de la base de datos a partir de su ID.
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del asistente
 *     responses:
 *       200:
 *         description: Asistente eliminado correctamente
 *       400:
 *         description: Error en la validación de datos o faltan datos obligatorios
 *       401:
 *         description: Acceso no autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/asistentes/:id', asistenteController.obtenerAsistentePorIdHandler);
router.delete('/asistentes/:id', autenticarUsuario, asistenteController.eliminarAsistenteHandler);

/**
 * @swagger
 * /eventos/{eventoId}/asistentes:
 *   get:
 *     summary: Obtiene los asistentes de un evento
 *     description: Retorna una lista de todos los asistentes registrados a un evento específico.
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Lista de asistentes del evento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Asistente'
 *       400:
 *         description: Error en la validación de datos o faltan datos obligatorios
 *       401:
 *         description: Acceso no autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/eventos/:eventoId/asistentes', asistenteController.obtenerAsistentesPorEventoHandler);



/**
 * @swagger
 * /subir-archivo:
 *   post:
 *     summary: Subir archivo Excel para crear o actualizar eventos
 *     description: Sube un archivo Excel que contiene información sobre eventos. La API procesará el archivo, creará nuevos eventos si no existen o actualizará los existentes si ya están en la base de datos (basándose en el nombre del evento).
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data: 
 *           schema:
 *             type: object
 *             properties:
 *               archivo:
 *                 type: string
 *                 format: binary 
 *                 description: Archivo Excel a subir (.xls o .xlsx)
 *     responses:
 *       200:
 *         description: Archivo procesado correctamente. Retorna un mensaje indicando el número de eventos creados y actualizados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: No se proporcionó ningún archivo o hubo un error en la validación de los datos del archivo.
 *       401:
 *         description: Acceso no autorizado (token JWT inválido o no proporcionado)
 *       500:
 *         description: Error interno del servidor o al procesar el archivo
 */
router.post('/subir-archivo', autenticarUsuario, uploadController.uploadExcelMiddleware, uploadController.subirArchivoExcelHandler);


/**
 * @swagger
 * /reporte-asistentes-por-dia:
 *   get:
 *     summary: Obtiene un reporte de asistentes por día de la semana
 *     description: Retorna un reporte que muestra la cantidad de asistentes registrados para cada día de la semana.
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Reporte de asistentes por día
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   dia:
 *                     type: string
 *                     description: Nombre del día de la semana
 *                   cantidadAsistentes:
 *                     type: integer
 *                     description: Cantidad de asistentes registrados para ese día
 *       401:
 *         description: Acceso no autorizado (token JWT inválido o no proporcionado)
 *       500:
 *         description: Error interno del servidor
 */
router.get('/reporte-asistentes-por-dia', autenticarUsuario, reporteController.obtenerReporteAsistentesPorDiaHandler);

export default router;