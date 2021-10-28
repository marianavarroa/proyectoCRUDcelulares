/* // prueba con clase y objetos
class Celular {
    constructor(imagen, descripcion, caracteristicas, precio){
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

let celularIphone = new Celular ("https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-11-pro-segment-201909?wid=800&hei=600&fmt=png-alpha&qlt=80&.v=1567201566801", 'iPhone XR', 'caracteristicas', 99.999);
let celularMotorola = new Celular ("https://armoto.vteximg.com.br/arquivos/ids/160628-700-700/e20_1000x1000_envio.png?v=637703607859800000", 'Moto E20', 'caracteristicas', 39.999);
let celularSamsung = new Celular ("https://images.samsung.com/is/image/samsung/ar-galaxy-s20-fe-g780-sm-g780fzblaro-lcloudnavy-thumb-308700595?$216_216_PNG$", 'Samsung G20', 'caracteristicas', 89.999);

*/
let productos = []; 
let usuarioLogeado = [];
let listaUsuariosGuardados = [];

cargarInicial();

// localstorage

function cargarInicial() {
    listaUsuariosGuardados = JSON.parse(localStorage.getItem("listaUsuarios")) || [];
    usuarioLogeado = JSON.parse(localStorage.getItem("usuarioLogeado")) || [];
    productos = JSON.parse(localStorage.getItem('productosKey')) || [];
    // si hay datos dentro del arreglo dibujo las columnas con cards
    if (productos.length > 0) {
       
        // aqui dibujo las cards o columnas
        productos.forEach(itemProducto => {
            crearColumna(itemProducto);        
        });
    }    
    
}

function crearColumna(itemProducto) {
    let grilla = document.querySelector('#grilla');
    

    if (usuarioLogeado.length > 0) {
        grilla.innerHTML += `<div class="col col-sm-12 col-lg-3 my-5">
        <div class="card transicion1 mx-auto">
            <img src="${itemProducto.url}"
                class="card-img-top" alt="${itemProducto.producto}">
            <div class="card-body text-center transicion2">
                <h5 class="card-title" id="celular1n">${itemProducto.producto}</h5>
                <p class="card-text" id="celular1p">$${itemProducto.precio}</p>
                <a href="" onclick="agregarProductoCarrito(${itemProducto.codigo})"><i class="fas fa-shopping-cart"></i></a>
            </div>
        </div>
    </div>`
      }else{
        grilla.innerHTML += `<div class="col col-sm-12 col-lg-3 my-5">
        <div class="card transicion1 mx-auto">
            <img src="${itemProducto.url}"
                class="card-img-top" alt="${itemProducto.producto}">
            <div class="card-body text-center transicion2">
                <h5 class="card-title" id="celular1n">${itemProducto.producto}</h5>
                <p class="card-text" id="celular1p">$${itemProducto.precio}</p>
                
            </div>
        </div>
    </div>`
      }
}

function agregarProductoCarrito(x){ 
    let a = listaUsuariosGuardados.find((b) => {
       return b.nombre == usuarioLogeado;
      });
    let m = productos.find((n) =>{
        return n.codigo == x ;
    })
    a.carro.push(m);
    localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuariosGuardados));
}