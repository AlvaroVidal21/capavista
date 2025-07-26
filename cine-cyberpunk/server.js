const express = require('express');
// Necesito leer los datos de clientes.json
const fs = require('fs'); // Módulo para trabajar con archivos
const path = require('path'); // Módulo para trabajar con rutas
const app = express();


app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos desde la carpeta 'public'

app.use(express.json()); // Middleware para parsear JSON en el cuerpo de las peticiones

app.get('/', (req, res) => {
    res.send('Servidor OK)');
});

app.use(express.static(path.join(__dirname, 'public')));


// Ruta: Login
app.post('/login', (req, res) => {
    const { dni, contraseña } = req.body;
    const ruta = path.join(__dirname, 'data', 'clientes.json');

    fs.readFile(ruta, 'utf-8', (err, data) => {
        if (err)  return res.status(500).json({ error: 'No se pudo leer el archivo de clientes' });

        const clientes = JSON.parse(data);
        const cliente = clientes.find(cliente => cliente.dni === dni);

        if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });

        if (cliente.contraseña !== contraseña){
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        };

        res.json({
            mensaje: 'Inicio de sesión exitoso',
            cliente: {
                id: cliente.id,
                dni: cliente.dni,
                nombres: cliente.nombres,
                apellidos: cliente.apellidos,
                correo: cliente.correo,
                puntos: cliente.puntos,
                fecha_registro: cliente.fecha_registro
            }
        });
    });
});


// Ruta: REGISTRO
app.post('/registro', (req, res) => {
    const ruta = path.join(__dirname, 'data', 'clientes.json');
    const { dni, contraseña, nombres, apellidos,  correo } = req.body;

    fs.readFile(ruta, 'utf-8', (err, data) => {
        if (err) return res.status(500).json({error: 'No se pudo leer clientes'});

        const clientes = JSON.parse(data);

        // En caso ya exista el DNI (o sea no se puede registrar)
        const existe = clientes.some(cliente => cliente.dni === dni);
        if (existe) {
            return  res.status(409).json({
                error: 'El DNI ya está registrado'
            });
        }

        // En caso de que no exista el DNI (o sea se puede registrar)
        const nuevoCliente = {
            id: clientes.length + 1,
            dni,
            contraseña,
            apellidos,
            correo,
            puntos: 0,
            fecha_registro: new Date().toISOString().slice(0, 10)
        };

        clientes.push(nuevoCliente);


        fs.writeFile(ruta, JSON.stringify(clientes, null, 2), err => {
            if (err) return resizeTo.status(500).json({error: 'No se pudo guardar el cliente'});

            res.status(201).json({mensaje: 'Cliente registrado exitosamente', cliente: nuevoCliente});
        })
    });
});

// Ruta: CLIENTES, en teoría esta rutaa solo puede ser accedida por el administrador no???? Claro, chequear como hacaerlo
app.get('/clientes', (req, res) => {
    const ruta = path.join(__dirname, 'data', 'clientes.json');

    fs.readFile(ruta, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({error: 'Error al leer el archivo'});
        }

        const clientes = JSON.parse(data);
        res.json(clientes);  
    });
});


// Ruta: CUPONES
app.get('/cupones', (req, res) => {
    const ruta = path.join(__dirname, 'data', 'cupones.json');


    fs.readFile(ruta, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({error: 'Error al leer el archivo'});
        }

        const cupones = JSON.parse(data);
        res.json(cupones);
    });
});


// Ruta: ENTRADAS
app.post('/entradas', (req, res) => {
    const ruta = path.join(__dirname, 'data', 'entradas.json');

    fs.readFile(ruta, 'utf-8',  (err, data) => {
        if (err) return res.status(500).json({error: 'Error al leer el archivo'});

        const  entradas = JSON.parse(data);
        const nuevaEntrada = {
            id: entradas.length + 1,
            cliente_id: req.body.cliente_id,
            fecha_entrada: new Date().toISOString().slice(0, 10),
            sala: req.body.sala,
            monto: req.body.monto
        };

        entradas.push(nuevaEntrada);

        fs.writeFile(ruta, JSON.stringify(entradas, null, 2), err => {
            if (err) return  res.status(500).json({error: 'Error al escribir el archivo'});

            res.status(201).json({
                message: 'Entrada creada exitosamente',
                entrada: nuevaEntrada
            });
        });
    });
});


app.listen(3000, () => {
    console.log('Servidor ON: http://localhost:3000');
})