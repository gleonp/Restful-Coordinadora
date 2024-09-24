import { Evento } from '../../../domain/entities/evento';
import { EventoRepository } from '../../../application/repositories/evento-repository.interface';
import connection from '../database'; 
import { RowDataPacket } from 'mysql2';

export class EventoRepositoryImpl implements EventoRepository {

    async crearEvento(evento: Evento): Promise<Evento> {
        const [result] = await connection.execute(
            'INSERT INTO eventos (nombre, descripcion, fechaInicio, fechaFin, latitud, longitud, capacidad) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [evento.nombre, evento.descripcion, evento.fechaInicio, evento.fechaFin, evento.ubicacion.latitud, evento.ubicacion.longitud, evento.capacidad]
        );
        
        if ((result as any).insertId) {
            return { ...evento, id: (result as any).insertId };
        } else {
            throw new Error('Error al crear el evento');
        }
    }    

    async obtenerEventoPorId(id: number): Promise<Evento | null> {
        const [rows, fields] = await connection.execute('SELECT * FROM eventos WHERE id = ?', [id]);

        const eventos: Evento[] = (rows as RowDataPacket[]).map(row => new Evento({
            id: row.id,
            nombre: row.nombre,
            descripcion: row.descripcion,
            fechaInicio: new Date(row.fechaInicio),
            fechaFin: new Date(row.fechaFin), 
            ubicacion: { latitud: row.latitud, longitud: row.longitud },
            capacidad: row.capacidad
        }));

        return eventos.length > 0 ? eventos[0] : null;
    }

    async obtenerTodosLosEventos(): Promise<Evento[]> {
        const [rows, fields] = await connection.execute('SELECT * FROM eventos');

        const eventos: Evento[] = (rows as RowDataPacket[]).map(row => new Evento({
            id: row.id,
            nombre: row.nombre,
            descripcion: row.descripcion,
            fechaInicio: new Date(row.fechaInicio), 
            fechaFin: new Date(row.fechaFin), 
            ubicacion: { latitud: row.latitud, longitud: row.longitud },
            capacidad: row.capacidad
        }));

        return eventos;
    }

    async actualizarEvento(evento: Evento): Promise<void> {
        await connection.execute(
            'UPDATE eventos SET nombre = ?, descripcion = ?, fechaInicio = ?, fechaFin = ?, latitud = ?, longitud = ?, capacidad = ? WHERE id = ?',
            [evento.nombre, evento.descripcion, evento.fechaInicio, evento.fechaFin, evento.ubicacion.latitud, evento.ubicacion.longitud, evento.capacidad, evento.id]
        );
    }

    async eliminarEvento(id: number): Promise<void> {
        await connection.execute('DELETE FROM eventos WHERE id = ?', [id]);
    }

    async obtenerEventoPorNombre(nombre: string): Promise<Evento | null> {
        const [rows] = await connection.execute('SELECT * FROM eventos WHERE nombre = ?', [nombre]);
            
        const eventos: Evento[] = (rows as RowDataPacket[]).map(row => new Evento({
            id: row.id,
            nombre: row.nombre,
            descripcion: row.descripcion,
            fechaInicio: new Date(row.fechaInicio), 
            fechaFin: new Date(row.fechaFin), 
            ubicacion: { latitud: row.latitud, longitud: row.longitud },
            capacidad: row.capacidad
        }));
    
        return eventos.length > 0 ? eventos[0] : null;
    }

}