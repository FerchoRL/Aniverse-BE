import express from 'express';
import { check } from 'express-validator';
import validateFields from '../middlewares/validate-fields.js';
import { validExistedEmail, validRole } from '../helpers/db-validators.js';

import {
    addUser,
    getAllUsers,
    removeUser,
    updateUser
}
    from '../controllers/users.controller.js';

const router = express.Router();

//Get users
router.get('/getAllUsers', getAllUsers)


//Add new user
router.post('/', [
    //Implementacion del las validaciones con uso de middleware
    check('userName','El username es obligatorio').notEmpty(),
    check('email', 'El correo es obligatorio').notEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('password','El password es obligatorio').notEmpty(),
    check('password','El password debe tener mas de 4 caracteres').isLength({min: 5}),
    check('role','El rol es obligatorio').notEmpty(),
    check('role').custom( (role) => validRole(role) ),//Es lo mismo que abajo debido a que el parametro se llama igual
    // check('role').custom( validRole ),
    check('email').custom(validExistedEmail),

    validateFields
], addUser)

//Update user
router.put('/', updateUser)

//Remove user
router.delete('/', removeUser);



export default router;