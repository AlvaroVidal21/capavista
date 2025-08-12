
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// ----------------------------
// Las películas
// ----------------------------
app.get('/peliculas', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'peliculas.json'));
})

// ----------------------------
// Rutas para vistas
// ----------------------------
app.get('/ingresar', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
})

app.get('/cliente', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cliente.html'));
})


app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
})

// ----------------------------
// Obtener: Clientes y Cupones
// ----------------------------
app.get('/data/clientes', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'clientes.json'));
});

app.get('/data/cupones', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'cupones.json'));
});



// --------------------------------------------
// Importamos el  router de login
const loginRouter = require('./routes/login');
// Usamos el router de login
app.use('/login', loginRouter);
// --------------------------------------------


app.listen(3000, () => console.log('Servidor ON en http://localhost:3000'));
