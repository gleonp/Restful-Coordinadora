import { Request, Response } from 'express';
import { ObtenerTokenPorCorreoElectronico } from '../../application/usecases/obtener-token-por-correo-electronico.usecase';
import { UsuarioRepositoryImpl } from '../database/repositories/usuario-repository-impl';

const usuarioRepository = new UsuarioRepositoryImpl();
const obtenerTokenPorCorreoElectronico = new ObtenerTokenPorCorreoElectronico(usuarioRepository);

export const consultarTokenHandler = async (req: Request, res: Response) => {
    try {
        const { correoElectronico } = req.query; 

        const token = await obtenerTokenPorCorreoElectronico.execute(correoElectronico as string);
        if (!token) {
            res.status(404).json({ error: 'Token no encontrado para el correo electrónico proporcionado' });
        } else {
            res.json({ token });
        }
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};