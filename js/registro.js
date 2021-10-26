import { Usuario } from "./usuarioClass.js";
//import { validarCampoRequerido } from "./validaciones.js";

let campoNombreUsuario = document.querySelector("#campoNombreUsuario");
let campoEmailUsuario = document.querySelector("#campoEmailUsuario");
let campoPasswordUsuario = document.querySelector("#campoPasswordUsuario");
let formRegistro = document.querySelector("#formRegistro");
export let listaUsuariosGuardados = [];
let parrafo = document.querySelector('#parrafo');
let errores = "";
redireccionarLogeado();
cargaInicial();

campoNombreUsuario.addEventListener("blur", () => {
  validarCampoRequerido(campoNombreUsuario);
});
campoEmailUsuario.addEventListener("blur", () => {
  validarCampoRequerido(campoEmailUsuario), validarEmail(campoEmailUsuario);
});
campoPasswordUsuario.addEventListener("blur", () => {
  validarCampoRequerido(campoPasswordUsuario);
});
formRegistro.addEventListener("submit", cargarArray);

function validarCampoRequerido(input) {
  //console.log(input)
  console.log(input.value);
  if (input.value.trim().length > 0 && input.value.trim().length >= 3) {
    console.log("el dato es correcto");
    input.className = "form-control border-1 is-valid";
    return true;
  } else {
    console.log("el dato es erroneo");
    input.className = "form-control border-1 is-invalid";
    return false;
  }
}
// funciones de validaciones propias de la pagina de registro
//esta funcion de encarga de validar si el imput es un formato de mail correto
function validarEmail(x) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x.value)) {
    x.className = "form-control  border-1 is-valid";
    return true;
  } else {
    x.className = "form-control  border-1 is-invalid";
    return false;
  }
}
//esta funcion de encarga de validar si email ingresado se encuentra en uso o no
function validarEmailUsado(x) {
  let a = listaUsuariosGuardados.find((b) => {
    return b.email == x;
  });
  if (a != null) {
    errores = "Email se encuentra en uso <br>";
    return true;
  } else {
    return false;
  }
}

function validarNombreUsado(x) {
  let a = listaUsuariosGuardados.find((b) => {
    return b.nombre == x;
  });
  if (a != null) {
    errores = "El nombre se encuentra en uso <br>";
    return true;
  } else {
    return false;
  }
}
function mostrarError(){
    parrafo.innerHTML = errores;
}
function reinicioMostrarError(){
   
}

function cargarArray(e) {
  e.preventDefault();
  if (
    validarCampoRequerido(campoNombreUsuario) &&
    validarCampoRequerido(campoEmailUsuario) &&
    validarCampoRequerido(campoPasswordUsuario)
  ) {
    if (validarEmailUsado(campoEmailUsuario.value)) {
        mostrarError();
      campoEmailUsuario.className = "form-control  border-1 is-invalid";
    } else {
      if (validarNombreUsado(campoNombreUsuario.value)) {
        campoNombreUsuario.className = "form-control  border-1 is-invalid";
        mostrarError();
      } else {
        let nuevoUsuario = new Usuario(
          campoNombreUsuario.value,
          campoEmailUsuario.value,
          campoPasswordUsuario.value
        );
        listaUsuariosGuardados.push(nuevoUsuario);
        localStorage.setItem(
          "listaUsuarios",
          JSON.stringify(listaUsuariosGuardados)
        );
        location.reload();
      }
    }
  } else {
    console.log("creacion de usuario erronea");
  }
}

function cargaInicial() {
    listaUsuariosGuardados = JSON.parse(localStorage.getItem("listaUsuarios")) || [];
  }
//funcion para redireccionar al archito login HTML si se ingresa al registro.html por su direccion cuando el usuario esta logeado
function redireccionarLogeado(){
  let  usuarioLogeado = JSON.parse(localStorage.getItem("usuarioLogeado")) || [];// linea de codigo para popular mi array de usuarios logeados, asi despues del reload el codigo siga funcionando
  if(usuarioLogeado.length > 0){
    console.log("CAPO YA ESTAS LOGEADO QUE ESTAS HACIENDO");
    location.href = 'login.html';
}
}