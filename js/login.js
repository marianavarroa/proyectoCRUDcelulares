
let usuarioIngresado = document.querySelector("#nombreUsuario");
let passwordIngresade = document.querySelector("#passwordUsuario");
let formLogin = document.querySelector("#formLogin");
let mostrarUsuario = document.querySelector("#parrafo");
let btnDeslogear = document.querySelector("#btnDeslogear");
let sectionFormLogin = document.querySelector("#sectionFormLogin");
let perfilDeUsuario = document.querySelector("#perfilDeUsuario");
let usuarioLogeado = [];
let listaUsuariosGuardados = [];
let errores = ""; //variable para mostrar los errores de login (usuario o pass)
let logeado = 1; //variable para agregar mas funcionalidad
let totalPagar = 0;
let productos = []; 

cargaInicialLogin();


formLogin.addEventListener("submit", submitLogin);
btnDeslogear.addEventListener("click", deslogeando);

export function cargaInicialLogin() {
  productos = JSON.parse(localStorage.getItem('productosKey')) || [];
  listaUsuariosGuardados = JSON.parse(localStorage.getItem("listaUsuarios")) || []; //linea de codigo para popular mi array de usuarios guardados (previamente creados con el la pagina registro) desde el localstorage
  usuarioLogeado = JSON.parse(localStorage.getItem("usuarioLogeado")) || [];// linea de codigo para popular mi array de usuarios logeados, asi despues del reload el codigo siga funcionando
  usuarioLogeado.forEach((x) => {nombreUsuario(x),cambiarNavbar(usuarioLogeado)});

}

function submitLogin(e) {
  e.preventDefault();
  validarUsuarioIngresado(usuarioIngresado.value, passwordIngresade.value);
  location.reload();
}
//funcion para encontrar el nombre de usuario en mi array de usuarios creados desde la pagina "registro", y si el usuario existe comprueva que la contrasena sea correcta
function validarUsuarioIngresado(x, y) {
  let a = listaUsuariosGuardados.find((b) => {
    if (b.nombre == x) {
      return b;
    }
  });
  if (a != null) {
    if (a.password == y) {
      logeado = 1;
      usuarioLogeado.push(a.nombre);
      localStorage.setItem("usuarioLogeado", JSON.stringify(usuarioLogeado));
    } else {
      errores = "Contrasena incorrecta<br>";
      logeado = 0;
    }
  } else {
    errores = "El Usuario no existe<br>";
    logeado = 0;
  }
}

function nombreUsuario(x) {
  // si el array usuariologeado no es null se crea el texto del parrafo con el nombre del usuario, se agrega la clase de css que oculta todo el section correspondiente al form del login
  // y al mismo tiempo remueve la clase que oculta el section correspondiente al perfil de usuario
  if (usuarioLogeado.length != null) {
    mostrarUsuario.innerHTML += `<p>Bienvenido ${x} </p>`;
    sectionFormLogin.classList.add("esconderElemento");
    perfilDeUsuario.classList.remove("esconderElemento");
    let a = listaUsuariosGuardados.find((b) => {
      return b.nombre == usuarioLogeado;
     });
     let b = a.carro;
     b.forEach((productoCarro) => {
      crearFila(productoCarro);
    });
  }else{

  }
}

function crearFila(itemProducto) {
  let tabla = document.querySelector("#tablaProductos");
  //creo la tabla
  tabla.innerHTML += `<tr>
    <th scope="row">${itemProducto.producto}</th>
    <td>${itemProducto.descripcion}</td>
    <td>$${itemProducto.precio}</td>
    <td>
      <button class="btn btn-outline-danger my-2" onclick="borrarProductoCarrito(${itemProducto.codigo})">Quitar</button>
    </td>
  </tr>`;
  totalPagar =  parseFloat(itemProducto.precio) + totalPagar;
  let mostrarTotalPagar = document.querySelector("#totalCarritoPagar");
  mostrarTotalPagar.innerHTML = `Total a pagar: ${totalPagar}`;

}
window.borrarProductoCarrito = (x) => {
  let a = listaUsuariosGuardados.find((b) => {
    return b.nombre == usuarioLogeado;
   });
 let _productos = a.carro.filter((itemProducto) => {
   return itemProducto.codigo != x;
 });
 let _productosSacar = a.carro.filter((itemProducto) => {
  return itemProducto.codigo == x;
});
 if (_productosSacar.length > 1){  
   // si el lenght del array de productos a sacar es mayor a 1 usamos la funcion .pop() para solo sacar un objeto del array, despues lo concatenamos al array de producos a consevar y asi evitamos sacar mas de un producto del carro a la vez cuando tenemos productos repetidos adentro del carrito c;
    _productosSacar.pop();
    let newArray = _productos.concat(_productosSacar);
  
    a.carro = newArray;
    localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuariosGuardados));
    location.reload();
 }else{
  // si hay solo producto con ese id en mi carro prosigo y lo saco del carro normalmente
   a.carro = _productos;
   localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuariosGuardados));
    location.reload();
 }

}

//funcion para el boton "deslogear", se encarga de remover el usuario logeado del localstorage, limpiar el array de la memoria, borrar el parrafo donde se muetra el nombre de usuario y recargar la pagina
function deslogeando() {
  localStorage.removeItem("usuarioLogeado");
  usuarioLogeado = [];
  logeado = 0;
  location.reload();
}

//funcion para cambiar el boton de login en la NAVBAR  
export function cambiarNavbar(x){
let btnLoginNavbar = document.querySelector("#linkPerfil");
let btnRegistroNavbar = document.querySelector("#linkRegistro");
   if(x.length > 0){
       btnLoginNavbar.innerHTML = "Perfil";
       btnRegistroNavbar.classList.add("esconderElemento")
   }
}