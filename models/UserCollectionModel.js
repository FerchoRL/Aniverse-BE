import { Schema, model }from 'mongoose';

const UserCollectionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    animes: [{
        type: Schema.Types.ObjectId,
        ref: 'Animes',
        required: true
    }],
    addedAt: {
        type: Date,
        default: Date.now
    }
});

export default model('UserCollection', UserCollectionSchema);