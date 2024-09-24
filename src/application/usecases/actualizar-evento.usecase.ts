import { Evento } from '../../domain/entities/evento';
import { EventoRepository } from '../repositories/evento-repository.interface';

export class ActualizarEvento {
    constructor(private readonly eventoRepository: EventoRepository) {}

    async execute(evento: Evento): Promise<void> {
        // Validaciones
        if (!evento.id || !evento.nombre || !evento.fechaInicio || !evento.fechaFin || !evento.ubicacion || !evento.capacidad) {
        throw new Error('Faltan datos obligatorios para actualizar el evento');
        }

        if (evento.fechaInicio >= evento.fechaFin) {
            throw new Error('La fecha de inicio debe ser anterior a la fecha de fin');
        }

        if (evento.capacidad <= 0) {
            throw new Error('La capacidad debe ser mayor a cero');
        }

        await this.eventoRepository.actualizarEvento(evento);
    }
}