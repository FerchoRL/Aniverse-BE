// getting-started.js
import mongoose from 'mongoose';

const dbConnection = async() => {
    try {

        await mongoose.connect(process.env.MONGODB_CNN, {})
        console.info("BD Online")

    } catch (error) {
        console.error(error);
        throw new Error("Error al iniciar la DB")
    }
}

export default dbConnection;