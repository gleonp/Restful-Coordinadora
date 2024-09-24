import { Evento } from '../../domain/entities/evento';
import { EventoRepository } from '../repositories/evento-repository.interface';

export class ObtenerEventoPorId {
  constructor(private readonly eventoRepository: EventoRepository) {}

    async execute(id: number): Promise<Evento | null> {
        // Validación del ID
        if (id <= 0) {
            throw new Error('El ID del evento debe ser mayor a cero');
        }

        // Obtener el evento
        const evento = await this.eventoRepository.obtenerEventoPorId(id);
        return evento;
    }
}