// routes/login.js
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');



//  POST /login → procesa credenciales
router.post('/', (req, res) => {
  const { dni, contraseña } = req.body;
  const ruta = path.join(__dirname, '../data/clientes.json');

  fs.readFile(ruta, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'No se pudo leer clientes' });

    const clientes = JSON.parse(data);
    const cliente = clientes.find(c => c.dni === dni);

    if (!cliente) 
      return res.status(404).json({ error: 'Cliente no encontrado' });

    if (cliente.contraseña !== contraseña)
      return res.status(401).json({ error: 'Contraseña incorrecta' });

    return res.json({
      mensaje: 'Inicio de sesión exitoso',
      cliente: {
        id: cliente.id,
        nombres: cliente.nombres,
        apellidos: cliente.apellidos,
        puntos: cliente.puntos
      }
    });
  });
});

module.exports = router;
