const cliente = JSON.parse(localStorage.getItem('cliente'));

//validazao
if (!cliente) {
    window.location.href = "/ingresar";
}

// Mostrar la data del cliente

document.getElementById("nombreCliente").textContent = cliente.nombres + " " + cliente.apellidos;

document.getElementById("puntosCliente").textContent = cliente.puntos;



// Canjear cupon

const btnCanjear = document.getElementById("btnCanjear");

if (cliente.puntos < 50) {
    btnCanjear.disabled = true;
    btnCanjear.textContent = "No tienes suficientes puntos";
}

// generamos cupon
function generarCupon(){
    const caracteres = "ABCDEFGHI1234567890";
    let cupon = "";

    for (let i = 0; i < 6; i++) {
        cupon += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    return cupon;
}


// El evento
btnCanjear.addEventListener("click", () => {
    const cupon = { 
     codigo: generarCupon(),
     puntos_requeridos: 50,
     estado: "pendiente",
     fecha_emision: new Date().toLocaleString()

    };
    
    localStorage.setItem("cupon", JSON.stringify(cupon));


    // mostrar en la pagina
    document.getElementById("cuponInfo").innerHTML = `
    <h3>¡Cupon generado!</h3>
    <p>Código: ${cupon.codigo}</p>
    <p>Estado: ${cupon.estado}</p>
    <p>Fecha de emisión: ${cupon.fecha_emision}</p>
    `;

});