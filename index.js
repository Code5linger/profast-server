const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// DEMO Data ⏬
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

// DEMO DATA ⬆️⬆️

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
