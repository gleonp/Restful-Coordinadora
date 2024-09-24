import { obtenerLugaresCercanos } from '../services/mapbox.service';

export class ObtenerLugaresCercanos {
    async execute(latitud: number, longitud: number, radio: number): Promise<any[]> {
        // Validaciones
        if (latitud < -90 || latitud > 90) {
            throw new Error('La latitud debe estar entre -90 y 90');
        }

        if (longitud < -180 || longitud > 180) {
            throw new Error('La longitud debe estar entre -180 y 180');
        }

        if (radio <= 0) {
            throw new Error('El radio debe ser mayor a cero');
        }

    return obtenerLugaresCercanos(latitud, longitud, radio);
}
}