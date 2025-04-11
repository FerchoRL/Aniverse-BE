import { request, response } from "express";
import userModel from "../models/userModel.js";
import generateJWT from "../helpers/generateJWT.js";

const login = async (req = request, res = response) => {

    try {

        const email = req.body.email;
        const user = await userModel.findOne({ email })

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