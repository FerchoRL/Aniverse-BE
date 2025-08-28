import { request, response } from "express";
import animeModel from "../models/animeModel.js";

const getAllAnimes = async (req = request, res = response) => {
    const animes = await animeModel.find();
    res.status(200).json({
        animes
    });
}

const getAnimeByID = (req = request, res = response) => {
    res.status(200).json({
        msg: "Anime encontrado"
    });
}

const createAnime = async (req = request, res = response) => {
    
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

    try {
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

        res.status(201).json({
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
    getAnimeByID,
    createAnime,
    updateAnimeByID,
    deleteAnimeByID
}