import express, { json } from "express"
import cors from "cors"

const app = express() // automatically parses JSON string into an object
const PORT = 3001

app.use(cors())
app.use(express.json())

app.get('/test', (req,res)=>{
    res.json({"text":"yohohoho~"})
})

app.listen(PORT, ()=>console.log(`Server is running on http://localhost:${PORT}`))