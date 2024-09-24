
import { Evento } from '../../domain/entities/evento';
import { EventoRepository } from '../repositories/evento-repository.interface';

export class CrearEvento {
  constructor(private readonly eventoRepository: EventoRepository) {} 

    async execute(eventoData: Omit<Evento, 'id'>): Promise<Evento> { 
        // Validaciones 
        if (!eventoData.nombre || !eventoData.fechaInicio || !eventoData.fechaFin || !eventoData.ubicacion || !eventoData.capacidad) {
            throw new Error('Faltan datos obligatorios para crear el evento');
        }

        if (eventoData.fechaInicio >= eventoData.fechaFin) {
            throw new Error('La fecha de inicio debe ser anterior a la fecha de fin');
        }

        if (eventoData.capacidad <= 0) {
            throw new Error('La capacidad debe ser mayor a cero');
        }

        // Crear el evento
        const nuevoEvento = await this.eventoRepository.crearEvento(new Evento(eventoData));
        return nuevoEvento;
    }
}