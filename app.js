// Carga las variables de entorno desde el archivo .env
import dotenv from 'dotenv';
import Server from './models/server.js';

// Inicializa la configuración de las variables de entorno
dotenv.config();
// Instancia del servidor con configuración de Express, conexión a DB y middlewares
const server = new Server();
// Inicia el servidor en el puerto configurado
server.listenPort();