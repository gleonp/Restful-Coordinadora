import { Request, Response } from 'express';
import { ObtenerLugaresCercanos } from '../../application/usecases/obtener-lugares-cercanos.usecase';

const obtenerLugaresCercanos = new ObtenerLugaresCercanos();

export const obtenerLugaresCercanosHandler = async (req: Request, res: Response) => {
    try {
        const { latitud, longitud, radio } = req.query;

        const lugares = await obtenerLugaresCercanos.execute(
            parseFloat(latitud as string), 
            parseFloat(longitud as string), 
            parseInt(radio as string)
        );

        res.json(lugares);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};