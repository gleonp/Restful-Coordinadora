import { Asistente } from '../../domain/entities/asistente';

export interface AsistenteRepository {
    crearAsistente(asistente: Asistente): Promise<Asistente>;
    obtenerAsistentePorId(id: number): Promise<Asistente | null>;
    obtenerAsistentesPorEvento(eventoId: number): Promise<Asistente[]>;
    actualizarAsistente(asistente: Asistente): Promise<void>;
    eliminarAsistente(id: number): Promise<void>;
    obtenerAsistentePorCorreoElectronico(correoElectronico: string): Promise<Asistente | null>;
}