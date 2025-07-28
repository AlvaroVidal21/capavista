
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// --------------------------------------------
// Importamos el  router de login
const loginRouter = require('./routes/login');
// Usamos el router de login
app.use('/login', loginRouter);
// --------------------------------------------


app.listen(3000, () => console.log('Servidor ON en http://localhost:3000'));
