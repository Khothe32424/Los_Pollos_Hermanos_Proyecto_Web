
const cart = JSON.parse(localStorage.getItem("cart")) || [];

function precioNumero(valor) {
  if (typeof valor === "number") return valor;
  return parseFloat(String(valor || "0")
    .replace("S/", "")
    .replace(/\s/g, "")
    .replace(",", ".")) || 0;
}

function cargar() {
  const div = document.getElementById("productos");
  let total = 0;
  div.innerHTML = "";

  cart.forEach(item => {
    const precio = precioNumero(item.price);
    total += precio;
    div.innerHTML += `
      <div class="producto-resumen">
        <span>${item.name || "Producto"}</span>
        <strong>S/ ${precio.toFixed(2)}</strong>
      </div>`;
  });

  // El checkout muestra EXACTAMENTE el mismo total calculado en carrito.html.
  document.getElementById("subtotal").innerText = total.toFixed(2);
  document.getElementById("total").innerText = total.toFixed(2);

  const envio = document.getElementById("envio");
  if (envio) envio.innerText = "Incluido";
}

function mostrarPago(tipo){
  const d=document.getElementById("detallePago");
  const total=document.getElementById("total").innerText;
  if(tipo=="yape") d.innerHTML=`<h3>Escanea Yape</h3><img class="qr" src="yape_qr.png"><p>Monto a pagar: <strong>S/ ${total}</strong></p>`;
  if(tipo=="plin") d.innerHTML=`<h3>Escanea Plin</h3><img class="qr" src="plin_qr.png"><p>Monto a pagar: <strong>S/ ${total}</strong></p>`;
  if(tipo=="efectivo") d.innerHTML=`<h3>Código PagoEfectivo</h3><input value="PE123456789" readonly><p>Monto: <strong>S/ ${total}</strong></p>`;
  if(tipo=="tarjeta") d.innerHTML='<h3>Datos de tarjeta</h3><input id="num" inputmode="numeric" maxlength="19" placeholder="Número de tarjeta"><input id="nom" placeholder="Nombre del titular"><input id="cvv" inputmode="numeric" maxlength="4" placeholder="CVV" type="password"><input id="fecha" maxlength="5" placeholder="MM/AA">';
  if(tipo=="contra") d.innerHTML=`<p>Pago al recibir el pedido. Total: <strong>S/ ${total}</strong></p>`;
  if(tipo=="banco") d.innerHTML=`<p>Transferencia bancaria. Monto: <strong>S/ ${total}</strong></p><p>BCP / Interbank / BBVA / Scotiabank</p>`;
}

function confirmarPago(){
  const m=document.querySelector('input[name=pago]:checked');
  if(!m){ alert("Seleccione un método"); return; }

  if(m.value=="tarjeta"){
    const n=(document.getElementById("num")?.value || "").replace(/\s/g,"");
    const nom=(document.getElementById("nom")?.value || "").trim();
    const cvv=document.getElementById("cvv")?.value || "";
    const fecha=document.getElementById("fecha")?.value || "";
    if(!/^\d{13,19}$/.test(n)){ alert("Número de tarjeta inválido"); return; }
    if(nom.length < 3){ alert("Ingrese el nombre del titular"); return; }
    if(!/^\d{3,4}$/.test(cvv)){ alert("CVV inválido"); return; }
    if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(fecha)){ alert("Fecha inválida. Use MM/AA"); return; }
  }

  mostrarCompraExitosa();
  localStorage.removeItem("cart");
}

window.addEventListener("DOMContentLoaded", cargar);


function mostrarCompraExitosa(){
  const total=document.getElementById("total").innerText;
  document.querySelector("main").innerHTML = `
    <section class="compra-exitosa">
      <div class="icono-exito">✓</div>
      <h1>¡Compra exitosa!</h1>
      <p>Tu pedido fue registrado correctamente.</p>
      <p class="monto">Total pagado: <strong>S/ ${total}</strong></p>
      <div class="acciones-exito">
        <button onclick="generarBoleta()">📄 Generar boleta PDF</button>
        <button onclick="seguirComprando()">🍗 Seguir comprando</button>
      </div>
    </section>`;
}

function seguirComprando(){
  location.href="index.html";
}

function generarBoleta(){
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const cartActual = JSON.parse(localStorage.getItem("cart") || "[]");
  const total = document.querySelector(".monto strong")?.innerText || "S/ 0.00";

  let productos = cartActual.map(p => 
    `<tr><td>${p.name || "Producto"}</td><td>${p.price || ""}</td></tr>`
  ).join("");

  const fecha = new Date().toLocaleDateString();

  const ventana = window.open("", "_blank");
  ventana.document.write(`
  <html>
  <head>
  <title>Boleta Pollos Hermanos</title>
  <style>
    body{font-family:Arial;padding:30px;color:#222}
    .boleta{width:380px;margin:auto;border:2px solid #d71948;padding:20px;border-radius:10px}
    img{width:120px;display:block;margin:auto}
    h1{text-align:center;color:#d71948}
    table{width:100%;border-collapse:collapse;margin-top:15px}
    td{border-bottom:1px solid #ddd;padding:8px}
    .total{font-size:20px;font-weight:bold;color:#d71948}
    .center{text-align:center}
  </style>
  </head>
  <body>
  <div class="boleta">
    <img src="logo_pollos_hermanos.png">
    <h1>POLLOS HERMANOS</h1>
    <p class="center">Pollos a la brasa<br>Santa Clara, Perú</p>
    <hr>
    <p><b>Fecha:</b> ${fecha}</p>
    <p><b>Cliente:</b> ${usuario.apodo || usuario.nombre || "Cliente"}</p>
    <p><b>Dirección:</b> ${usuario.dir || "No registrada"}</p>
    <p><b>Teléfono:</b> ${usuario.tel || "No registrado"}</p>
    <h3>Detalle del pedido</h3>
    <table>${productos}</table>
    <p class="total">TOTAL: ${total}</p>
    <hr>
    <p class="center">
      Gracias por su compra<br>
      Reclamos y consultas:<br>
      📞 999 999 999
    </p>
  </div>
  <script>window.print();</script>
  </body>
  </html>`);
  ventana.document.close();
}
