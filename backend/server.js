import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import { User } from "./models/User.js";
import { Post } from "./models/Post.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express(); // automatically parses JSON string into an object
const PORT = 3001;
const SECRET_KEY = "abdaeb12asdbaoqwubeqi123"; // I made this up
const uploadMiddleware = multer({dest:"uploads/"})

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads")) // serve files inside this folder when it's visited

const mongoURI =
  "mongodb+srv://depayss:VNrrPo7BIS6briOX@blogdb.i5fkr5d.mongodb.net/?retryWrites=true&w=majority&appName=blogDB";
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
    const userDoc = await User.findOne({username});
    if (password!== userDoc.password) {
      res
        .status(400)
        .json({ error: "wrong password~ please try again~" });
    } else if (!userDoc) {
      res.status(400).json({error: "user does not exist~"})
    } else {
      // if logged in
      const token = jwt.sign(
        { username: username, id: userDoc._id },
        SECRET_KEY
      );
      res.cookie("token", token).json({ message: "successful log in!" , username:userDoc.username});
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

app.post("/create", uploadMiddleware.single("file"),async (req,res)=>{
  try{
    const {title, overview, content} = req.body
    const filePath = req.file.path
    const postDoc = await Post.create({title, overview, content, file:filePath})
    res.status(201).json({message: "Post created!", postDoc})
  } catch (err) {
    res.status(500).json({message: "Error creating post"})
  }
})

app.get("/create", async (req, res)=>{
  // grabbing all the posts from database
  const posts = await Post.find()
  res.json(posts)
})
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

// mongoDB info
// pw: VNrrPo7BIS6briOX
// un: depayss
// connection string: mongodb+srv://depayss:VNrrPo7BIS6briOX@blogdb.i5fkr5d.mongodb.net/?retryWrites=true&w=majority&appName=blogDB
