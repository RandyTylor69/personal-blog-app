import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import { User } from "./models/User.js";
import { Post } from "./models/Post.js";
import { Comment } from "./models/Comment.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

config()

const app = express(); // automatically parses JSON string into an object
const PORT = process.env.PORT 
const SECRET_KEY = process.env.SECRET_KEY
const uploadMiddleware = multer({ dest: "uploads/" });

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000","https://personal-blog-app-tau.vercel.app/"]
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads")); // serve files inside this folder when it's visited

const mongoURI = process.env.MONGODB_URI
mongoose.connect(mongoURI);

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await User.create({ username, password });
    res.json(userDoc);
  } catch (err) {
    if (err.errorResponse.errmsg.includes("duplicate")) {
      res
        .status(400)
        .json({ error: "user already exists! try log in instead" });
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // trying to find the matching user
    const userDoc = await User.findOne({ username });
    if (password !== userDoc.password) {
      res.status(400).json({ error: "wrong password~ please try again~" });
    } else if (!userDoc) {
      res.status(400).json({ error: "user does not exist~" });
    } else {
      // if logged in
      const token = jwt.sign(
        { username: username, id: userDoc._id },
        SECRET_KEY
      );
      res
        .cookie("token", token)
        .json({ message: "successful log in!", username: userDoc.username });
    }
  } catch (err) {
    console.log(err.errorResponse.errmsg);
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, SECRET_KEY, (err, userInfo) => {
    if (err) {
      res.status(400);
      return;
    }
    // if valid token
    res.json(userInfo);
  });
});

app.post("/logout", async (req, res) => {
  res.cookie("token", "").json({ message: "successful log out!" });
});

app.post("/create", uploadMiddleware.single("file"), async (req, res) => {
  try {
    // we have to extract the form data into 3 parts:
    // image file, user id, and everything else.

    // 1. image file
    const filePath = req.file.path;
    // 2. user id
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, SECRET_KEY)
    const userId = decodedToken.id
    // 3. everything else
    const { title, overview, content } = req.body;

    const postDoc = await Post.create({
      title,
      overview,
      content,
      file: filePath,
      author: userId
    });

    res.status(201).json({ message: "Post created!", postDoc});
  } catch (err) {
    res.status(500).json({ 
      message: "Error occured while creating your post",
      error:err.message
    });
  }
});

app.get("/create", async (req, res) => {
  // grabbing all the posts from database
  const posts = await Post.find();
  res.json(posts);
});

// display individual post

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("author", "username");
  const comments = await Comment.find({post: new mongoose.Types.ObjectId(id)}).populate("author", "username")
  const postPackage = {post, comments}
  res.json(postPackage);
});

// access comments databse
app.post("/comments", uploadMiddleware.none(), async(req, res)=>{
  // extracts 3 parts of the request body: 
  // user id, post id, content
  try{
     //  1. user id
  const token = req.cookies.token;
  const decodedToken = jwt.verify(token, SECRET_KEY)
  const userId = decodedToken.id

  // 2. post id + content
  const {content, postId} = req.body

  // creating the comment document

  const commentDoc = Comment.create({
    content: content,
    author: userId,
    post : postId
  })

  res.status(200).json({message: "Your comment is now live!", commentDoc})

  } catch (err) {
    res.status(401).json({message: err.message})
  }
 
})

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

