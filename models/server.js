import express from 'express'
import cors from 'cors'


//Import Routes
// import userRoutes from '../routes/userRoutes.js';
import dbConnection from '../database/dbConfig.js';

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //DB Connection
        this.DBConnection();

        //this.routes();
    }

    async DBConnection() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json());
    }

    routes() {
        //this.app.use('/api/users', userRoutes)
    }

    listenPort() {
        this.app.listen(this.port, () => {
            console.info("Server corriendo en puerto", this.port);
        })
    }


}

export default Server;