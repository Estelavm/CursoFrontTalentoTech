// Verificar si todos los campos del formulario están completos
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Previene el envío del formulario para realizar la validación

    const nombre = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("message").value.trim();

    if (nombre === "" || email === "" || mensaje === "") {
        console.log("Por favor, completa todos los campos del formulario.");
    } else {
        console.log("Formulario completo. ¡Gracias por contactarnos!");
    }
});

// Obtener los productos de la sección del HTML
const productosDisponibles = document.querySelectorAll(".productos .producto h2");

// Mostrar los productos disponibles en la consola
console.log("Lista de productos disponibles:");
productosDisponibles.forEach((producto, index) => {
    console.log(`${index + 1}. ${producto.textContent}`);
});

