
import { EventoRepository } from '../repositories/evento-repository.interface';
import { AsistenteRepository } from '../repositories/asistente-repository.interface';

export class CalcularAsistentesPorDia {
    constructor(
        private readonly eventoRepository: EventoRepository,
        private readonly asistenteRepository: AsistenteRepository
    ) {}

    async execute(): Promise<{ dia: string; cantidadAsistentes: number }[]> {
        const eventos = await this.eventoRepository.obtenerTodosLosEventos();

        const resultado: { dia: string; cantidadAsistentes: number }[] = [];

        for (const evento of eventos) {
            const asistentes = await this.asistenteRepository.obtenerAsistentesPorEvento(evento.id);
            const diaSemana = evento.fechaInicio.getDay(); // 0 (Domingo) a 6 (Sábado)
            const nombreDia = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][diaSemana];

            // Buscar si ya existe una entrada para este día en el resultado
            const entradaExistente = resultado.find(r => r.dia === nombreDia);

        if (entradaExistente) {
            entradaExistente.cantidadAsistentes += asistentes.length;
        } else {
            resultado.push({ dia: nombreDia, cantidadAsistentes: asistentes.length });
        }
    }

    return resultado;
    }
}