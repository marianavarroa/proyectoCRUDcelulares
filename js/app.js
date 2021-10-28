
let productos = []; 
let usuarioLogeado = [];
let listaUsuariosGuardados = [];

cargarInicial();

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
                <a href="javascrip:;" onclick="agregarProductoCarrito(${itemProducto.codigo})"><i class="fas fa-shopping-cart"></i></a>
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
    window.alert("Producto agregado al carrito");
}