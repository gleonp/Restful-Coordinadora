export class Asistente {
    id: number;
    nombre: string;
    correoElectronico: string;
    eventoId?: number;    

    constructor(data: Partial<Asistente>) {
        this.id = data.id || 0;
        this.nombre = data.nombre || '';
        this.correoElectronico = data.correoElectronico || '';
        this.eventoId = data.eventoId;        
    }
}