export function validarCampoRequerido(input) {
  //console.log(input)
  console.log(input.value);
  if (input.value.trim().length > 0 && input.value.trim().length >= 3) {
    console.log("el dato es correcto");
    input.className = "form-control rounded-pill border-1 is-valid";
    return true;
  } else {
    console.log("el dato es erroneo");
    input.className = "form-control rounded-pill border-1 is-invalid";
    return false;
  }
}

export function validarCodigo(input) {
  // validar con expresiones regulares
  let patron = /^[0-9]{1,5}$/;
  if (patron.test(input.value)) {
    input.className = "form-control rounded-pill border-1 is-valid";
    return true;
  } else {
    input.className = "form-control rounded-pill border-1 is-invalid";
    return false;
  }
}

export function validarUrl(input) {
  let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (
    input.value.trim() != "" &&
    patron.test(input.value.trim(input.value.trim()))
  ) {
    input.className = "form-control rounded-pill border-1 is-valid";
    return true;
  } else {
    input.className = "form-control rounded-pill border-1 is-invalid";
    return false;
  }
}

export function validarGeneral() {
  let alerta = document.querySelector("#msjAlerta");

  if (
    validarCodigo(document.querySelector("#codigo")) &&
    validarCampoRequerido(document.querySelector("#producto")) &&
    validarCampoRequerido(document.querySelector("#descripcion")) &&
    validarUrl(document.querySelector("#url")) &&
    validarPrecio(document.querySelector("#precio"))
  ) {
    console.log("validación correcta");
    alerta.className = "alert alert-danger d-none";
    return true;
  } else {
    console.log("validación erronea");
    alerta.className = "alert alert-danger";
    return false;
  }
}

export function validarPrecio(input) {
  // validar con expresiones regulares
  let patron = /^[0-9]{4,10}$/;
  if (patron.test(input.value)) {
    input.className = "form-control rounded-pill border-1 is-valid";
    return true;
  } else {
    input.className = "form-control rounded-pill border-1 is-invalid";
    return false;
  }
}
