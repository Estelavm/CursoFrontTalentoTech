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
    const contenedorProductos = document.querySelector('.productos'); 
    contenedorProductos.innerHTML = ''; 

    // Recorremos el array de productos y generamos el HTML para cada uno
    productos.forEach(producto => {
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
function agregarEventosDescripcion() {
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
}

const traducciones = {
    "Apam balik": "Pancake de frijoles",
    "Apple & Blackberry Crumble": "Crumble de manzana y mora",
    "Apple Frangipan Tart": "Tarta de manzana y frangipane",
    "Bakewell tart": "Tarta Bakewell",
    "Banana Pancakes": "Panqueques de Banana",
    "Battenberg Cake": "Pastel Battenberg"
};

function traducirNombre(nombre) {
    return traducciones[nombre] || nombre; 
}

// Obtener los productos de la sección del HTML
async function obtenerProductosSelectos() {
    const contenedorProductosSelectos = document.querySelector('.productos_selectos');
    try {
        const respuesta = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
        if (!respuesta.ok) throw new Error('Error al obtener los datos');
        
        const data = await respuesta.json();
        const productos = data.meals.slice(0, 6);

        contenedorProductosSelectos.innerHTML = productos.map(producto => ` 
            <div class="producto">
                <img src="${producto.strMealThumb}" alt="${producto.strMeal}">
                <h2>${traducirNombre(producto.strMeal)}</h2>
                <button class="btn-descripcion">Ver descripción</button>
                <div class="descripcion-ampliada">
                    ¡Delicioso postre para disfrutar!
                </div>
            </div>
        `).join('');

        agregarEventosDescripcion();
    } catch (error) {
        console.error('Ocurrió un error:', error);
        contenedorProductosSelectos.innerHTML = '<p>No se pudieron cargar los productos. Intenta más tarde.</p>';
    }
}

obtenerProductosSelectos();

//Menú hamburguesa
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle'); // Botón del menú
    const navbarNav = document.getElementById('navbarNav'); // Contenedor del menú
    const navLinks = navbarNav.querySelectorAll('a'); // Enlaces dentro del menú

    // Mostrar/ocultar menú al hacer clic en el botón
    menuToggle.addEventListener('click', () => {
        navbarNav.classList.toggle('active');
    });

    // Ocultar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarNav.classList.remove('active');
        });
    });
});


