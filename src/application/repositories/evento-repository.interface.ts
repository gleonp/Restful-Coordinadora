import { Evento } from '../../domain/entities/evento';

export interface EventoRepository {
    crearEvento(evento: Evento): Promise<Evento>;
    obtenerEventoPorId(id: number): Promise<Evento | null>;
    obtenerTodosLosEventos(): Promise<Evento[]>;
    actualizarEvento(evento: Evento): Promise<void>;
    eliminarEvento(id: number): Promise<void>;
    obtenerEventoPorNombre(nombre: string): Promise<Evento | null>;
}