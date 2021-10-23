class Celular {
    constructor(modelo, precio, caracteristicas) {
        this.modelo = modelo;
        this.precio = precio;
        this.caracteristicas = caracteristicas;
    }
}

let celularIphone = new Celular('Iphone XR', 119.999);
console.log(celularIphone);
document.getElementById("celular1n").innerHTML = celularIphone.modelo;
document.getElementById("celular1p").innerHTML = "$" + celularIphone.precio;


let celularMotorola = new Celular('Moto E 20', 20.999);
console.log(celularMotorola);
document.getElementById("celular2n").innerHTML = celularMotorola.modelo;
document.getElementById("celular2p").innerHTML = "$" + celularMotorola.precio;