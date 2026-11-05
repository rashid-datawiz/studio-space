import express from "express"
import cors from "cors"
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config'



const PORT = 5001

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

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

const connectClient = await connectToMongoDB() // connecting to mongodb
const db = connectClient.db("studio-space") // name of the database 

const studiosCollections = db.collection("studios") // created studio 'collection',  in relational database it called tables

app.get("/", (req, res)=>{
    res.send("Hellow World!")
})

// creating feature studios (POST)
// Data will be send from frontend, received in the bacend and we will insert it in backend
// http://localhost:5001/add-studio
app.post('/add-studio', async (req, res)=>{
  //step-1:  Retrive the data from the request body:
  const studiosData = req.body

  // Step-2: insert the data into mongodb collection
  const result = await studiosCollections.insertOne(studiosData)
  // step-3: send a response back to client
  res.send(result)

})

// creating feature studions api endpoint:

app.get('/studios', async (req, res)=>{
  // to get the results:
  const result = await studiosCollections.find().toArray() // getting all the result
  res.send(result)

})

// Getting single Studio using ID:

// http://localhost:5001/studios/:id
app.get('/studios/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Guard against invalid 24-hex string crashes
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid studio ID format' });
    }

    // 2. Fetch document from MongoDB
    const result = await studiosCollections.findOne({ _id: new ObjectId(id) });

    // 3. Return 404 if document doesn't exist
    if (!result) {
      return res.status(404).send({ error: 'Studio not found' });
    }

    // 4. Send document back to client
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// 1. Get Listings for a specific user (My Listings)
// http://localhost:5001/my-listings/:email
app.get('/my-listings/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const query = { ownerEmail: email };
    const result = await studiosCollections.find(query).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
// 2. Delete a Studio listing
// http://localhost:5001/studios/:id
app.delete('/studios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Validate MongoDB ObjectId format
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid studio ID format' });
    }
    const query = { _id: new ObjectId(id) };
    const result = await studiosCollections.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});