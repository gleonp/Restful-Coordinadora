import app from './app';
import routes from './src/infrastructure/routes/routes';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000; 

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});