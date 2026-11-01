import express from "express"
import cors from "cors"
import { MongoClient } from 'mongodb';
import 'dotenv/config'



const PORT = 5001

const app = express()
app.use(cors())
app.use(express.json())

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})



const client = new MongoClient(process.env.MONGO_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

connectToMongoDB()


app.get("/", (req, res)=>{
    res.send("Hellow World!")
})