import { Asistente } from '../../domain/entities/asistente';
import { AsistenteRepository } from '../repositories/asistente-repository.interface';

export class ObtenerAsistentePorId {
    constructor(private readonly asistenteRepository: AsistenteRepository) {}

    async execute(id: number): Promise<Asistente | null> {
        if (id <= 0) {
        throw new Error('El ID del asistente debe ser mayor a cero');
        }

        return this.asistenteRepository.obtenerAsistentePorId(id);
    }
}