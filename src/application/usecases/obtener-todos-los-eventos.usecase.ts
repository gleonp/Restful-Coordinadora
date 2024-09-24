import { Evento } from '../../domain/entities/evento';
import { EventoRepository } from '../repositories/evento-repository.interface';

export class ObtenerTodosLosEventos {
    constructor(private readonly eventoRepository: EventoRepository) {}

    async execute(): Promise<Evento[]> {
        return this.eventoRepository.obtenerTodosLosEventos();
    }
}