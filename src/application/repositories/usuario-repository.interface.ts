import { Usuario } from '../../domain/entities/usuario';

export interface UsuarioRepository {
    crearUsuario(usuario: Omit<Usuario, 'id'>): Promise<Usuario>;
    obtenerUsuarioPorCorreoElectronico(correoElectronico: string): Promise<Usuario | null>;
    actualizarToken(id: number, token: string | null): Promise<void>;
    obtenerTokenPorCorreoElectronico(correoElectronico: string): Promise<string | null>;
}