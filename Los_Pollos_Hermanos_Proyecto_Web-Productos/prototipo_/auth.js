
function getUser(){return JSON.parse(localStorage.getItem('usuario'));}
function registrar(){
 const nombre=document.getElementById('nombre').value.trim();
 const correo=document.getElementById('correo').value.trim();
 const tel=document.getElementById('telefono').value.trim();
 const dir=document.getElementById('direccion').value.trim();
 const pass=document.getElementById('password').value;
 if(!nombre||!correo||!tel||!dir||!pass){alert('Completa todos los campos');return;}
 if(!correo.includes('@')){alert('Correo no válido');return;}
 localStorage.setItem('usuario',JSON.stringify({nombre,correo,tel,dir,pass}));
 alert('Cuenta creada correctamente');
 location.href='index.html';
}
function ingresar(){
 const correo=document.getElementById('correo').value.trim();
 const pass=document.getElementById('password').value;
 const u=getUser();
 if(u && u.correo===correo && u.pass===pass){alert('Bienvenido '+u.nombre);location.href='index.html';}
 else alert('Datos incorrectos');
}
