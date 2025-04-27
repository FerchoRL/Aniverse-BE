import { Schema, model} from "mongoose";

const UserSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        enum: ['USER_ROLE','ADMIN_ROLE'],
        default: 'USER_ROLE'
    },
    userOrigin:{
        type: Date,
        default: Date.now
    },
    state:{
        type: Boolean,
        default: true
    }


});

// Personaliza la respuesta JSON del usuario ocultando campos sensibles como __v y password y los guardo en usuario
UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user} = this.toObject();
    // const uid = _id
    user.uid = _id;
    return user;
}

export default model('Users', UserSchema)