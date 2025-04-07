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

export default model('Users', UserSchema)