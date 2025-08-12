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


const cuponExistente = JSON.parse(localStorage.getItem("cupon"));

function renderCupon(c) {
    document.getElementById("cuponInfo").innerHTML = `
        <h3>Cupon generado!</h3>
        <p>Codigo: ${c.codigo}</p>
        <p>Estado: ${c.estado}</p>
        <p>Fecha de emisión: ${c.fecha_emision}</p>
        ${c.fecha_canje ? `<p>Fecha de canje: ${c.fecha_canje}</p>` : ""}
    `;
}

    // Si ya existe en cupón se bloque el botón
    if (cuponExistente && cuponExistente.estado === "pendiente") {
        renderCupon(cuponExistente);
        btnCanjear.disabled = true;
        btnCanjear.textContent = "Ya tienes un cupón pendiente";
    }


// botón canjear
btnCanjear.addEventListener("click", () => {
    // No emitir si ya existe un cupon:
    const cuponGuardado = JSON.parse(localStorage.getItem("cupon"));

    if (cuponGuardado && cuponGuardado.estado === "pendiente") {
        btnCanjear.disabled = true;
        btnCanjear.textContent = "No tienes un cupón pendiente";
        return;
    }

    // Verificar puntos
    if (cliente.puntos < 50) {
        btnCanjear.disabled = true;
        btnCanjear.textContent = "No tienes suficientes puntos";
        return;
    }

    // Si no hay cupon guardado, generamos uno nuevo
    const cupon = {
     codigo: generarCupon(),
     puntos_requeridos: 50,
     estado: "pendiente",
     fecha_emision: new Date().toLocaleString()

    };
    
    localStorage.setItem("cupon", JSON.stringify(cupon));

    // render Cupon muestra el cupon en la pag
    renderCupon(cupon);


    // Descontar puntos
    cliente.puntos = 0;
    localStorage.setItem("cliente", JSON.stringify(cliente));
    document.getElementById("puntosCliente").textContent = cliente.puntos;

    // Bloquear el boton para no emitir otro
    btnCanjear.disabled = true;
    btnCanjear.textContent = "Cupón canjeado";

});

// Pedir películas al servidor
fetch('/peliculas')
    .then(res => res.json())
    .then(peliculas => {
        const select = document.getElementById("peliculaSelect");
        const precioPelicula = document.getElementById("precioPelicula");


        // LLenar el select con los datos de las pelis
        peliculas.forEach(p=> {
            const option = document.createElement("option");
            option.value = p.id;
            option.textContent = p.titulo;
            select.appendChild(option);
        });

        // Actualizar el precio al seleccionar la peli
        function actualizarPrecio() {
            const idSeleccionado = parseInt(select.value);

            const pelicula = peliculas.find(p => p.id === idSeleccionado);

            precioPelicula.textContent = pelicula.precio;
        }

        // Mostrar precio
        actualizarPrecio();
        select.addEventListener("change", actualizarPrecio);

        // Boton Comprar
        document.getElementById("btnComprar").addEventListener("click", () => {
            const idSeleccionado = parseInt(select.value);
            const pelicula = peliculas.find(p => p.id === idSeleccionado);

            const inputCupon = document.getElementById("cuponInput").value.trim().toUpperCase();
            const cuponGuardado = JSON.parse(localStorage.getItem("cupon"))

            let precioFinal = pelicula.precio;
            let mensaje  = `Has comprado ${pelicula.titulo} por S/.${precioFinal}`;

            // Si escribió el cupón:
            if (inputCupon) {
                if (cuponGuardado && cuponGuardado.estado === "pendiente" && inputCupon === cuponGuardado.codigo){
                    precioFinal = (pelicula.precio * 0.75).toFixed(2);


                    // Cambiar el estado a canjeado y guardar
                    cuponGuardado.estado = "canjeado";
                    cuponGuardado.fecha_canje = new Date().toLocaleString();
                    localStorage.setItem("cupon", JSON.stringify(cuponGuardado));

                    // Actualizar el panel de cupón en la pantalla
                    document.getElementById("cuponInfo").innerHTML = `
                        <h3>Cupón aplicado!</h3>
                        <p>Código: ${cuponGuardado.codigo}</p>
                        <p>Estado: ${cuponGuardado.estado}</p>
                        <p>Fecha de canje: ${cuponGuardado.fecha_canje}</p>
                    `;

                    mensaje = `Has comprado ${pelicula.titulo} por S/.${precioFinal}`;
                } else {
                    // O sea, el usuario colocó mal el cupón
                    mensaje = `Cupón inválido o ya canjeado.`;
                }
            }

            document.getElementById("compraResultado").textContent = mensaje;
        })
    })
    .catch(error => {
        console.error("Error al obtener las películas:", error);
    });

