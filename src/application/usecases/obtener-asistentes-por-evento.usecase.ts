import { Asistente } from '../../domain/entities/asistente';
import { AsistenteRepository } from '../repositories/asistente-repository.interface';

export class ObtenerAsistentesPorEvento {
    constructor(private readonly asistenteRepository: AsistenteRepository) {}

    async execute(eventoId: number): Promise<Asistente[]> {
        if (eventoId <= 0) {
            throw new Error('El ID del evento debe ser mayor a cero');
        }

        return this.asistenteRepository.obtenerAsistentesPorEvento(eventoId);
    }
}