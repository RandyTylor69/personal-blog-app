import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: String,
    overview: String,
    content: String,
    file: String, // link to the cover image's URL in Amazon's storage service.
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
}, {timestamps:true}) // access time of creation by post.createdAt

export const Post = mongoose.model("Post", PostSchema)