const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');

const app = express();
const server = createServer(app);
app.use(express.json()); // esto es un middleware para poder leer el body de las peticiones
var posicionesCartas = [];

const directorioPrincipal = join(__dirname, '../../');

// configura una ruta estática para servir los archivos
app.use(express.static(join(directorioPrincipal)));

// mandamos el archivo index.html al cliente
app.get('/', (req, res) => {
    res.sendFile(join(directorioPrincipal, 'index.html'));
});

// ruta para guardar las posiciones de las cartas
app.post('/save', (req, res) => {
    console.log('Posiciones recibidas:', req.body); // verifica lo que se recibe
    posicionesCartas.push(req.body); // guarda las posiciones de las cartas
    res.json({ ok: true}); // responde con un mensaje de éxito
});

// ruta para obtener las posiciones de las cartas guardadas
app.get('/save', (req, res) => {
    res.json(posicionesCartas); // devuelve las posiciones guardadas
});

server.listen(3000, () => {
    console.log('servidor corriendo en http://localhost:3000');
});
