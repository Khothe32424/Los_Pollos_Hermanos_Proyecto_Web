# Los Pollos Hermanos - Sistema Web de Pedidos Online

## Descripción del Proyecto

Los Pollos Hermanos es una aplicación web desarrollada para una pollería, cuyo objetivo es ofrecer una plataforma digital donde los clientes puedan visualizar productos, realizar pedidos y gestionar sus compras de manera rápida y sencilla.

El sistema permite consultar el menú, visualizar promociones, agregar productos al carrito, registrarse como usuario, iniciar sesión y realizar pagos mediante diferentes métodos disponibles.

Este proyecto fue desarrollado como un prototipo funcional de comercio electrónico orientado a la venta de productos gastronómicos.

---

# Características Principales

## Página Principal

La página principal presenta la identidad visual del negocio e incluye:

- Banner principal con imagen representativa de la pollería.
- Información general del establecimiento.
- Acceso a las diferentes secciones del sistema:
  - Inicio.
  - Promociones.
  - Menú.
  - Nosotros.
  - Contacto.
  - Carrito.
  - Cuenta de usuario.

---

# Menú de Productos

El sistema cuenta con un catálogo organizado por categorías:

## Pollos

Productos disponibles:

- Pollo entero a la brasa.
- Medio pollo a la brasa.
- Cuarto de pollo a la brasa.
- Combo familiar.
- Combo pareja.

## Parrillas

Productos disponibles:

- Parrilla familiar.
- Parrilla personal.
- Anticuchos.
- Churrasco.
- Costillas BBQ.

## Piqueos

Productos disponibles:

- Salchipapa clásica.
- Salchipapa especial.
- Alitas BBQ.
- Tequeños.
- Nuggets de pollo.

## Bebidas

Productos disponibles:

- Inca Kola.
- Coca Cola.
- Chicha morada.
- Maracuyá frozen.
- Limonada frozen.

Cada producto cuenta con:

- Imagen representativa.
- Nombre del producto.
- Descripción.
- Precio.
- Opción para agregar al carrito.

---

# Carrito de Compras

El módulo de carrito permite:

- Agregar productos seleccionados.
- Visualizar los productos añadidos.
- Mostrar cantidades.
- Calcular el monto total.
- Eliminar productos.
- Continuar con el proceso de compra.

---

# Registro e Inicio de Sesión

El sistema incorpora un módulo de usuarios para gestionar clientes.

## Registro de Usuario

Permite registrar:

- Nombre completo.
- Correo electrónico.
- Número telefónico.
- Dirección de entrega.
- Contraseña.

## Inicio de Sesión

Permite a los usuarios acceder mediante:

- Correo electrónico.
- Contraseña.

El acceso del usuario permite continuar con el proceso de compra.

---

# Sistema de Pagos

El módulo de pago permite seleccionar diferentes métodos:

- Yape.
- Plin.
- Pago en efectivo.
- Tarjeta de crédito o débito.

Incluye:

- Resumen del pedido.
- Visualización del monto total.
- Código QR para pagos digitales.
- Validación de datos de tarjeta.

---

# Diseño del Sistema

El diseño fue desarrollado siguiendo una identidad visual basada en los colores representativos de una pollería:

- Rojo.
- Amarillo.
- Blanco.
- Negro.

Características del diseño:

- Tarjetas de productos.
- Imágenes gastronómicas.
- Fondos personalizados.
- Interfaz adaptable.

---

# Tecnologías Utilizadas

## Frontend

- HTML5.
- CSS3.
- JavaScript.

## Almacenamiento

- LocalStorage para gestionar:

  - Información de usuarios.
  - Productos del carrito.
  - Datos temporales del pedido.

## Control de Versiones

- Git.
- GitHub.

---

# Estructura del Proyecto
Los_Pollos_Hermanos_Proyecto_Web

│
├── index.html
├── carrito.html
├── pago.html
├── login.html
├── registro.html
│
├── css
│ ├── style.css
│ └── pago.css
│
├── js
│ ├── script.js
│ └── pago.js
│
├── img
│ ├── productos
│ ├── promociones
│ └── fondos
│
└── README.md
