import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { User } from "./models/User.js";

const app = express(); // automatically parses JSON string into an object
const PORT = 3001;
app.use(cors());
app.use(express.json());

const mongoURI =
  "mongodb+srv://depayss:VNrrPo7BIS6briOX@blogdb.i5fkr5d.mongodb.net/?retryWrites=true&w=majority&appName=blogDB";
mongoose.connect(mongoURI);

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await User.create({ username, password });
    console.log(userDoc)
  } catch (err) {
    console.log(err.errorResponse.errmsg)
    if (err.errorResponse.errmsg.includes("duplicate")) {
        res.status(400).json({error:"user already exists! try log in instead"})
    }
    
  }
});

app.get("/login", async(req,res)=>{
    try{
        
    } catch(err){
        console.log("oops!",err)
        res.json({erro:err.message})
    }
})

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

// mongoDB info
// pw: VNrrPo7BIS6briOX
// un: depayss
// connection string: mongodb+srv://depayss:VNrrPo7BIS6briOX@blogdb.i5fkr5d.mongodb.net/?retryWrites=true&w=majority&appName=blogDB
