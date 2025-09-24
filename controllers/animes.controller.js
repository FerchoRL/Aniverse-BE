import { request, response } from "express";
import AnimeModel from "../models/animeModel.js";

const getAllAnimes = async (req = request, res = response) => {

    try {

        // offset = numero de elementos que ya tiene el frontend
        const offset = Number(req.query.offset) || 0;
        const limit = Math.min(Number(req.query.limit) || 20, 50); //Por defecto 20 animes por request, max 50

        //Traemos los animes de la base de datos
        const [animes, total] = await Promise.all([
            AnimeModel.find({}, "imageURL title description type studio")
                .sort({ title: 1, createdAt: -1 })//Ordenar por título de forma ascendente y luego por creación
                .skip(offset)
                .limit(limit),
            AnimeModel.countDocuments()
        ]);

        return res.json({
            total,// Total de animes en la base de datos
            count: animes.length,// Total de animes devueltos en la respuesta
            data: animes,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al obtener animes"
        });
    }
}

const searchAnimes = async (req = request, res = response) => {

    try {
        const { query = '', offset = 0, limit = 20 } = req.query;
        const filter = {};

        const regex = new RegExp(query, 'i'); // 'i' para búsqueda case-insensitive
        filter.$or = [
            { title: regex },
            { type: regex },
            { studio: regex },
            { genre: regex } // MongoDB puede buscar en arrays directamente con regex
        ];

        const animes = await AnimeModel.find(filter, "imageURL title description type studio genre")
            .sort({ title: 1, createdAt: -1 }) // Ordenar por título de forma ascendente y luego por creación
            .skip(Number(offset))
            .limit(Number(limit)); // Limitar a un máximo de 50 resultados

        const total = await AnimeModel.countDocuments(filter);

        return res.json({
            total, // Total de animes que coinciden con la búsqueda
            count: animes.length, // Total de animes devueltos en la respuesta
            data: animes,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al buscar animes"
        });
    }
}

const getAnimeByID = (req = request, res = response) => {
    res.status(200).json({
        msg: "Anime encontrado"
    });
}

const createAnime = async (req = request, res = response) => {



    try {

        //Obtengo el body del request
        const {
            title,
            description,
            genre,
            releaseYear,
            episodes,
            seasons,
            duration,
            type,
            studio,
            imageURL
        } = req.body;

        // Validar title no existe
        const existingAnime = await animeModel.findOne({ title });
        if (existingAnime) {
            return res.status(400).json({
                msg: "El anime ya existe"
            });
        }

        //Creo una instancia de mi anime schema y le paso los parametros obligatorios
        const anime = new animeModel({
            title,
            description,
            genre,
            releaseYear,
            episodes,
            seasons,
            duration,
            type,
            studio,
            imageURL
        });

        //Guardo el anime en la base de datos
        await anime.save();

        return res.status(201).json({
            msg: "Anime creado",
            anime
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al crear anime"
        });
    }
}

const updateAnimeByID = (req = request, res = response) => {
    res.status(200).json({
        msg: "Anime actualizado"
    });
}

const deleteAnimeByID = (req = request, res = response) => {
    res.status(200).json({
        msg: "Anime eliminado"
    });
}

export {
    getAllAnimes,
    searchAnimes,
    getAnimeByID,
    createAnime,
    updateAnimeByID,
    deleteAnimeByID
}