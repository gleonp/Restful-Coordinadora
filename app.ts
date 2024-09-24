import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.config'; 

const app = express();

// Middlewares
app.use(cors()); 
app.use(helmet()); 
app.use(express.json()); 

// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '..', 'public')));

// Servir la documentación de Swagger en la ruta /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



export default app;