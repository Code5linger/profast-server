// ─── Module Imports ────────────────────────────────────────────────
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');

// ─── Environment Configuration ─────────────────────────────────────
dotenv.config();

const { DB_USER, DB_PASSWORD, PORT } = process.env;

if (!DB_USER || !DB_PASSWORD) {
  console.error('❌ Missing DB_USER or DB_PASSWORD in .env');
  process.exit(1);
}

// ─── App Initialization ────────────────────────────────────────────
const app = express();
const port = process.env.PORT || 3000;

// ---- Middleware ----------------------------------------------------
app.use(cors());
app.use(express.json());

// ---- MongoDB -------------------------------------------------------
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mhtwx9f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Global DB instance
let db;

async function connectToMongo() {
  try {
    await client.connect();
    db = client.db('parcelDB');
    const parcelCollection = db.collection('parcels');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
}

// ─── Route Handlers ────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/parcels', async (req, res) => {
  try {
    const result = await db.command({ ping: 1 });
    res.json({ mongo: 'connected', result });
  } catch (err) {
    res.status(500).json({ mongo: 'error', error: err.message });
  }
});

// POST: Create a new parcel
app.post('/parcels', async (req, res) => {
  try {
    const newParcel = req.body;

    const result = await parcelCollection.insertOne(newParcel);
    res.status(201).send(result);
  } catch (error) {
    console.error('Error inserting parcel:', error);
    res.status(500).send({ message: 'Failed to create parcel!' });
  }
});

// ---- Start Server ------------------------------------------------
connectToMongo().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});
