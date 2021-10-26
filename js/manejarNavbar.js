cargaInicialLogin();
function cargaInicialLogin() {
  let  usuarioLogeado = JSON.parse(localStorage.getItem("usuarioLogeado")) || [];// linea de codigo para popular mi array de usuarios logeados, asi despues del reload el codigo siga funcionando
    usuarioLogeado.forEach(() => {cambiarNavbar(usuarioLogeado)});
  }
  
  function cambiarNavbar(x){
    let btnLoginNavbar = document.querySelector("#linkPerfil");
    let btnRegistroNavbar = document.querySelector("#linkRegistro");
       if(x.length > 0){
           btnLoginNavbar.innerHTML = "Perfil";
           btnRegistroNavbar.classList.add("esconderElemento")
       }
    }