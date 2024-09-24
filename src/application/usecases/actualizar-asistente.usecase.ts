import { Asistente } from '../../domain/entities/asistente';
import { AsistenteRepository } from '../repositories/asistente-repository.interface';
import { EventoRepository } from '../repositories/evento-repository.interface';

export class ActualizarAsistente {
    constructor(
        private readonly asistenteRepository: AsistenteRepository,
        private readonly eventoRepository: EventoRepository
    ) {}

    async execute(asistente: Asistente): Promise<void> {
        // Validaciones
        if (!asistente.id || !asistente.nombre || !asistente.correoElectronico || !asistente.eventoId) {
            throw new Error('Faltan datos obligatorios para actualizar el asistente');
        }

        // Verificar si el evento existe y tiene capacidad disponible
        if (asistente.eventoId) {
            const evento = await this.eventoRepository.obtenerEventoPorId(asistente.eventoId);
                if (!evento) {
                throw new Error('El evento no existe');
                }

            const asistentes = await this.asistenteRepository.obtenerAsistentesPorEvento(evento.id);
                if (asistentes.length >= evento.capacidad) {
                    throw new Error('El evento ha alcanzado su capacidad máxima');
                }
        }

        await this.asistenteRepository.actualizarAsistente(asistente);
    }
}