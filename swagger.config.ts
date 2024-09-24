import swaggerJSDoc from 'swagger-jsdoc';
import { OpenAPIObject } from '@nestjs/swagger';

const swaggerDefinition: OpenAPIObject = {    
    openapi: '3.0.0',
    info: {
        title: 'API de Gestión de Eventos (Coordinadora)',
        version: '1.0.0',
        description:  `
        Una API RESTful para crear, editar, eliminar y consultar eventos y asistentes. 

        ## Autenticación

        Esta API utiliza tokens JWT (JSON Web Tokens) para la autenticación. 

        Para obtener un token, debes registrar un nuevo usuario en el endpoint /auth/registro. 
        La respuesta incluirá el token JWT generado.

        Si el token es válido, la API procesará la solicitud y te devolverá la respuesta correspondiente. 
        Si el token es inválido o ha expirado, la API devolverá un error de autenticación (401 Unauthorized).
        `,
    },
    servers: [
        {
            url: 'http://localhost:3000/api', 
            description: 'Servidor de desarrollo local',
        },
    ],
    components: {
        schemas: {
            Evento: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        description: 'ID del evento'
                    },
                    nombre: {
                        type: 'string',
                        description: 'Nombre del evento'
                    },
                    descripcion: {
                        type: 'string',
                        description: 'Descripción del evento'
                    },
                    fechaInicio: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Fecha y hora de inicio del evento'
                    },
                    fechaFin: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Fecha y hora de finalización del evento'
                    },
                    ubicacion: {
                        type: 'object',
                        properties: {
                            latitud: {
                                type: 'number',
                                format: 'double',
                                description: 'Latitud de la ubicación del evento'
                            },
                            longitud: {
                                type: 'number',
                                format: 'double',
                                description: 'Longitud de la ubicación del evento'
                            }
                        }
                    },
                    capacidad: {
                        type: 'integer',
                        description: 'Capacidad máxima de asistentes al evento'
                    }
                }
            },
            Usuario: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        description: 'ID del usuario'
                    },
                    nombre: {
                        type: 'string',
                        description: 'Nombre del usuario'
                    },
                    correoElectronico: {
                        type: 'string',
                        format: 'email',
                        description: 'Correo electrónico del usuario'
                    },
                    password: {
                        type: 'string',
                        description: 'Contraseña del usuario'
                    },
                    token: {
                        type: 'string',
                        description: 'Token JWT para la autenticación'
                    }
                }
            },
            Asistente: {
                type: 'object',
                properties: {
                    id: {
                    type: 'integer',
                    description: 'ID del asistente'
                },
                nombre: {
                    type: 'string',
                    description: 'Nombre del asistente'
                },
                correoElectronico: {
                    type: 'string',
                    format: 'email',
                    description: 'Correo electrónico del asistente'
                },
                eventoId: {
                    type: 'integer',
                    description: 'ID del evento al que asiste el asistente'
                }
            }
        },      
    },
    securitySchemes: {
        bearerAuth: { 
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        }
    }
},  
    security: [{
        bearerAuth: [] 
    }],
    paths: {},
};


const options = {
    swaggerDefinition,
    apis: ['./src/infrastructure/routes/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;