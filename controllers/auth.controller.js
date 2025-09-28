import { request, response } from "express";
import userModel from "../models/userModel.js";
import generateJWT from "../helpers/generateJWT.js";
import bcrypt from 'bcryptjs';

//Login user
const login = async (req = request, res = response) => {

    try {

        const {email,password} = req.body;
        const user = await userModel.findOne({ email })

        //Validate email exist
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos'
            })
        }

        //Validate and compare password
        const validatePassword = bcrypt.compareSync(password, user.password);

        if (!validatePassword) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos'
            })
        }

        //Validate user is active. Verificar que no fue borrado


        //Generate JWT
        const token = await generateJWT(user.id)


        res.json({
            user,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export {
    login
}