import express from 'express'
import cors from 'cors'


//Import Routes
import userRoutes from '../routes/userRoutes.js';
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
        //Rutas para usuarios
        this.app.use('/api/users', userRoutes)

        //Rutas para catalogo de animes
    }

    listenPort() {
        this.app.listen(this.port, () => {
            console.info("Server corriendo en puerto", this.port);
        })
    }


}

export default Server;