import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    name: String,
    description: String,
    // populate the content field with actual post objects later:
    content: [{type: mongoose.Schema.Types.ObjectId, ref:"Post"}] 
}, {timestamps:true})

// exporting a model using the User schema
export const List =  new mongoose.model('List', ListSchema)

