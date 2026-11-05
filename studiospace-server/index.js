import express from "express"
import cors from "cors"
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config'

const PORT = process.env.PORT || 5001

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Initialize MongoDB client safely
const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
let client;
let db;
let studiosCollections;

try {
  if (uri) {
    client = new MongoClient(uri);
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    db = client.db("studio-space");
    studiosCollections = db.collection("studios");
  } else {
    console.error("MONGO_URI is missing in .env file");
  }
} catch (err) {
  console.error("MongoDB Initial Connection Warning:", err.message);
}

// Health check endpoint
app.get("/", (req, res)=>{
  res.send({ status: "ok", message: "StudioSpace Server is running!", port: PORT })
})

// Helper to ensure MongoDB collection is available
async function getCollection() {
  if (studiosCollections) return studiosCollections;
  if (!client && uri) client = new MongoClient(uri);
  if (client) {
    await client.connect();
    db = client.db("studio-space");
    studiosCollections = db.collection("studios");
    return studiosCollections;
  }
  throw new Error("MongoDB client could not be initialized. Check MONGO_URI.");
}

// creating feature studios (POST)
// http://localhost:5001/add-studio
app.post('/add-studio', async (req, res)=>{
  try {
    const col = await getCollection();
    const studiosData = req.body;
    const img = studiosData.image || studiosData.imageUrl || studiosData.photo || "";
    const payload = {
      ...studiosData,
      image: img,
      imageUrl: img,
    };
    const result = await col.insertOne(payload);
    res.send(result);
  } catch (error) {
    console.error("Error in /add-studio:", error);
    res.status(500).send({ error: error.message });
  }
})

// creating feature studios api endpoint:
app.get('/featured-studios', async (req, res) => {
  try {
    const col = await getCollection();
    const result = await col.find().limit(6).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/studios', async (req, res)=>{
  try {
    const col = await getCollection();
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    let cursor = col.find();
    if (limit > 0) cursor = cursor.limit(limit);
    const result = await cursor.toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
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

    const col = await getCollection();
    // 2. Fetch document from MongoDB
    const result = await col.findOne({ _id: new ObjectId(id) });

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
    const col = await getCollection();
    const { email } = req.params;
    const query = { ownerEmail: email };
    const result = await col.find(query).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// 2. Delete a Studio listing
// http://localhost:5001/studios/:id
app.delete('/studios/:id', async (req, res) => {
  try {
    const col = await getCollection();
    const { id } = req.params;
    // Validate MongoDB ObjectId format
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid studio ID format' });
    }
    const query = { _id: new ObjectId(id) };
    const result = await col.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start Express server
app.listen(PORT, () => {
  console.log(`StudioSpace backend server is running on http://localhost:${PORT}`);
});