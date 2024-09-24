import { Request, Response } from 'express';
import { CalcularAsistentesPorDia } from '../../application/usecases/calcular-asistentes-por-dia.usecase';
import { EventoRepositoryImpl } from '../database/repositories/evento-repository-impl';
import { AsistenteRepositoryImpl } from '../database/repositories/asistente-repository-impl';

const eventoRepository = new EventoRepositoryImpl();
const asistenteRepository = new AsistenteRepositoryImpl();
const calcularAsistentesPorDia = new CalcularAsistentesPorDia(eventoRepository, asistenteRepository);

export const obtenerReporteAsistentesPorDiaHandler = async (req: Request, res: Response) => {
    try {
        const resultado = await calcularAsistentesPorDia.execute();
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};