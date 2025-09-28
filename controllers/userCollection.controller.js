import { request, response } from "express";
import UserCollectionModel from "../models/UserCollectionModel.js";
import animeModel from "../models/animeModel.js";

// Add an anime to the user's collection
const addAnimeToCollection = async (req = request, res = response) => {
    try {

        const userId = req.userFromToken.id;
        const { animeId } = req.body;

        // Verificar si el anime existe
        const anime = await animeModel.findById(animeId);

        if (!anime) {
            return res.status(404).json({
                msg: "Anime no encontrado"
            });
        }

        // verificar si el usuario ya tiene su coleccion creada
        let userCollection = await UserCollectionModel.findOne({ user: userId });
        if (!userCollection) {
            // Si no existe, crear una nueva coleccion para el usuario
            userCollection = new UserCollectionModel({ user: userId, animes: [] });
        }

        // Verificar si el anime ya está en la colección del usuario
        const animeExists = userCollection.animes.some(anime => anime.toString() === animeId);
        if (animeExists) {
            return res.status(400).json({
                msg: "El anime ya está en la colección del usuario"
            });
        }

        // Agregar el anime a la colección del usuario
        userCollection.animes.push(animeId);
        await userCollection.save();

        return res.json({
            ok: true,
            msg: 'Anime agregado a la colección',
            anime
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Error del servidor"
        });
    }
}


// Remove an anime from the user's collection
const removeAnimeFromCollection = async (req = request, res = response) => {
    try {
        const { animeId } = req.params;
        const userId = req.userFromToken.id;

        // Verificar si el usuario tiene una colección
        const userCollection = await UserCollectionModel.findOne({ user: userId });
        if (!userCollection) {
            return res.status(404).json({
                msg: "El usuario no tiene una colección"
            });
        }
        // Verificar si el anime está en la colección del usuario
        const animeIndex = userCollection.animes.findIndex(anime => anime.toString() === animeId);
        if (animeIndex === -1) {
            return res.status(404).json({
                msg: "El anime no está en la colección del usuario"
            });
        }
        // Remover el anime de la colección del usuario
        userCollection.animes.splice(animeIndex, 1);
        await userCollection.save();

        return res.json({
            ok: true,
            msg: 'Anime removido de la colección'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "Error eliminando anime de colección"
        });
    }
}

export {
    addAnimeToCollection,
    removeAnimeFromCollection
};