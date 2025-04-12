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

export {
    validRole,
    validExistedEmail
}