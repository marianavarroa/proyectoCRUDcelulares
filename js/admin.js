import {
  validarCampoRequerido,
  validarCodigo,
  validarUrl,
  validarGeneral,
  validarPrecio,
} from "./validaciones.js";

import { Producto } from "./productoClass.js";

//Declaro variables
let productos = []; //agrego un array vacio para los productos
//false -> tengo que agregar un producto nuevo.
//true -> tengo que modificar un producto existente.
let productoExistente = false;
let producto = document.querySelector("#producto");
let codigo = document.querySelector("#codigo");
let url = document.querySelector("#url");
let descripcion = document.querySelector("#descripcion");
let precio = document.querySelector("#precio");
let formulario = document.querySelector("#formProducto");
let btnAgregar = document.querySelector("#btnAgregar");
let btnCargarDatosPrueba = document.querySelector("#cargaDatosPrueba");

//agrego sus eventlisteners
codigo.addEventListener("blur", () => {
  validarCodigo(codigo);
});
producto.addEventListener("blur", () => {
  validarCampoRequerido(producto);
});
descripcion.addEventListener("blur", () => {
  validarCampoRequerido(descripcion);
});
url.addEventListener("blur", () => {
  validarUrl(url);
});
precio.addEventListener("blur", () => {
  validarPrecio(precio);
});
formulario.addEventListener("submit", guardarProducto);
btnAgregar.addEventListener("click", limpiarFormulario);
btnCargarDatosPrueba.addEventListener("click", cargarDatosPrueba);

//verificar si hay datos en LocalStorage
cargaInicial();

//carga inicial de productos
function cargaInicial() {
  //si hay algo en localstorage lo llamo con getitem y si no hay nada llamamos a un array vacio
  productos = JSON.parse(localStorage.getItem("productosKey")) || [];
  //console.log(productos);

  //llamar a la función que crea filas
  productos.forEach((itemProducto) => {
    crearFila(itemProducto);
  });
}

//creo una función para guardar el producto
function guardarProducto(event) {
  event.preventDefault();
  //primero validar datos del form
  if (validarGeneral()) {
    if (productoExistente) {
      //modificar
      actualizarProducto();
    } else {
      if(validarCodigoExistente(codigo.value)){
        console.log("acá no existe");
        //agregar
        //si esta todo ok crear un nuevo producto
        agregarProducto();

      }else{
        console.log("acá existe");
        alert('El código ya está en uso.')
      }
    }
    //tengo que modificar o tengo que agregar uno nuevo?
  } else {
    console.log("aqui solo mostrar el cartel de error");
  }
}

//funcion para agregar producto
function agregarProducto() {
  let productoNuevo = new Producto(
    codigo.value,
    producto.value,
    descripcion.value,
    url.value,
    precio.value
  );
  //guardar el producto en un array
  productos.push(productoNuevo);
  //console.log(productos);
  //guardar en localstorage
  localStorage.setItem("productosKey", JSON.stringify(productos));
  //limpiar el formulario
  limpiarFormulario();
  //dibujar fila en la tabla
  crearFila(productoNuevo);
  //mostrar un mensaje al usuario
  Swal.fire(
    "Producto agregado",
    "El producto fue agregado con éxito",
    "success"
  );
}

//funcion para crear filas
function crearFila(itemProducto) {
  //traigo el nodo padre que sería el tbody
  let tabla = document.querySelector("#tablaProductos");
  //creo la tabla
  tabla.innerHTML += `<tr>
    <th scope="row">${itemProducto.codigo}</th>
    <td>${itemProducto.producto}</td>
    <td>${itemProducto.descripcion}</td>
    <td>${itemProducto.url}</td>
    <td>$${itemProducto.precio}</td>
    <td>
      <button class="btn btn-outline-dark my-2" onclick="prepararEdicionProducto(${itemProducto.codigo})">Editar</button>
      <button class="btn btn-outline-danger my-2" onclick="borrarProducto(${itemProducto.codigo})">Borrar</button>
    </td>
  </tr>`;
}

//función para limpiar formulario
function limpiarFormulario() {
  //limpia los value de los elementos del form
  formulario.reset();
  //limpiar las clases de cada elemento del form
  codigo.className = "form-control rounded-pill border-dark border-1";
  producto.className = "form-control rounded-pill border-dark border-1";
  descripcion.className = "form-control rounded-pill border-dark border-1";
  url.className = "form-control rounded-pill border-dark border-1";
  precio.className = "form-control rounded-pill border-dark border-1";
  //terminar de limpiar los inputs
  productoExistente = false;
}

//funcion invocada desde el html. (porque admin.js es tipo module)
window.prepararEdicionProducto = (codigo) => {
  //buscar el objeto en el array
  let productoEncontrado = productos.find((itemProducto) => {
    return itemProducto.codigo == codigo;
  });
  //mostrar los datos del objeto en el fomulario
  document.querySelector("#codigo").value = productoEncontrado.codigo;
  document.querySelector("#producto").value = productoEncontrado.producto;
  document.querySelector("#descripcion").value = productoEncontrado.descripcion;
  document.querySelector("#url").value = productoEncontrado.url;
  document.querySelector("#precio").value = productoEncontrado.precio;
  //cambiar el valor de la variable bandera para editar
  productoExistente = true;
};

function borrarFilas() {
  //traigo el nodo padre que sería el tbody
  let tabla = document.querySelector("#tablaProductos");
  tabla.innerHTML = "";
}

window.borrarProducto = (codigo) => {
  Swal.fire({
    title: "¿Está seguro que desea eliminar el producto?",
    text: "Este proceso no puede revertirse",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, deseo eliminarlo",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      //acá agrego el código si quiero borrar
      //op1 usar splice(indice, 1), para obtener el indice puedo usar findindex
      //op2
      let _productos = productos.filter((itemProducto) => {
        return itemProducto.codigo != codigo;
      });
      console.log(_productos);
      //actualizar el arreglo y el localStorage
      productos = _productos;
      localStorage.setItem("productosKey", JSON.stringify(productos));
      //borramos la tabla
      borrarFilas();
      //vuelvo a dibujar la tabla
      productos.forEach((itemProducto) => {
        crearFila(itemProducto);
      });
      //muestro el mensaje
      Swal.fire(
        "Producto eliminado",
        "El producto fue eliminado con éxito.",
        "success"
      );
    }
  });
};

function actualizarProducto() {
  Swal.fire({
    title: "¿Está seguro que desea editar el producto?",
    text: "No puede revertir este proceso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, deseo editarlo.",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      //acá es donde procederemos a editar
      //buscar el indice del objeto con el codigo indicado
      let indiceProducto = productos.findIndex((itemProducto) => {
        return itemProducto.codigo == codigo.value;
      });
      //actualizar los valores del objeto encontrado dentro del array
      productos[indiceProducto].producto =
        document.querySelector("#producto").value;
      productos[indiceProducto].descripcion =
        document.querySelector("#descripcion").value;
      productos[indiceProducto].url = document.querySelector("#url").value;
      productos[indiceProducto].precio = document.querySelector('#precio').value;

      console.log(productos[indiceProducto]);
      //actualizar localStorage
      localStorage.setItem("productosKey", JSON.stringify(productos));
      //actualizar la tabla
      borrarFilas();
      productos.forEach((itemProducto) => {
        crearFila(itemProducto);
      });
      //limpiar el formulario
      limpiarFormulario();
      //mostrar un mensaje que el producto fue editado
      Swal.fire(
        "Producto editado!",
        "Su producto fue editado con éxito",
        "success"
      );
    }
  });
}


function validarCodigoExistente(input) {
  let a = productos.find((b) => {
    return b.codigo == input;
  });
  console.log(a);
  if (a == null) {
    //let errores = "El nombre se encuentra en uso <br>";
    return true;
  } else {
    return false;
  }
}

function cargarDatosPrueba() {
  const datos = [
    {
      codigo: "1234",
      producto: "Samsung Galaxy S20 FE 128 GB cloud mint 6 GB RAM",
      descripcion: "Procesador Exynos 990 Octa-Core de 2.73GHz con 6GB de RAM.",
      cantidad: "1",
      url: "https://http2.mlstatic.com/D_NQ_NP_637579-MLA47860056829_102021-O.webp",
      precio: "86999",
    },
    
    {
      codigo: "5678",
      producto: "LG K61 128 GB titanio 4 GB RAM",
      cantidad: "1",
      descripcion:
        "Procesador MediaTek MT6765 Helio P35 Octa-Core de 2.3GHz con 4GB de RAM.",
      url: "https://http2.mlstatic.com/D_NQ_NP_867960-MLA46366600614_062021-O.webp",
      precio: "31999",
    },
    {
      codigo: "6789",
      producto: "Huawei Mate 10 Lite Bueno Negro Liberado. (Reacondicionado)",
      cantidad: "1",
      descripcion: "Tamaño de la pantalla: 5.9 pulgadas",
      url: "https://http2.mlstatic.com/D_NQ_NP_836368-MLA47044200655_082021-O.webp",
      precio: "29399",
    },
    {
      codigo: "7890",
      producto: "LG K52 (48 Mpx) 64 GB blue 4 GB RAM",
      cantidad: "1",
      descripcion:
        "Procesador MediaTek MT6765 Helio P35 Octa-Core de 2.3GHz con 4GB de RAM.",
      url: "https://http2.mlstatic.com/D_NQ_NP_896678-MLA47690462666_092021-O.webp",
      precio: "27999",
    },
    {
      codigo: "8909",
      producto: "Xiaomi Mi 11 Lite 5G Dual SIM 128 GB negro trufa 6 GB RAM",
      cantidad: "1",
      descripcion:
        "Procesador Snapdragon 780G Octa-Core de 2.4GHz con 6GB de RAM.",
      url: "https://http2.mlstatic.com/D_NQ_NP_622257-MLA47500407340_092021-O.webp",
      precio: "74999",
    },
    {
      codigo: "2345",
      producto: "Apple iPhone 11 (128 GB) - Negro",
      cantidad: "1",
      descripcion:
        "Sistema de dos cámaras de 12 MP (ultra gran angular y gran angular) con modo Noche, modo Retrato y video 4K de hasta 60 cps.",
      url: "https://http2.mlstatic.com/D_NQ_NP_865864-MLA46114990464_052021-O.webp",
      precio: "196050",
    },
    {
      codigo: "4567",
      producto: "Xiaomi Redmi Note 10S Dual SIM 128 GB blanco piedra 6 GB RAM",
      cantidad: "1",
      descripcion: "Memoria interna de 128GB. Apto para tarjeta SD de 512GB.",
      url: "https://http2.mlstatic.com/D_NQ_NP_777635-MLA46924539963_072021-O.webp",
      precio: "53999",
    },
    {
      codigo: "3456",
      producto: "Imagen 1 de 4 de  Moto G20 64 GB azul cielo 4 GB RAM",
      cantidad: "1",
      descripcion: "Memoria interna de 64GB. Apto para tarjeta SD de 1TB.",
      url: "https://http2.mlstatic.com/D_NQ_NP_601015-MLA47152736489_082021-O.webp",
      precio: "29999",
    },
    
  ];
  if (!localStorage.getItem("productosKey")) {
    //quiero agregar los datos de prueba
    console.log("cargarDatosPrueba");
    //actualizar el arreglo y el localStorage
    localStorage.setItem("productosKey", JSON.stringify(datos));
    productos = datos;
    //mostrarlo en la tabla
    productos.forEach((itemProducto) => {
      crearFila(itemProducto);
    });

}
}