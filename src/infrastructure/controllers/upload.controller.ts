import { Request, Response } from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import { CrearEvento } from '../../application/usecases/crear-evento.usecase';
import { ActualizarEvento } from '../../application/usecases/actualizar-evento.usecase';
import { EventoRepositoryImpl } from '../database/repositories/evento-repository-impl';
import { Evento } from '../../domain/entities/evento'; 

const eventoRepository = new EventoRepositoryImpl();
const crearEvento = new CrearEvento(eventoRepository);
const actualizarEvento = new ActualizarEvento(eventoRepository);

// Configuración de Multer para manejar la subida de archivos
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

// Interfaz para los datos del archivo Excel
interface EventoExcelData {
    Nombre: string; 
    Descripción?: string; 
    'Fecha de Inicio': any;
    'Fecha de Fin': any;
    Latitud: string;
    Longitud: string;
    Capacidad: string
}

export const subirArchivoExcelHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No se proporcionó ningún archivo' });
            return; 
        }

        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0]; 
        const worksheet = workbook.Sheets[sheetName];

        const eventosData = xlsx.utils.sheet_to_json(worksheet) as EventoExcelData[];

        let eventosCreados = 0;
        let eventosActualizados = 0;

        // Procesar los datos del archivo Excel y guardarlos en la base de datos
        for (const eventoData of eventosData) {

            const fechaInicioExcel = eventoData['Fecha de Inicio'] as number;
            const fechaFinExcel = eventoData['Fecha de Fin'] as number;

            const fechaInicio = new Date((fechaInicioExcel - 25569) * 86400 * 1000);
            const fechaFin = new Date((fechaFinExcel - 25569) * 86400 * 1000);

            // Validar y transformar los datos 
            const evento: Omit<Evento, 'id'> = {
                nombre: eventoData.Nombre,
                descripcion: eventoData.Descripción || '',
                fechaInicio, 
                fechaFin,
                ubicacion: {
                    latitud: parseFloat(eventoData.Latitud), 
                    longitud: parseFloat(eventoData.Longitud)
            },
            capacidad: parseInt(eventoData.Capacidad)
            };

            // Validaciones adicionales 
            if (!evento.nombre || !evento.fechaInicio || !evento.fechaFin || !evento.ubicacion || !evento.capacidad) {
                throw new Error('Faltan datos obligatorios para crear el evento');
            }

            if (evento.fechaInicio >= evento.fechaFin) {
                throw new Error('La fecha de inicio debe ser anterior a la fecha de fin');
            }

            if (evento.capacidad <= 0) {
                throw new Error('La capacidad debe ser mayor a cero');
            }

            // Verificar si el evento ya existe
            const eventoExistente = await eventoRepository.obtenerEventoPorNombre(evento.nombre);

            if (eventoExistente) {
              // Actualizar el evento existente
                await actualizarEvento.execute({ ...eventoExistente, ...evento }); 
                eventosActualizados++;
            } else {
              // Crear un nuevo evento
                await crearEvento.execute(evento); 
                eventosCreados++;
            }
        }

        // Mensaje de respuesta
    let message = 'Archivo procesado correctamente. ';
    if (eventosCreados > 0) {
        message += `${eventosCreados} evento(s) creado(s). `;
    }
    if (eventosActualizados > 0) {
        message += `${eventosActualizados} evento(s) actualizado(s).`;
    }

    res.json({ message });

    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export const uploadExcelMiddleware = upload.single('archivo');