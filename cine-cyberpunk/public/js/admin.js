const $ = sel => document.querySelector(sel);
const tbodyClientes = $("#tablaClientes tbody");
const tbodyCupones  = $("#tablaCupones tbody");
const buscador = $("#buscador");

let clientes = [];
let cupones  = [];

function renderClientes(lista) {
  tbodyClientes.innerHTML = lista.map(c => `
    <tr>
      <td>${c.id ?? c.id_cliente ?? ''}</td>
      <td>${c.dni ?? ''}</td>
      <td>${c.nombres ?? ''}</td>
      <td>${c.apellidos ?? ''}</td>
      <td>${c.puntos ?? 0}</td>
    </tr>
  `).join('');
}

function renderCupones(lista) {
  tbodyCupones.innerHTML = lista.map(x => `
    <tr>
      <td>${x.id}</td>
      <td>${x.cliente_id}</td>
      <td>${x.codigo}</td>
      <td>${x.estado}</td>
      <td>${x.fecha_emision ?? ''}</td>
      <td>${x.fecha_canje ?? ''}</td>
    </tr>
  `).join('');
}

function normaliza(txt) {
  return (txt || '').toString().toLowerCase();
}

function filtrar() {
  const q = normaliza(buscador.value);

  const fc = clientes.filter(c =>
    normaliza(c.dni).includes(q) ||
    normaliza(c.nombres).includes(q) ||
    normaliza(c.apellidos).includes(q)
  );
  renderClientes(fc);

  const fcu = cupones.filter(x =>
    normaliza(x.codigo).includes(q) ||
    normaliza(x.estado).includes(q) ||
    String(x.cliente_id).includes(q)
  );
  renderCupones(fcu);
}

Promise.all([
  fetch('/data/clientes').then(r => r.json()).catch(() => []),
  fetch('/data/cupones').then(r => r.json()).catch(() => [])
]).then(([cli, cup]) => {
  clientes = Array.isArray(cli) ? cli : (cli.clientes || []);
  cupones  = Array.isArray(cup) ? cup : (cup.cupones  || []);
  renderClientes(clientes);
  renderCupones(cupones);
});

buscador.addEventListener('input', filtrar);
