
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

  alert("Pago procesado correctamente");
  localStorage.removeItem("cart");
  location.href="index.html";
}

window.addEventListener("DOMContentLoaded", cargar);
