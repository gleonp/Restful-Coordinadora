import { UsuarioRepository } from '../repositories/usuario-repository.interface';

export class ObtenerTokenPorCorreoElectronico {
    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    async execute(correoElectronico: string): Promise<string | null> {
        // Validaciones
        if (!correoElectronico) {
            throw new Error('Debes proporcionar un correo electrónico');
        }

    return this.usuarioRepository.obtenerTokenPorCorreoElectronico(correoElectronico);
    }
}