import { request, response } from 'express'
import bcryptjs from 'bcryptjs';

import UserModel from '../models/userModel.js';

const getAllUsers = async (req = request, res = response) => {
    const users = await UserModel.find();
    res.status(200).json({
        users
    });
}

const getUserByID = async(req = request, res = response) => {
    //Who request the API
    const uidToken = req.uidFromToken;
    //User that I try to found
    const userID = req.params.id;
    try {
        const user = await UserModel.findById(userID);
        res.status(200).json({
            user
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado en get User by ID',
            userID
        })
        
    }
}

const addUser = async (req = request, res = response) => {

    //Obtengo el body del request
    const { userName, email, password, role } = req.body;
    //Creo una instancia de mi user schema y le paso los parametros obligatorios
    const user = new UserModel( {userName, email, password, role} );

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);

    //Guardar en BD

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
    getUserByID,
    addUser,
    updateUser,
    removeUser
}