import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    content: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    post: {type: mongoose.Schema.Types.ObjectId, ref: "Post"}
})

export const Comment = new mongoose.model("Comment", CommentSchema)