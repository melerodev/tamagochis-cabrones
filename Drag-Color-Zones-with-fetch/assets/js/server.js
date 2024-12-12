import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('assets'));

let cardPositions = {};

app.post('/save-positions', (req, res) => {
  cardPositions = req.body;
  fs.writeFileSync('cardPositions.json', JSON.stringify(cardPositions, null, 2));
  res.sendStatus(200);
});

app.get('/get-positions', (req, res) => {
  if (fs.existsSync('cardPositions.json')) {
    const data = fs.readFileSync('cardPositions.json');
    res.json(JSON.parse(data));
  } else {
    res.json({});
  }
});

// Servir el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});