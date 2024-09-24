export class Usuario {
    id: number;
    nombre: string;
    correoElectronico: string;
    password: string;
    token?: string | null;

    constructor(data: Partial<Usuario>) {
        this.id = data.id || 0;
        this.nombre = data.nombre || '';
        this.correoElectronico = data.correoElectronico || '';
        this.password = data.password || '';
        this.token = data.token || '';
    }
}