import { request, response } from "express";
import pkg from 'jsonwebtoken';
import userModel from "../models/userModel.js";

//Validar que el usuario que hace la peticion tenga un JWT existente
const JWTValidation = async(req = request, res = response, next) => {
    //Read token from headers
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok:false,
            msg: 'No existe un token'
        });
    }
    try {
        //Verify x-token
        const { uid } = pkg.verify(token, process.env.SECRET_KEY)
        
        //Validar que el uid pertenezca a un usuario
        const user = await userModel.findById (uid);
        if (!user) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            })
        }
        //Validar que el usuario este activo
        if (!user.state) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado inactivo'
            })
        }
        //Save the user that request the api in our request
        req.userFromToken = user;
        next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Token invalido'
        })
    }
}



export {
    JWTValidation
}