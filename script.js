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
        id: 1,
        nombre: "Torta de Chocolate Blanco",
        imagen: "./Images/Chocolate-Blanco.png",
        precio: 4500,
        descripcion: "Un delicioso bizcocho suave y esponjoso, relleno y cubierto con una rica capa de chocolate blanco."
    },
    {
        id: 2,
        nombre: "Chocotorta",
        imagen: "./Images/Chocotorta.png",
        precio: 3500,
        descripcion: "Hecha con capas de galletitas de chocolate bañadas en café, intercaladas con una suave crema de queso y dulce de leche."
    },
    {
        id: 3,
        nombre: "Torta Merengada",
        imagen: "./Images/Merengada.png",
        precio: 2500,
        descripcion: "Una torta ligera y aireada con capas de merengue crocante y una suave crema."
    },
    {
        id: 4,
        nombre: "Mousse de Chocolate",
        imagen: "./Images/Mousse.png",
        precio: 5000,
        descripcion: "Un postre suave y cremoso con un intenso sabor a chocolate, ideal para los fanáticos del chocolate en su forma más ligera."
    },
    {
        id: 5,
        nombre: "Torta Red Velvet",
        imagen: "./Images/Red-Velvet.png",
        precio: 3500,
        descripcion: "Un bizcocho esponjoso de color rojo vibrante, cubierto con una suave crema de queso, combinando el sabor sutil del cacao."
    },
    {
        id: 6,
        nombre: "Torta Fraiser",
        imagen: "./Images/Torta-Fraiser.png",
        precio: 5000,
        descripcion: "Un bizcocho suave relleno con crema pastelera y fresas frescas, creando una combinación de sabores frescos y dulces."
    }
];

// Mostrar los productos en la página
function mostrarProductos() {
    const contenedorProductos = document.querySelector('.productos'); 
    contenedorProductos.innerHTML = ''; 

    productos.forEach(producto => {
        const productoHTML = `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h2>${producto.nombre}</h2>
                <p class="precio">$${producto.precio}</p>
                <button class="btn-descripcion">Ver descripción</button>
                <div class="descripcion-ampliada">
                    ${producto.descripcion}
                </div>
                <button class="btn-descripcion btn-agregar" data-id="${producto.id}" data-nombre="${producto.nombre}" data-imagen="${producto.imagen}" data-precio="${producto.precio}" data-descripcion="${producto.descripcion}">Agregar al carrito</button>
            </div>
        `;

        contenedorProductos.innerHTML += productoHTML;
    });

    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito); 
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

// Obtener los productos de API
async function obtenerProductosSelectos() {
    const contenedorProductosSelectos = document.querySelector('.productos_selectos');
    try {
        const respuesta = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
        if (!respuesta.ok) throw new Error('Error al obtener los datos');
        
        const data = await respuesta.json();
        const productos = data.meals.slice(0, 6);

        productos.forEach((producto, index) => {
            producto.id = `selecto-${index + 1}`; 
        });

        contenedorProductosSelectos.innerHTML = productos.map(producto => ` 
            <div class="producto">
                <img src="${producto.strMealThumb}" alt="${producto.strMeal}">
                <h2>${traducirNombre(producto.strMeal)}</h2>
                <button class="btn-descripcion">Ver descripción</button>
                <div class="descripcion-ampliada">
                    ¡Delicioso postre para disfrutar!
                </div>
                <button class="btn-descripcion btn-agregar" data-id="${producto.id}" data-nombre="${traducirNombre(producto.strMeal)}" data-imagen="${producto.strMealThumb}" data-precio="1500" data-descripcion="¡Delicioso postre para disfrutar!">Agregar al carrito</button>
            </div>
        `).join('');

        agregarEventosDescripcion();
        const botonesAgregar = document.querySelectorAll('.btn-agregar');
        botonesAgregar.forEach(boton => {
            boton.addEventListener('click', agregarAlCarrito); 
        });
    } catch (error) {
        console.error('Ocurrió un error:', error);
        contenedorProductosSelectos.innerHTML = '<p>No se pudieron cargar los productos. Intenta más tarde.</p>';
    }
}

obtenerProductosSelectos();

//Menú hamburguesa
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle'); 
    const navbarNav = document.getElementById('navbarNav'); 
    const navLinks = navbarNav.querySelectorAll('a'); 

    menuToggle.addEventListener('click', () => {
        navbarNav.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarNav.classList.remove('active');
        });
    });
});

// Agregar al carrito
function agregarAlCarrito(event) {
    const boton = event.target;
    const id = parseInt(boton.getAttribute('data-id'), 10);
    const nombre = boton.getAttribute('data-nombre');
    const imagen = boton.getAttribute('data-imagen');
    const precio = parseFloat(boton.getAttribute('data-precio'));
    const descripcion = boton.getAttribute('data-descripcion');
    
    const producto = { nombre, imagen, descripcion, precio, cantidad: 1 };

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push(producto);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();

    document.querySelector('.productos').addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-agregar')) {
            agregarAlCarrito(event);
        }
    });
});
