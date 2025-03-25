// server.js (Node.js/Express.js)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const port = 5000; // or any port you prefer

app.use(cors());
app.use(bodyParser.json());

const secretKey = 'yourSecretKey'; // Replace with a strong secret key
const users = []; // In-memory user storage (for demonstration; use a database in production)

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// a. Login API
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({ username: user.username }, secretKey);
    res.json({ accessToken });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// b. Dashboard API
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({
    cards: [
      { id: 'card1', title: 'Card 1' },
      { id: 'card2', title: 'Card 2' },
      { id: 'card3', title: 'Card 3' },
    ],
  });
});

// c. Map View API
app.get('/map', authenticateToken, (req, res) => {
  res.json({ message: 'Map data' }); // You can add map related data here.
});

// Registration API
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).send('User registered');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});