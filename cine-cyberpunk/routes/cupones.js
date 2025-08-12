const fs = require('fs');
const path = require('path');

app.post('/cupones', (req, res) => {
    const nuevo = req.body; 
    const ruta = path.join(__dirname, 'data', 'cupones.json')

    fs.readFile(ruta, 'utf-8', (err, txt) => {
        if (err) return res.status(500).json({error:'No se puede leer los cupones'});
        const arr = txt ? JSON.parse(txt) : [];
        // Operador de encadenamiento opcional
        // Si arr.at(-1) no existe -> undefined
        // (si es undefined || 0) usa cero
        nuevo.id = (arr.at(-1)?.id || 0) + 1;
        arr.push(nuevo)

        fs.writeFile(ruta, JSON.stringify(arr, null, 2), (err2) => {
            if (err2) return res.status(500).json({error: 'No se pudo escribir cupones'});
            res.json({ok:true, cupon:nuevo});
        });   
    });
});


fetch('/cupones', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        cliente_id: cliente.id,
        codigo: cuponGuardado.codigo,
        estado: 'canjeado',
        fecha_emisiopn: cuponGuardado.fecha_emision,
        fecha_canje: cuponGuardado.fecha_canje
    })
});