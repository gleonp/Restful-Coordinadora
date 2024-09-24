import { Request, Response } from 'express';
import { generarToken } from '../../application/services/auth.service';
import { UsuarioRepositoryImpl } from '../database/repositories/usuario-repository-impl';

const usuarioRepository = new UsuarioRepositoryImpl();

export const registroHandler = async (req: Request, res: Response) => {
    try {
        const { nombre, correoElectronico, password } = req.body;

        // Generar el token JWT antes de crear el usuario
        const token = generarToken({ nombre, correoElectronico });

        // Crear el nuevo usuario con el token
        const nuevoUsuario = await usuarioRepository.crearUsuario({ nombre, correoElectronico, password, token });

        // Actualizar el usuario con el token generado
        await usuarioRepository.actualizarToken(nuevoUsuario.id, token);     

        res.status(201).json({ token });
    } catch (error) {
        if ((error as any).code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }
        res.status(500).json({ error: (error as Error).message });
    }
};