import express from 'express';
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
router.post('/', addUser)

//Update user
router.put('/', updateUser)

//Remove user
router.delete('/', removeUser)



export default router;