import { AsistenteRepository } from '../repositories/asistente-repository.interface';

export class EliminarAsistente {
    constructor(private readonly asistenteRepository: AsistenteRepository) {}

    async execute(id: number): Promise<void> {
        if (id <= 0) {
            throw new Error('El ID del asistente debe ser mayor a cero');
        }

        await this.asistenteRepository.eliminarAsistente(id);
    }
}