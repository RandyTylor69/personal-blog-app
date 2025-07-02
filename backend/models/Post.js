import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: String,
    overview: String,
    content: String,
    file: String // this will be the cover image
})

export const Post = mongoose.model("Post", PostSchema)