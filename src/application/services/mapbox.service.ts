import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import dotenv from 'dotenv';

dotenv.config();

const accessToken = process.env.MAPBOX_ACCESS_TOKEN;

if (!accessToken) {
    throw new Error('MAPBOX_ACCESS_TOKEN not found in environment variables');
}

const geocodingClient = mbxGeocoding({ accessToken });

export const obtenerLugaresCercanos = async (latitud: number, longitud: number, radio: number): Promise<any[]> => {
    try {
        const response = await geocodingClient
            .reverseGeocode({
                query: [longitud, latitud],
                limit: 30, // Limite de resultados
                types: ['poi'], // Buscar solo puntos de interés
            })
        .send();        
        // Filtrar los resultados por distancia (radio)
        const lugaresCercanos = response.body.features.filter(feature => {            
            const distancia = calcularDistancia(latitud, longitud, feature.center[1], feature.center[0]);             
            return distancia <= radio;
        });        
        return lugaresCercanos;
    } catch (error) {
        console.error('Error al obtener lugares cercanos:', error);
        throw new Error('Error al obtener lugares cercanos desde Mapbox');
    }    
};

// Función auxiliar para calcular la distancia entre dos puntos (en kilómetros)
function calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}

function toRad(value: number) {
  return (value * Math.PI) / 180;
}