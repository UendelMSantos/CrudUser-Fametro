const express = require('express');
const app = express();

// Importe suas rotas
const routes = require('./routes');

app.use(express.json());

// Use suas rotas
app.use(routes);

app.listen(3333);