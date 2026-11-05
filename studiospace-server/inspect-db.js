import { MongoClient } from "mongodb";
import "dotenv/config";

const uri = process.env.MONGO_URI || "mongodb://studio-space:3soj1rzDFFKuoyfn@ac-3i3jksf-shard-00-00.creqbdq.mongodb.net:27017,ac-3i3jksf-shard-00-01.creqbdq.mongodb.net:27017,ac-3i3jksf-shard-00-02.creqbdq.mongodb.net:27017/?ssl=true&replicaSet=atlas-lxxkmn-shard-0&authSource=admin";
const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db("studio-space");
  const docs = await db.collection("studios").find().limit(15).toArray();
  console.log("TOTAL_DOCS_FOUND:", docs.length);
  docs.forEach((d, i) => {
    console.log(`--- DOC ${i} ---`);
    console.log("Keys:", Object.keys(d));
    console.log("title:", d.title || d.name);
    console.log("image:", typeof d.image, d.image ? (String(d.image).length > 60 ? String(d.image).slice(0, 60) + "..." : d.image) : "NONE");
    console.log("imageUrl:", typeof d.imageUrl, d.imageUrl ? (String(d.imageUrl).length > 60 ? String(d.imageUrl).slice(0, 60) + "..." : d.imageUrl) : "NONE");
    console.log("img:", typeof d.img, d.img ? (String(d.img).length > 60 ? String(d.img).slice(0, 60) + "..." : d.img) : "NONE");
    console.log("images:", Array.isArray(d.images) ? d.images.slice(0, 2) : typeof d.images);
    console.log("gallery:", Array.isArray(d.gallery) ? d.gallery.slice(0, 2) : typeof d.gallery);
  });
  await client.close();
} catch (e) {
  console.error("INSPECT_ERROR:", e.message);
}
