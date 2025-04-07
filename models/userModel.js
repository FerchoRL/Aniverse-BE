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
    }


});

// Personaliza la respuesta JSON del usuario ocultando campos sensibles como __v y password y los guardo en usuario
UserSchema.methods.toJSON = function(){
    const { __v, password, ...user} = this.toObject();
    return user;
}

export default model('Users', UserSchema)