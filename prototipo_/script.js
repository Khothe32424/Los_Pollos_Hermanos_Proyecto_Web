
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();

    const btnHeader = document.getElementById('btn-header-pedir');
    if (btnHeader) {
        btnHeader.addEventListener('click', () => {
            window.location.href = 'carrito.html';
        });
    }

    // Promociones
    document.querySelectorAll('.promo-card .btn-add').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.promo-card');
            const name = card.querySelector('h3')?.textContent.trim() || 'Producto';
            const description = card.querySelector('p')?.textContent.trim() || '';
            const priceText = card.querySelector('.price')?.textContent || 'S/ 0.00';
            addToCart({
                name,
                description,
                price: parsePrice(priceText),
                quantity: 1
            });
        });
    });

    // Categorías del menú
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderMenu(btn.textContent.trim());
        });
    });

    renderMenu('Pollos');
});

function parsePrice(value) {
    if (typeof value === 'number') return value;
    return parseFloat(String(value || '0')
        .replace('S/', '')
        .replace(/\s/g, '')
        .replace(',', '.')) || 0;
}

function getCart() {
    try {
        const data = JSON.parse(localStorage.getItem('cart'));
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function addToCart(product) {
    const cart = getCart();
    cart.push({
        name: product.name,
        description: product.description || '',
        price: parsePrice(product.price),
        quantity: product.quantity || 1
    });
    saveCart(cart);
    alert('✅ ' + product.name + ' añadido al carrito');
}

function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    if (badge) badge.textContent = getCart().length;
}

const menuData = {
    Pollos: [
        {name:'Pollo entero a la brasa', description:'Pollo entero con papas fritas, ensalada y cremas.', price:58, image:'img_menu/pollo_entero.svg'},
        {name:'1/2 Pollo a la brasa', description:'Medio pollo con papas fritas, ensalada y cremas.', price:32, image:'img_menu/medio_pollo.svg'},
        {name:'1/4 Pollo a la brasa', description:'Cuarto de pollo con papas fritas, ensalada y cremas.', price:20, image:'img_menu/cuarto_pollo.svg'},
        {name:'Combo familiar', description:'Pollo entero, papas familiares, ensalada y gaseosa 1.5 L.', price:75, image:'img_menu/combo_familiar.svg'},
        {name:'Combo pareja', description:'1/2 pollo, papas y 2 bebidas personales.', price:42, image:'img_menu/combo_pareja.svg'}
    ],
    Parrillas: [
        {name:'Parrilla familiar', description:'Carnes variadas a la parrilla con papas y ensalada.', price:85, image:'img_menu/parrilla_familiar.svg'},
        {name:'Parrilla personal', description:'Carne a la parrilla con papas y ensalada.', price:38, image:'img_menu/parrilla_personal.svg'},
        {name:'Anticuchos', description:'Anticuchos con papas doradas y cremas.', price:25, image:'img_menu/anticuchos.svg'},
        {name:'Churrasco', description:'Churrasco a la parrilla con papas fritas.', price:45, image:'img_menu/churrasco.svg'},
        {name:'Costillas BBQ', description:'Costillas bañadas en salsa BBQ con papas.', price:48, image:'img_menu/costillas.svg'}
    ],
    Piqueos: [
        {name:'Salchipapa clásica', description:'Papas fritas con hot dog y cremas.', price:15, image:'img_menu/salchipapa.svg'},
        {name:'Salchipapa especial', description:'Papas, hot dog, pollo, queso y huevo.', price:24, image:'img_menu/salchipapa_especial.svg'},
        {name:'Alitas BBQ', description:'Alitas crocantes bañadas en salsa BBQ.', price:28, image:'img_menu/alitas.svg'},
        {name:'Tequeños', description:'Tequeños dorados acompañados de salsa de la casa.', price:18, image:'img_menu/tequenos.svg'},
        {name:'Nuggets de pollo', description:'Nuggets de pollo con papas fritas.', price:22, image:'img_menu/nuggets.svg'}
    ],
    Bebidas: [
        {name:'Inca Kola personal', description:'Gaseosa Inca Kola personal bien helada.', price:5, image:'img_menu/inka.svg'},
        {name:'Coca Cola 1.5L', description:'Gaseosa Coca Cola familiar de 1.5 L.', price:8, image:'img_menu/coca.svg'},
        {name:'Chicha morada', description:'Chicha morada tradicional de la casa.', price:12, image:'img_menu/chicha.svg'},
        {name:'Maracuyá frozen', description:'Bebida frozen de maracuyá.', price:10, image:'img_menu/maracuya.svg'},
        {name:'Limonada frozen', description:'Limonada frozen refrescante.', price:10, image:'img_menu/limonada.svg'}
    ]
};

function renderMenu(category) {
    const container = document.getElementById('menu-list');
    if (!container || !menuData[category]) return;

    container.innerHTML = menuData[category].map((p, index) => `
        <div class="menu-product-card">
            <img src="${p.image}" alt="${p.name}">
            <div class="card-body">
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <span class="price">S/ ${p.price.toFixed(2)}</span>
                <button class="btn-add menu-add-btn" data-category="${category}" data-index="${index}">
                    Añadir al carrito
                </button>
            </div>
        </div>
    `).join('');

    container.querySelectorAll('.menu-add-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const product = menuData[btn.dataset.category][Number(btn.dataset.index)];
            addToCart(product);
        });
    });
}
