import express from 'express'
import cors from 'cors'


//Import Routes
import authRoutes from '../routes/authRoutes.js'
import userRoutes from '../routes/userRoutes.js';
import animeRoutes from '../routes/animeRoutes.js';
import dbConnection from '../database/dbConfig.js';

class Server {

    constructor() {
        //Inicializa express
        this.app = express();
        this.port = process.env.PORT;

        //Conexion a la BD
        this.DBConnection();

        this.middlewares();

        // Define las rutas principales del API REST
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';
        this.animesPath = '/api/animes';
        this.routes();
    }

    async DBConnection() {
        await dbConnection();
    }

    middlewares() {

        // Habilita CORS para todas las rutas y orígenes
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json());
    }

    routes() {
        //Rutas de autenticación
        this.app.use(this.authPath, authRoutes)
        //Rutas para usuarios
        this.app.use(this.usersPath, userRoutes)
        //Rutas para catalogo de animes
        this.app.use(this.animesPath, animeRoutes);
    }

    listenPort() {
        this.app.listen(this.port, () => {
            console.info("Server corriendo en puerto", this.port);
        })
    }


}

export default Server;