import { request, response } from 'express'
import UserModel from '../models/userModel.js';

const getAllUsers = (req = request, res = response) => {
    res.status(200).json({
        msg: "Todos los usuarios"
    });
}

const addUser = async (req = request, res = response) => {

    //Obtengo el body del request
    const body = req.body;
    //Creo una instancia de mi user schema y le paso el body como parametro
    const user = new UserModel( body );

    await user.save();

    res.status(200).json({
        msg: "User creado",
        user
    });
}

const updateUser = (req = request, res = response) => {
    res.status(200).json({
        msg: "Usuario actualizado"
    });
}

const removeUser = (req = request, res = response) => {
    res.status(200).json({
        msg: "Usuario eliminado"
    });
}

export {
    getAllUsers,
    addUser,
    updateUser,
    removeUser
}