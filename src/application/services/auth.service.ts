import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'clave_secreta2';

export const generarToken = (payload: any) => {
    return jwt.sign(payload, SECRET_KEY,);
};

export const verificarToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (error) {
        return null; 
    }
};