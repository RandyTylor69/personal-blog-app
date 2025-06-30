import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type:String, required: true, unique:true},
    password: {type:String, required: true, unique:true}

})

// exporting a model using the User schema
export const User = new mongoose.model('User', UserSchema)

