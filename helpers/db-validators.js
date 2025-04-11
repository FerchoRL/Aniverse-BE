import { request } from 'express';
import roleModel from '../models/roleModel.js';
import UserModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const validRole = async (role/**Este 'role' es del request */) => {
    const existRole = await roleModel.findOne({ role });//'Role' es de mi modelo
    if (!existRole) {
        throw new Error(`El role ${role} no esta registrado en BD`);
    }
}

const validExistedEmail = async (email) => {
    const existedEmail = await UserModel.findOne({ email });
    //Si existe regreso status 400
    if (existedEmail) {
            throw new Error('El correo ya está registrado')
    }
}

const validEmailLoginNotExist = async (email) => {
    const existedEmail = await UserModel.findOne({ email });
    //Si existe regreso status 400
    if (!existedEmail) {
            throw new Error('Usuario / Contraseña no son correctos')
    }
}

const comparePassword = async (password, req = request) => {
    const email = req.body.email;
    const user = await UserModel.findOne({ email })
    const validatePassword = bcrypt.compareSync(password, user.password);
    if(!validatePassword){
        throw new Error("Usuario / Contraseña no son correctos - Password");
        
    }
}



export {
    validRole,
    validExistedEmail,
    validEmailLoginNotExist,
    comparePassword
}