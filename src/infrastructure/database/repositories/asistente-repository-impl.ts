import { Asistente } from '../../../domain/entities/asistente';
import { AsistenteRepository } from '../../../application/repositories/asistente-repository.interface';
import connection from '../database'; 
import { RowDataPacket } from 'mysql2';

export class AsistenteRepositoryImpl implements AsistenteRepository {

    async crearAsistente(asistente: Omit<Asistente, 'id'>): Promise<Asistente> {
        const [result] = await connection.execute(
            'INSERT INTO asistentes (nombre, correoElectronico, eventoId) VALUES (?, ?, ?)',
            [asistente.nombre, asistente.correoElectronico, asistente.eventoId]
        );

        if ((result as any).insertId) {
            return { ...asistente, id: (result as any).insertId };
        } else {
            throw new Error('Error al crear el asistente');
        }
    }

    async obtenerAsistentePorId(id: number): Promise<Asistente | null> {
        const [rows] = await connection.execute('SELECT * FROM asistentes WHERE id = ?', [id]);
        const asistentes: Asistente[] = (rows as RowDataPacket[]).map(row => new Asistente({
            id: row.id,
            nombre: row.nombre,
            correoElectronico: row.correoElectronico,
            eventoId: row.eventoId
        }));
        return asistentes.length > 0 ? asistentes[0] : null;
    }
    
    async obtenerAsistentesPorEvento(eventoId: number): Promise<Asistente[]> {
        const [rows] = await connection.execute('SELECT * FROM asistentes WHERE eventoId = ?', [eventoId]);
        return (rows as RowDataPacket[]).map(row => new Asistente({
            id: row.id,
            nombre: row.nombre,
            correoElectronico: row.correoElectronico,
            eventoId: row.eventoId
        }));
    }

    async actualizarAsistente(asistente: Asistente): Promise<void> {
        await connection.execute(
            'UPDATE asistentes SET nombre = ?, correoElectronico = ?, eventoId = ? WHERE id = ?',
            [asistente.nombre, asistente.correoElectronico, asistente.eventoId, asistente.id]
        );
    }

    async eliminarAsistente(id: number): Promise<void> {
        await connection.execute('DELETE FROM asistentes WHERE id = ?', [id]);
    }

    async obtenerAsistentePorCorreoElectronico(correoElectronico: string): Promise<Asistente | null> {
        const [rows] = await connection.execute('SELECT * FROM asistentes WHERE correoElectronico = ?', [correoElectronico]);
        const asistentes: Asistente[] = (rows as RowDataPacket[]).map(row => new Asistente({
            id: row.id,
            nombre: row.nombre,
            correoElectronico: row.correoElectronico,
            eventoId: row.eventoId
        }));
        return asistentes.length > 0 ? asistentes[0] : null;
    }

}