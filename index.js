// ─── Module Imports ────────────────────────────────────────────────
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// ─── Environment Configuration ─────────────────────────────────────
dotenv.config();

// ─── App Initialization ────────────────────────────────────────────
const app = express();
const port = process.env.PORT || 3000;

// ---- Middleware ----------------------------------------------------
app.use(cors());
app.use(express.json());

// ─── Route Handlers ────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ---- DEMO Data ⏬ --------------------------------------------------
const games = [
  {
    id: 1,
    game_name: 'Black Myth: Wukong',
    sold: 20000000,
  },
  {
    id: 2,
    game_name: 'Helldivers 2',
    sold: 15000000,
  },
  {
    id: 3,
    game_name: 'Call of Duty: Black Ops 6',
    sold: 10000000,
  },
  {
    id: 4,
    game_name: 'EA Sports College Football 25',
    sold: 5000000,
  },
  {
    id: 5,
    game_name: 'Dragon Ball: Sparking! Zero',
    sold: 4500000,
  },
  {
    id: 6,
    game_name: 'Street Fighter 6',
    sold: 4400000,
  },
  {
    id: 7,
    game_name: 'Astro Bot (2024)',
    sold: 1500000,
  },
  {
    id: 8,
    game_name: 'NBA2K25',
    sold: 1200000,
  },
  {
    id: 9,
    game_name: 'Madden NFL 25',
    sold: 1100000,
  },
  {
    id: 10,
    game_name: 'Call of Duty: Modern Warfare III',
    sold: 1000000,
  },
];

app.get('/games', (req, res) => {
  res.send(games);
});
// ---- DEMO DATA ⬆️⬆️ -----------------------------------------------

// ---- Start Server ------------------------------------------------
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// ---- MongoDB -------------------------------------------------------
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://profast_user:profast_password@cluster0.mhtwx9f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
