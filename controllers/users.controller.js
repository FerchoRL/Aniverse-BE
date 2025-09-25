import { request, response } from 'express'
import bcryptjs from 'bcryptjs';

import UserModel from '../models/userModel.js';
import UserCollectionModel from '../models/UserCollectionModel.js';

const getAllUsers = async (req = request, res = response) => {
    try {

        //Parametros de paginacion
        const { offset = 0, limit = 25 } = req.query;

        // Convertir offset y limit a números enteros
        const offsetNum = Number(offset);
        const limitNum = Math.min(Number(limit), 100); // Limitar el máximo a 100

        // Agregamos total de animes a cada usuario usando aggregate
        const users = await UserModel.aggregate([
            {
                $lookup: {
                    from: 'usercollections', // Nombre de la colección en MongoDB
                    localField: '_id', //Campo local en Users
                    foreignField: 'user',//Campo en UserCollections que referencia a Users
                    as: 'collection' //Nombre del array resultante
                }
            },
            // Calcular el total de animes en la colección
            {
                $addFields: {
                    totalAnimes: { $size: { $ifNull: ["$collection.animes", []] } }
                }
            },
            // Seleccionar y renombrar campos
            {
                $project: {
                    uid: "$_id",
                    userName: 1,
                    email: 1,
                    role: 1,
                    userOrigin: 1,
                    state: 1,
                    totalAnimes: 1
                }
            },
            { $skip: offsetNum },
            { $limit: limitNum }
        ]);

        res.status(200).json({
            ok: true,
            users
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en get All Users'
        });
    }
}

const getUserByID = async (req = request, res = response) => {

    try {

        //Who request the API
        const uidToken = req.uidFromToken;
        //User that I try to found
        const userID = req.params.id;
        const user = await UserModel.findById(userID);

        //Validate if user not exist
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: `Usuario no encontrado con ID: ${userID}`
            })
        }

        //Get user Anime Collection
        const userAnimeCollection = await UserCollectionModel.findOne({ user: userID });

        //Count total animes in user collection
        const TotalAnimes = userAnimeCollection ? userAnimeCollection.animes.length : 0;

        const { role, id } = req.userFromToken;
        //If user is ADMIN_ROLE return all user info
        if (role === "ADMIN_ROLE") {
            return res.status(200).json({
                user,
                TotalAnimes
            });
        }

        //// If the requester is a USER_ROLE, only allow fetching their own profile with limited info
        if (role === "USER_ROLE" && id === userID) {
            const { userName, email, img } = user.toObject();

            return res.status(200).json({
                user: {
                    userName,
                    email,
                    img: img || null,
                    TotalAnimes
                }
            })
        }
        else {
            return res.status(403).json({
                ok: false,
                msg: 'Usuario no autorizado para ver este perfil'
            })
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en get User by ID',
            userID
        })

    }
}

const addUser = async (req = request, res = response) => {

    try {

        //Obtengo el body del request
        const { userName, email, password } = req.body;
        //Creo una instancia de mi user schema y le paso los parametros obligatorios
        //El rol se asigna por defecto en el schema
        const user = new UserModel({ userName, email, password });

        //Encriptar password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        //Guardar en BD

        await user.save();

        return res.status(200).json({
            msg: "User creado",
            user
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            msg: 'Error inesperado al crear usuario',
            err
        });
    }
}

//Create staff user

const addStaffUser = async (req = request, res = response) => {

    try {

        //Obtengo el body del request
        const { userName, email, password, role } = req.body;
        //Creo una instancia de mi user schema y le paso los parametros obligatorios
        const user = new UserModel({ userName, email, password, role });

        //Encriptar password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        //Guardar en BD

        await user.save();

        return res.status(201).json({
            msg: `Usuario de tipo ${role} creado`,
            user
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            msg: 'Error al crear usuario de staff'
        });
    }
}

const updateUser = (req = request, res = response) => {
    res.status(200).json({
        msg: "Usuario actualizado"
    });
}

const removeUser = (req = request, res = response) => {
    res.status(200).json({
        msg: "Usuario eliminado"
    });
}

export {
    getAllUsers,
    getUserByID,
    addUser,
    addStaffUser,
    updateUser,
    removeUser
}