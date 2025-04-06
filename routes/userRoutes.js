import express from 'express';
import { check } from 'express-validator';

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
    check('email','El correo no es valido').isEmail(),
    
], addUser)

//Update user
router.put('/', updateUser)

//Remove user
router.delete('/', removeUser)



export default router;