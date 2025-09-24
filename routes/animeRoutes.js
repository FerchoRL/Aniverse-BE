import express from 'express';
import { check, query } from 'express-validator';
//Middlewares
import { JWTValidation } from '../middlewares/validate-jwt.js';
import validateFields from '../middlewares/validate-fields.js';

//APIs for anime
import {
    getAllAnimes,
    searchAnimes,
    getAnimeByID,
    createAnime,
    updateAnimeByID,
    deleteAnimeByID
}
    from "../controllers/animes.controller.js";

const router = express.Router();
//api/animes

//Get animes

router.get('/', [
    JWTValidation,
    query('offset', 'El offset debe ser un número positivo').optional().isInt({ min: 0 }),
    query('limit', 'El limit debe ser un número mayor a 1 y menor o igual a 50').optional().isInt({ min: 1, max: 50 }),
    validateFields
], getAllAnimes);

//GET /api/animes/search
router.get('/search',[
    JWTValidation,
    query('query', 'El query de busqueda no debe ser vacio').not().isEmpty(),
    validateFields
], searchAnimes);

//Get anime by ID
router.get('/:id', [
    JWTValidation,
    check('id', 'El id debe ser un ID de mongo').isMongoId(),
    validateFields
], getAnimeByID);

//POST /api/animes
router.post('/', [
    JWTValidation,
    check('title', 'El título es obligatorio').notEmpty(),
    check('type', 'El tipo es obligatorio y debe ser uno de los siguientes: serie, pelicula')
        .notEmpty()
        .isIn(['serie', 'pelicula']),
    check('description', 'La descripción es obligatoria y debe ser un texto')
        .notEmpty()
        .isString(),
    check('genre', 'El género es obligatorio y debe ser un arreglo de strings')
        .notEmpty()
        .isArray()
        .custom(arr => arr.length > 0).withMessage('El género no puede estar vacío'),
    check('releaseYear', 'El año de lanzamiento debe ser un número (Mayor a 1900)')
        .optional()
        .isInt({ min: 1900, max: new Date().getFullYear() }),
    //Episodes solo valido para series
    check('episodes', 'El número de episodios debe ser un número')
        .optional()
        .isInt({ min: 1 })
        .custom((value, {req}) => {
            if (value && req.body.type !== 'serie') {
                throw new Error('El número de episodios solo es válido para series');
            }
            return true;
        }),
    //Seasons solo valido para series
    check('seasons', 'El número de temporadas debe ser un número')
        .optional()
        .isInt({ min: 1 })
        .custom((value, {req}) => {
            if (value && req.body.type !== 'serie') {
                throw new Error('El número de temporadas solo es válido para series');
            }
            return true;
        }),
    //Duration solo valido para películas
    check('duration', 'La duración debe ser un número')
        .optional()
        .isInt({ min: 1 })
        .custom((value, {req}) => {
            if (value && req.body.type !== 'pelicula') {
                throw new Error('La duración solo es válida para películas');
            }
            return true;
        }),
    check('studio', 'El estudio debe ser un texto')
        .optional()
        .isString(),
    validateFields
], createAnime);

//Update anime by ID
router.put('/:id', [
    JWTValidation,
    check('id', 'El id debe ser un ID de mongo').isMongoId(),
    validateFields
], updateAnimeByID);

//Remove anime by ID
router.delete('/:id', [
    JWTValidation,
    check('id', 'El id debe ser un ID de mongo').isMongoId(),
    validateFields
], deleteAnimeByID);

export default router;