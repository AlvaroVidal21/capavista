

document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this).entries());
  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();

  // Mostramo el mensaje
  document.getElementById("respuesta").innerText = json.mensaje || json.error;


  // guardar el cliente y redirigir
  if (json.cliente) {
    localStorage.setItem("cliente", JSON.stringify(json.cliente));
    window.location.href = "/cliente";
  }
});
