document.addEventListener('DOMContentLoaded', function () {
    // Variables para el menú y el carrito
    var menuBtn = document.getElementById('menu-btn');
    var menu = document.getElementById('menu');
    var cerrarMenuBtn = document.getElementById('cerrar-menu');
    var cartBtn = document.getElementById('cart-btn');
    var cart = document.getElementById('cart');
    var cerrarCartBtn = document.getElementById('cerrar-cart');

    // CARRUSEL
    let indiceActual = 0;
    const imagenes = document.querySelectorAll('.carrusel img');
    const totalImagenes = imagenes.length;

    // Define la variable CSS para el ancho total
    document.documentElement.style.setProperty('--total-imagenes', totalImagenes);

    // Establece un intervalo para cambiar las imágenes cada 5 segundos
    let intervaloCarrusel = setInterval(() => {
        indiceActual = (indiceActual + 1) % totalImagenes; // Vuelve a la primera imagen después de la última
        actualizarCarrusel();
    }, 2000); // 5000 milisegundos = 5 segundos

    // Funciones para actualizar y reiniciar el carrusel
    function actualizarCarrusel() {
        const anchoImagen = imagenes[0].clientWidth;
        const nuevoDesplazamiento = anchoImagen * indiceActual;
        document.querySelector('.carrusel').style.transform = `translateX(-${nuevoDesplazamiento}px)`;
    }

    function reiniciarIntervalo() {
        clearInterval(intervaloCarrusel);
        intervaloCarrusel = setInterval(() => {
            indiceActual = (indiceActual + 1) % totalImagenes;
            actualizarCarrusel();
        }, 5000);
    }

    // Eventos para los botones del carrusel
    document.getElementById('carrusel-anterior').addEventListener('click', () => {
        if (indiceActual > 0) {
            indiceActual--;
        } else {
            indiceActual = totalImagenes - 1; // Vuelve a la última imagen si estamos en la primera
        }
        actualizarCarrusel();
        reiniciarIntervalo();
    });

    document.getElementById('carrusel-siguiente').addEventListener('click', () => {
        indiceActual = (indiceActual + 1) % totalImagenes;
        actualizarCarrusel();
        reiniciarIntervalo();
    });

    // Eventos para el menú
    menuBtn.addEventListener('click', function () {
        abrirMenu();
    });

    cerrarMenuBtn.addEventListener('click', function () {
        cerrarMenu();
    });

    // Cierra el menú al hacer clic en cualquier enlace dentro del menú
    menu.addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
            cerrarMenu();
        }
    });

    // Eventos para el carrito
    cartBtn.addEventListener('click', function () {
        abrirCarrito();
    });

    cerrarCartBtn.addEventListener('click', function () {
        cerrarCarrito();
    });

    // Cierra el carrito al hacer clic en cualquier enlace dentro del carrito
    cart.addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
            cerrarCarrito();
        }
    });

    // Función para abrir el menú
    function abrirMenu() {
        menu.style.right = '0';
    }

    // Función para cerrar el menú
    function cerrarMenu() {
        menu.style.right = '-250px';
    }

    // Función para abrir el carrito
    function abrirCarrito() {
        cart.style.right = '0';
    }

    // Función para cerrar el carrito
    function cerrarCarrito() {
        cart.style.right = '-250px';
    }
});
