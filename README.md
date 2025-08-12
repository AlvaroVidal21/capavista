# 🎬 Cine Cyberpunk – Sistema de Gestión de Clientes y Cupones

## 📌 Descripción
**Cine Cyberpunk** es un sistema web desarrollado como parte del curso *Proyecto Desarrollo de los Componentes de la Capa de Vista* en IDAT.  
Su objetivo es simular la gestión de clientes, puntos y cupones de un cine, permitiendo:
- Acceso de usuario para canjear cupones y comprar entradas.
- Acceso de administrador en modo lectura para visualizar clientes y cupones.

## 🚀 Funcionalidades Principales

### 👤 Panel del Usuario
- **Login** mediante DNI y contraseña.
- Visualización de puntos acumulados.
- Canje de cupones si el cliente tiene **50 puntos o más**.
- Compra de entradas con o sin cupón (descuento del **25%** si aplica).
- Bloqueo del botón de canjear una vez emitido el cupón.
- Mensajes de validación para evitar cupones inválidos o ya canjeados.

### 🛠️ Panel del Administrador (solo lectura)
- Visualización de clientes con sus datos.
- Listado de cupones con estado (pendiente o canjeado).
- Filtro de búsqueda por DNI, nombre, código o estado.

## 📂 Estructura del Proyecto
📦 CINE-CYBERPUNK
┣ 📂 data
┃ ┣ clientes.json
┃ ┣ cupones.json
┃ ┗ entradas.json
┣ 📂 public
┃ ┣ 📂 css
┃ ┃ ┗ login.css
┃ ┣ 📂 js
┃ ┃ ┗ login.js
┃ ┗ 📂 views
┃ ┣ cliente.html
┃ ┗ login.html
┣ 📂 routes
┃ ┗ login.js
┣ server.js
┗ package.json


## 💻 Tecnologías Utilizadas
- **Frontend:** HTML5, CSS3, Bootstrap 5, JavaScript
- **Backend:** Node.js, Express.js
- **Base de datos:** Archivos JSON (modo demostración)
- **Control de versiones:** Git/GitHub

## 📌 Limitaciones Actuales
- Los cambios en puntos o cupones **no se persisten** en el JSON (modo demo).
- Falta implementar login para el panel de administrador.
- El JSON no impide que un cliente tenga múltiples cupones pendientes.
- No hay autenticación con sesiones o tokens.

## 🔮 Mejoras Futuras
- Implementar persistencia real con **Base de Datos** (MySQL, MongoDB).
- Autenticación segura con JWT o sesiones.
- CRUD completo para administración de clientes y cupones.
- Interfaz más adaptada a dispositivos móviles.

---

## 👨‍💻 Autor
**Alvaro Vidal** – *Estudiante de Desarrollo de Sistemas en IDAT*  
📅 Proyecto desarrollado en 2025  

