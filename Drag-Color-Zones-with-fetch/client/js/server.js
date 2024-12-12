import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();

app.use(bodyParser.json());
app.use(express.static('assets'));

let cardPositions = {}; // Variable para guardar las posiciones de las cartas

app.post('/save-positions', (req, res) => {
  cardPositions = req.body; // Guardar las posiciones en la variable cardPositions
  fs.writeFileSync('cardPositions.json', JSON.stringify(cardPositions, null, 2)); // Guardar las posiciones en el archivo cardPositions.json
  res.sendStatus(200); // Enviar respuesta de éxito
});

app.get('/get-positions', (req, res) => {
  if (fs.existsSync('cardPositions.json')) {
    const data = fs.readFileSync('cardPositions.json'); // Leer el archivo cardPositions.json
    res.json(JSON.parse(data)); // Enviar los datos como respuesta
  } else {
    res.json({}); // Enviar un objeto vacío si no existe
  }
});

// Servir el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'index.html')); // Enviar el archivo index.html
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`); 
});