import { EventoRepository } from '../repositories/evento-repository.interface';

export class EliminarEvento {
    constructor(private readonly eventoRepository: EventoRepository) {}

    async execute(id: number): Promise<void> {
        // Validación del ID 
        if (id <= 0) {
        throw new Error('El ID del evento debe ser mayor a cero');
        }

        await this.eventoRepository.eliminarEvento(id);
    }
}