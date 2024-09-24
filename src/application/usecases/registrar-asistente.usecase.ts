import { Asistente } from '../../domain/entities/asistente';
import { AsistenteRepository } from '../repositories/asistente-repository.interface';
import { EventoRepository } from '../repositories/evento-repository.interface';

export class RegistrarAsistente {
    constructor(
        private readonly asistenteRepository: AsistenteRepository,
        private readonly eventoRepository: EventoRepository
    ) {}

    async execute(asistenteData: Omit<Asistente, 'id'>): Promise<Asistente> {        
        // Validaciones
        if (!asistenteData.nombre || !asistenteData.correoElectronico || !asistenteData.eventoId) {
            throw new Error('Faltan datos obligatorios para registrar el asistente');
        }

        // Verificar si el evento existe y tiene capacidad disponible
        const evento = await this.eventoRepository.obtenerEventoPorId(asistenteData.eventoId);
            if (!evento) {
            throw new Error('El evento no existe');
        }

        const asistentes = await this.asistenteRepository.obtenerAsistentesPorEvento(evento.id);
            if (asistentes.length >= evento.capacidad) {
            throw new Error('El evento ha alcanzado su capacidad máxima');
        }

        const nuevoAsistente = await this.asistenteRepository.crearAsistente(new Asistente(asistenteData));
        return nuevoAsistente;
    }
}