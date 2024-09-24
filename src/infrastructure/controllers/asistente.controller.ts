import { Request, Response } from 'express';
import { RegistrarAsistente } from '../../application/usecases/registrar-asistente.usecase';
import { ObtenerAsistentePorId } from '../../application/usecases/obtener-asistente-por-id.usecase';
import { ObtenerAsistentesPorEvento } from '../../application/usecases/obtener-asistentes-por-evento.usecase';
import { ActualizarAsistente } from '../../application/usecases/actualizar-asistente.usecase';
import { EliminarAsistente } from '../../application/usecases/eliminar-asistente.usecase';
import { AsistenteRepositoryImpl } from '../database/repositories/asistente-repository-impl';
import { EventoRepositoryImpl } from '../database/repositories/evento-repository-impl';

const asistenteRepository = new AsistenteRepositoryImpl();
const eventoRepository = new EventoRepositoryImpl();
const registrarAsistente = new RegistrarAsistente(asistenteRepository, eventoRepository);
const obtenerAsistentePorId = new ObtenerAsistentePorId(asistenteRepository);
const obtenerAsistentesPorEvento = new ObtenerAsistentesPorEvento(asistenteRepository);
const actualizarAsistente = new ActualizarAsistente(asistenteRepository, eventoRepository);
const eliminarAsistente = new EliminarAsistente(asistenteRepository);

export const registrarAsistenteHandler = async (req: Request, res: Response) => {
    try {
        const nuevoAsistente = await registrarAsistente.execute(req.body);
        
        let nombreEvento = 'Desconocido'; 
        if (nuevoAsistente.eventoId) { 
            const evento = await eventoRepository.obtenerEventoPorId(nuevoAsistente.eventoId);
            nombreEvento = evento ? evento.nombre : 'Desconocido';
        }

        res.status(201).json({
            message: `Asistente registrado exitosamente para el evento: ${nombreEvento}`,
            asistente: nuevoAsistente 
        });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const obtenerAsistentePorIdHandler = async (req: Request, res: Response) => {
    try {
        const asistente = await obtenerAsistentePorId.execute(parseInt(req.params.id));
        if (!asistente) {
            res.status(404).json({ error: 'Asistente no encontrado' });
        } else {
            res.json(asistente);
        }
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const obtenerAsistentesPorEventoHandler = async (req: Request, res: Response) => {
    try {
        const asistentes = await obtenerAsistentesPorEvento.execute(parseInt(req.params.eventoId));
        res.json(asistentes);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const actualizarAsistenteHandler = async (req: Request, res: Response) => {
    try {
        await actualizarAsistente.execute(req.body);
        res.json({ message: 'Asistente actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const eliminarAsistenteHandler = async (req: Request, res: Response) => {
    try {
        await eliminarAsistente.execute(parseInt(req.params.id));
        res.json({ message: 'Asistente eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};