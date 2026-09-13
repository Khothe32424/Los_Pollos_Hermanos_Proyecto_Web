// ===== SCRIPT GLOBAL PARA POLLOS HERMANOS =====

document.addEventListener('DOMContentLoaded', () => {

    // ---------- CARRITO ----------
    // Función para agregar productos
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        alert('✅ Producto añadido al carrito.');
    }

    // Actualizar el badge del carrito en el header
    function updateCartBadge() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const badge = document.getElementById('cart-count');
        if (badge) badge.textContent = cart.length;
    }

    // Botón del header: redirigir a carrito.html
    const btnHeader = document.getElementById('btn-header-pedir');
    if (btnHeader) {
        btnHeader.addEventListener('click', function(e) {
            window.location.href = 'carrito.html';
        });
    }

    // ---------- BOTONES "Añadir al carrito" EN PROMOCIONES ----------
    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const card = this.closest('.card');
            if (!card) return;
            const nombre = card.querySelector('h3')?.textContent || 'Producto';
            const precio = card.querySelector('.price')?.textContent || 'S/ 0.00';
            const descripcion = card.querySelector('p')?.textContent || '';
            
            const producto = {
                name: nombre,
                price: precio,
                description: descripcion
            };
            addToCart(producto);
        });
    });

    // ---------- (Opcional) Botones en el menú listado ----------
    document.querySelectorAll('.menu-item .btn-add').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const item = this.closest('.menu-item');
            if (!item) return;
            const nombre = item.querySelector('h4')?.textContent || 'Producto';
            const precio = item.querySelector('.menu-price')?.textContent || 'S/ 0.00';
            const descripcion = item.querySelector('p')?.textContent || '';
            
            const producto = {
                name: nombre,
                price: precio,
                description: descripcion
            };
            addToCart(producto);
        });
    });

    // Actualizar badge al cargar cada página
    updateCartBadge();

    // ---------- INTERACCIÓN CON CATEGORÍAS DEL MENÚ (si existe) ----------
    const menuBtns = document.querySelectorAll('.menu-btn');
    menuBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            menuBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

});
