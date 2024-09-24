export class Evento {
    id: number;
    nombre: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    ubicacion: { latitud: number; longitud: number };
    capacidad: number;

    constructor(data: Partial<Evento>) {
        this.id = data.id || 0;
        this.nombre = data.nombre || ''; 
        this.descripcion = data.descripcion || ''; 
        this.fechaInicio = data.fechaInicio || new Date(); 
        this.fechaFin = data.fechaFin || new Date();
        this.ubicacion = data.ubicacion || { latitud: 0, longitud: 0 }; 
        this.capacidad = data.capacidad || 0; 
    }
}