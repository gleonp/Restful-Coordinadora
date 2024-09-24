import { Usuario } from '../../../domain/entities/usuario';
import { UsuarioRepository } from '../../../application/repositories/usuario-repository.interface';
import connection from '../database'; 
import { RowDataPacket } from 'mysql2';

export class UsuarioRepositoryImpl implements UsuarioRepository {
    async crearUsuario(usuario: Omit<Usuario, 'id'>): Promise<Usuario> {

        console.log('Objeto usuario completo antes de la consulta:', usuario);

        const [result] = await connection.execute(
            'INSERT INTO usuarios (nombre, correoElectronico, password, token) VALUES (?, ?, ?, ?)',
            [usuario.nombre, usuario.correoElectronico, usuario.password, usuario.token] 
        );

        if ((result as any).insertId) {
            return { ...usuario, id: (result as any).insertId } as Usuario;
        } else {
            throw new Error('Error al crear el usuario');
        }
    }

    async actualizarToken(id: number, token: string | null): Promise<void> {
        await connection.execute(
            'UPDATE usuarios SET token = ? WHERE id = ?',
            [token, id]
        );
    }

    async obtenerUsuarioPorCorreoElectronico(correoElectronico: string): Promise<Usuario | null> {
        const [rows] = await connection.execute('SELECT * FROM usuarios WHERE correoElectronico = ?', [correoElectronico]);
        const usuarios: Usuario[] = (rows as RowDataPacket[]).map(row => new Usuario({
            id: row.id,
            nombre: row.nombre,
            correoElectronico: row.correoElectronico,
            password: row.password
        }));
        return usuarios.length > 0 ? usuarios[0] : null;
    }

    async obtenerTokenPorCorreoElectronico(correoElectronico: string): Promise<string | null> {
        const [rows] = await connection.execute('SELECT token FROM usuarios WHERE correoElectronico = ?', [correoElectronico]);
    
        const rowsData = rows as RowDataPacket[];
    
        return rowsData.length > 0 ? rowsData[0].token : null; 
    }
}