import express from 'express';
import { check, query } from 'express-validator';
//Middlewares
import validateFields from '../middlewares/validate-fields.js';
import { JWTValidation } from '../middlewares/validate-jwt.js';
//APIs for user collection
import {
    addAnimeToCollection,
    removeAnimeFromCollection
} from '../controllers/userCollection.controller.js';

const router = express.Router();

// routes for user collections
//POST /api/user-collection
router.post('/', [
    JWTValidation,
    check('animeId', 'Anime ID is required').not().isEmpty(),
    check('animeId', 'El id debe ser un ID de mongo').isMongoId(),
    validateFields
], addAnimeToCollection);

//DELETE /api/user-collection/:animeId

router.delete('/:animeId', [
    JWTValidation,
    check('animeId', 'Anime ID is required').not().isEmpty(),
    check('animeId', 'El id debe ser un ID de mongo').isMongoId(),
    validateFields
], removeAnimeFromCollection);

export default router;