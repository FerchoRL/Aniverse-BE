import { request, response } from 'express'
import UserModel from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { validationResult } from 'express-validator';

const getAllUsers = (req = request, res = response) => {
    res.status(200).json({
        msg: "Todos los usuarios"
    });
}

const addUser = async (req = request, res = response) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    //Obtengo el body del request
    const { userName, email, password, role } = req.body;
    //Creo una instancia de mi user schema y le paso los parametros obligatorios
    const user = new UserModel( {userName, email, password, role} );

    //Validaciones
    //Correo existe
    const existedEmail = await UserModel.findOne({email});
    //Si existe regreso status 400
    if (existedEmail) {
        return res.status(400).json({
            msg: 'El correo ya esta registrado'
        })
    }

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
    addUser,
    updateUser,
    removeUser
}