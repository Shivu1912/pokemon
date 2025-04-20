const express = require('express');
const cors = require('cors'); // ✅ import cors
const app = express();
const PORT = 3001;

// ✅ enable CORS for all origins
app.use(cors());

// Middleware
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

// Your Pokémon API route
app.get('/pokemon/:name', async (req, res) => {
  const name = req.params.name.toLowerCase();
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: 'Pokémon not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
