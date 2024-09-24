import { Request, Response } from 'express';
import { CrearEvento } from '../../application/usecases/crear-evento.usecase';
import { ObtenerEventoPorId } from '../../application/usecases/obtener-evento-por-id.usecase';
import { ObtenerTodosLosEventos } from '../../application/usecases/obtener-todos-los-eventos.usecase';
import { ActualizarEvento } from '../../application/usecases/actualizar-evento.usecase';
import { EliminarEvento } from '../../application/usecases/eliminar-evento.usecase';
import { EventoRepositoryImpl } from '../database/repositories/evento-repository-impl'; 


const eventoRepository = new EventoRepositoryImpl();
const crearEvento = new CrearEvento(eventoRepository);
const obtenerEventoPorId = new ObtenerEventoPorId(eventoRepository);
const obtenerTodosLosEventos = new ObtenerTodosLosEventos(eventoRepository);
const actualizarEvento = new ActualizarEvento(eventoRepository);
const eliminarEvento = new EliminarEvento(eventoRepository);

export const crearEventoHandler = async (req: Request, res: Response) => {
    try {
        const nuevoEvento = await crearEvento.execute(req.body);        

        res.status(201).json({
            message: `El evento '${nuevoEvento.nombre}' fue creado con éxito`,
            evento: nuevoEvento 
        });

        res.status(201).json(nuevoEvento);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const obtenerEventoPorIdHandler = async (req: Request, res: Response) => {
    try {
        const evento = await obtenerEventoPorId.execute(parseInt(req.params.id));
        if (!evento) {
            res.status(404).json({ error: 'Evento no encontrado' });
        } else {
            res.json(evento);
        }
    } catch (error) {
    res.status(400).json({ error: (error as Error).message });
    }
};

export const obtenerTodosLosEventosHandler = async (req: Request, res: Response) => {
    try {
        const eventos = await obtenerTodosLosEventos.execute();
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const actualizarEventoHandler = async (req: Request, res: Response) => {
    try {
        await actualizarEvento.execute(req.body);
        res.json({ message: 'Evento actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const eliminarEventoHandler = async (req: Request, res: Response) => {
    try {
        await eliminarEvento.execute(parseInt(req.params.id));
        res.json({ message: 'Evento eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};