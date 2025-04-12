import express from 'express'
import { check } from 'express-validator';
import validateFields from '../middlewares/validate-fields.js';
import { login } from '../controllers/auth.controller.js';

const router = express.Router();

//Login
router.post('/', [
    check('email', 'El email es obligatorio').notEmpty(),
    check('email', 'Escriba un email correcto').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    check('password', 'La contraseña debe tener minimo 5 caracteres').isLength({min:5}),
    validateFields
], login)


export default router;