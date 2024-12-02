// Mostrar carrito
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContenedor = document.getElementById('carrito-contenedor');
    carritoContenedor.innerHTML = ''; 

    if (carrito.length === 0) {
        carritoContenedor.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    let total = 0; 

    carrito.forEach((producto, index) => {
        const productoHTML = `
            <div class="producto-carrito producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <div class="precio">$${producto.precio * producto.cantidad}</div>
                <p>Cantidad: <input type="number" class="cantidad" data-index="${index}" value="${producto.cantidad}" min="1"></p>
                <button class="btn-descripcion btn-eliminar" data-index="${index}">Eliminar</button>
            </div>
        `;
        carritoContenedor.innerHTML += productoHTML;
        total += producto.precio * producto.cantidad; 
    });

        const totalHTML = `<div class="total">Total: $${total.toFixed(2)}</div>`;
        carritoContenedor.innerHTML += totalHTML;

        actualizarEventosCarrito();
    }

    // Actualizar cantidades
    function actualizarEventosCarrito() {
        document.querySelectorAll('.cantidad').forEach(input => {
            input.addEventListener('change', actualizarCantidad);
        });
    
        document.querySelectorAll('.btn-eliminar').forEach(boton => {
            boton.addEventListener('click', eliminarProducto);
        });
    }


// Actualizar la cantidad de un producto en el carrito
function actualizarCantidad(event) {
    const index = event.target.getAttribute('data-index');
    const cantidad = parseInt(event.target.value, 10);

    if (cantidad < 1) {
        event.target.value = 1;
        return;
    }

    const carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito[index].cantidad = cantidad;

    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarCarrito();
}

// Eliminar un producto del carrito
function eliminarProducto(event) {
    const index = event.target.getAttribute('data-index');
    const carrito = JSON.parse(localStorage.getItem('carrito'));

    carrito.splice(index, 1);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarCarrito();
}

// Vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    mostrarCarrito();
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();

    const botonVaciar = document.getElementById('vaciar-carrito');
    if (botonVaciar) {
        botonVaciar.addEventListener('click', vaciarCarrito);
    }
});
