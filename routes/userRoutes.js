import express from 'express';
import { check } from 'express-validator';
//Middlewares
import validateFields from '../middlewares/validate-fields.js';
import { JWTValidation } from '../middlewares/validate-jwt.js';
import { validateAdminRole, validateRole } from '../middlewares/roles-validation.js';
//Helpers
import { validExistedEmail, validRole } from '../helpers/db-validators.js';

import {
    addUser,
    getAllUsers,
    getUserByID,
    removeUser,
    updateUser
}
    from '../controllers/users.controller.js';

const router = express.Router();

//api/users

//Get users
router.get('/', [
    JWTValidation,
    validateAdminRole
    // validateRole('ADMIN_ROLE')
], getAllUsers)

//Get user by ID
router.get('/:id',[
    JWTValidation,
    validateRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'El id debe ser un ID de mongo').isMongoId(),
    validateFields
], getUserByID)

//Add new user
router.post('/', [
    //Implementacion del las validaciones con uso de middleware
    check('userName','El username es obligatorio').notEmpty(),
    check('email', 'El correo es obligatorio').notEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('password','El password es obligatorio').notEmpty(),
    check('password','El password debe tener mas de 4 caracteres').isLength({min: 5}),
    check('email').custom(validExistedEmail),
    validateFields
], addUser)

//Update user
router.put('/', updateUser)

//Remove user
router.delete('/', removeUser);



export default router;