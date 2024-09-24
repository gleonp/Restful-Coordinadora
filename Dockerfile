# Usar una imagen base de Node.js con la versión adecuada
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración del proyecto
COPY package*.json ./

# Instalar las dependencias de producción
RUN npm install --production

# Copiar el resto del código fuente de la aplicación
COPY . .

# Compilar el código TypeScript a JavaScript
RUN npm run build

# Exponer el puerto en el que la aplicación escuchará las solicitudes
EXPOSE 3000

# Comando para iniciar la aplicación en producción
CMD [ "npm", "run", "start" ]