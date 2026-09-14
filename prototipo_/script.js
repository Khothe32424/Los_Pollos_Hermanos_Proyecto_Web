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

    // ---------- MENÚ HAMBURGUESA (RESPONSIVE) ----------
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinksEl = document.querySelector('.nav-links');
    const navOverlay = document.getElementById('navOverlay');

    function closeMobileMenu() {
        if (!hamburgerBtn || !navLinksEl) return;
        hamburgerBtn.classList.remove('active');
        navLinksEl.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    function openMobileMenu() {
        if (!hamburgerBtn || !navLinksEl) return;
        hamburgerBtn.classList.add('active');
        navLinksEl.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    if (hamburgerBtn && navLinksEl) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = navLinksEl.classList.contains('active');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Cierra el menú al hacer clic en cualquier enlace de navegación
        navLinksEl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Cierra el menú al hacer clic en el fondo oscuro
        if (navOverlay) {
            navOverlay.addEventListener('click', closeMobileMenu);
        }

        // Si el usuario agranda la ventana y vuelve a vista de escritorio,
        // se asegura de cerrar el menú móvil para evitar estados inconsistentes
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMobileMenu();
        });
    }

});