import { Request, Response, NextFunction } from 'express';
import { verificarToken } from '../../application/services/auth.service';

export const autenticarUsuario = (req: Request, res: Response, next: NextFunction) => {
    // Obtener el token del encabezado Authorization
    const token = req.headers.authorization?.split(' ')[1];

    // Si no hay token, permitir el acceso a rutas públicas
    if (!token) {        
        console.log('No se proporcionó token. Permitiendo acceso a ruta pública.');
        return next(); 
    }

    // Verificar el token
    const decoded = verificarToken(token);
    if (!decoded) {
        return res.status(401).json({ error: 'Acceso no autorizado. Token inválido.' });
    }

    (req as any).usuario = decoded;

    next();
};