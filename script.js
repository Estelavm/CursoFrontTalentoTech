// Verificar si todos los campos del formulario están completos
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const nombre = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("message").value.trim();

    if (nombre === "" || email === "" || mensaje === "") {
        console.log("Por favor, completa todos los campos del formulario.");
    } else {
        console.log("Formulario completo. ¡Gracias por contactarnos!");
    }
});

//Array de productos
const productos = [
    {
        nombre: "Torta de Chocolate Blanco",
        imagen: "./Images/Chocolate-Blanco.png",
        descripcion: "Un delicioso bizcocho suave y esponjoso, relleno y cubierto con una rica capa de chocolate blanco."
    },
    {
        nombre: "Chocotorta",
        imagen: "./Images/Chocotorta.png",
        descripcion: "Hecha con capas de galletitas de chocolate bañadas en café, intercaladas con una suave crema de queso y dulce de leche."
    },
    {
        nombre: "Torta Merengada",
        imagen: "./Images/Merengada.png",
        descripcion: "Una torta ligera y aireada con capas de merengue crocante y una suave crema."
    },
    {
        nombre: "Mousse de Chocolate",
        imagen: "./Images/Mousse.png",
        descripcion: "Un postre suave y cremoso con un intenso sabor a chocolate, ideal para los fanáticos del chocolate en su forma más ligera."
    },
    {
        nombre: "Torta Red Velvet",
        imagen: "./Images/Red-Velvet.png",
        descripcion: "Un bizcocho esponjoso de color rojo vibrante, cubierto con una suave crema de queso, combinando el sabor sutil del cacao."
    },
    {
        nombre: "Torta Fraiser",
        imagen: "./Images/Torta-Fraiser.png",
        descripcion: "Un bizcocho suave relleno con crema pastelera y fresas frescas, creando una combinación de sabores frescos y dulces."
    }
];

// Mostrar los productos en la página
function mostrarProductos() {
    const contenedorProductos = document.querySelector('.productos'); // Selector del contenedor donde se van a mostrar los productos
    contenedorProductos.innerHTML = ''; // Limpiar cualquier contenido previo en el contenedor

    // Recorremos el array de productos y generamos el HTML para cada uno
    productos.forEach(producto => {
        // Crear el HTML de cada producto
        const productoHTML = `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h2>${producto.nombre}</h2>
                <button class="btn-descripcion">Ver descripción</button>
                <div class="descripcion-ampliada">
                    ${producto.descripcion}
                </div>
            </div>
        `;

        // Insertar el HTML generado en el contenedor de productos
        contenedorProductos.innerHTML += productoHTML;
    });

    // Mostrar los productos disponibles en la consola después de que se hayan insertado en el DOM
    const productosDisponibles = document.querySelectorAll(".productos .producto h2");

    console.log("Lista de productos disponibles:");
    productosDisponibles.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.textContent}`);
    });
}

document.addEventListener('DOMContentLoaded', mostrarProductos);

// Mostrar/ocultar descripción del producto
document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".btn-descripcion");

    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            e.stopPropagation();

            const descripcion = boton.nextElementSibling;

            if (descripcion) {
                const estaVisible = descripcion.style.display === "block";
                descripcion.style.display = estaVisible ? "none" : "block";

                boton.textContent = estaVisible ? "Ver descripción" : "Ocultar descripción";
            }
        });
    });
});

// Obtener los productos de la sección del HTML
const productosDisponibles = document.querySelectorAll(".productos .producto h2");

// Mostrar los productos disponibles en la consola
console.log("Lista de productos disponibles:");
productosDisponibles.forEach((producto, index) => {
    console.log(`${index + 1}. ${producto.textContent}`);
});
