import { Schema, model } from 'mongoose';

const AnimeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    genre: {
        type: [String],
        default: []
    },
    releaseYear: {
        type: Number,
        default: null
    },
    episodes: {
        type: Number,
        default: null // Solo aplica para series
    },
    seasons: {
        type: Number,
        default: null // Solo aplica para series
    },
    duration: {
        type: Number,
        default: null // Solo aplica para películas, en minutos
    },
    type: {
        type: String,
        enum: ['serie', 'pelicula'],
        required: true
    },
    studio: {
        type: String,
        default: ''
    },
    imageURL: {
        type: String,
        default: ''
    }
},
    {
        timestamps: true // ✅ así se activa correctamente createdAt y updatedAt
    }
);

export default model('Anime', AnimeSchema);