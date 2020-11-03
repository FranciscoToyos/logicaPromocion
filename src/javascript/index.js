window.addEventListener("load", () => {
  // Llamo a la key del local
  let localStorageKey = "gestor";

  // Funcion cargar
  cargarTabla();

  let btn = document.querySelector("#btn-add");
  btn.addEventListener("click", () => {
    //  Llamar cada input

    let producto = document.querySelector("#producto");
    let categoria = document.querySelector("#categoria");
    let cantidad = document.querySelector("#cantidad");
    let precio = document.querySelector("#precio");
    let descuento = document.querySelector("#descuento");
    let subTotal = document.querySelector("#subTotal");

    // Validar, no deja avanzar
    if(producto.value.length === 0 || !parseInt(precio.value)) return;
    //  Armar objeto
    const productos = {
      producto: producto.value,
      categoria: categoria.value,
      cantidad: cantidad.value,
      precio: precio.value,
      descuento: descuento.value,
      subTotal:
        (precio.value - (precio.value * descuento.value) / 100) *
        cantidad.value,
    };
    console.log(productos);
    // Limpiar objeto
    (producto.value = ""),
      (categoria.value = ""),
      (cantidad.value = ""),
      (precio.value = ""),
      (descuento.value = ""),
      (subTotal.value = "");

    // Invoco a la funcion adjuntar productos
    adjuntar(productos);
  });
  let selected = -1;
  // Funcion Adjuntar objeto en local
  function adjuntar(objeto) {
    let productos = [],
      objetoLocal = localStorage.getItem(localStorageKey);
    if (objetoLocal !== null) {
      productos = JSON.parse(objetoLocal);
    }
    if(selected === -1){
      productos.push(objeto);
    }else{
      productos.splice(selected,1,objeto)
    }
    
    localStorage.setItem(localStorageKey, JSON.stringify(productos));
    cargarTabla();
    location.reload()
  }
  // Funcion Mostrar en tabla
  function cargarTabla() {
    let productos = [],
      objetoLocal = localStorage.getItem(localStorageKey);
    let tablaBody = document.querySelector("#grid tbody");
    if (objetoLocal !== null) {
      productos = JSON.parse(objetoLocal);
    }
    // Escribo TR en la tabla valido campo vacio
    tablaBody.innerHTML = "";

    // Escribir las filas en la tabla
    productos.forEach(function (x, i) {
      // Creo el TR de la tabla
      let tr = document.createElement("tr");

      // Creo el TD de cada elemento
      let tdId = document.createElement("td");
      let tdProducto = document.createElement("td");
      let tdCategoria = document.createElement("td");
      let tdCantidad = document.createElement("td");
      let tdPrecio = document.createElement("td");
      let tdDescuento = document.createElement("td");
      let tdSubTotal = document.createElement("td");

      // Creo las filas de eliminar y actualizar
      let tdEliminar = document.createElement("td");
      let tdActualizar = document.createElement("td");

      //  Creo los botones de eliminar y actualizar
      let btnEliminar = document.createElement("button");
      let btnActualizar = document.createElement("button");

      // Renderizar en tabla de productos
      (tdId.innerHTML = `${[i]}`),
        (tdProducto.innerHTML = `${x.producto}`),
        (tdCategoria.innerHTML = `${x.categoria}`),
        (tdCantidad.innerHTML = `${x.cantidad}`),
        (tdPrecio.innerHTML = `$ ${x.precio}`),
        (tdDescuento.innerHTML = ` ${x.descuento}%`),
        (tdSubTotal.innerHTML = `$ ${
          (x.precio - (x.precio * x.descuento) / 100) * x.cantidad
        }`);

      // Boton Eliminar
      btnEliminar.textContent = "Eliminar";
      btnEliminar.className = "btn btn-sm btn-danger";
      btnEliminar.addEventListener("click", () => {
        if (confirm("¿Está seguro eliminar este articulo?")) {
          eliminar(i);
          location.reload();
        } else {
          cargarTabla(i);
        }
      });

      // Boton Editar
      btnActualizar.textContent = "Editar";
      btnActualizar.className = "btn btn-sm btn-primary";
      btnActualizar.addEventListener("click", () => {
        if (confirm("¿Quéres modificar este campo?")) {
          editar(i); 
        } else {
          cargarTabla(i);
        }
      });

      //  Inserto nuevo nodo en cada iteracion(botones)
      tdActualizar.appendChild(btnActualizar);
      tdEliminar.appendChild(btnEliminar);

      // Inserto nuevo nodo en cada iteracion(tabla)
      tr.appendChild(tdId);
      tr.appendChild(tdProducto);
      tr.appendChild(tdCategoria);
      tr.appendChild(tdCantidad);
      tr.appendChild(tdPrecio);
      tr.appendChild(tdDescuento);
      tr.appendChild(tdSubTotal);

      // Inserto nodo en cada iteracion al TR de eliminar y Actualizar
      tr.appendChild(tdEliminar);
      tr.appendChild(tdActualizar);

      // Creo el TR en la tabla principal
      tablaBody.appendChild(tr);
    });
  }
  // Total del stock

  // Llamo al local
  let productos = [],
  objetoLocal = localStorage.getItem(localStorageKey);
  productos = JSON.parse(objetoLocal);
  // Sumo los values del subtotal
  let totalValue = productos.reduce(function(acum, value) {
    return acum + value.subTotal;
  }, 0);
  // Llamo al campo total(div)
  let total = document.getElementById("tot");
  // Renderizo en pagina
  total.innerHTML = `<h3>Total Stock:\n$${totalValue}</h3>`;

  // Eliminar producto
  function eliminar(index) {
    productos.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(productos));
    cargarTabla();
  }

  // Filtro por categorias

  // Llamo al boton y al mensaje
  let bton = document.querySelectorAll("#modal");
  let mensaje = document.getElementById("filtrado");
  let filtro = [];
  // cuando cierro modal se recarga la pagina
  $("#exampleModal").on("hidden.bs.modal", function () {
    location.reload();
  });
  // Click botones filtro para mostrar en modal
  for (let botones of bton) {
    botones.addEventListener("click", () => {
      // console.log(botones);
      filtro = productos.filter((p) => p.categoria == botones.value);
      for (let producto of filtro) {
        mensaje.innerHTML += `<tr>
         <td>${producto.producto}</td>
         <td>${producto.categoria}</td>
         <td>${producto.cantidad}</td>
         <td>$ ${producto.precio}</td>
         <td>${producto.descuento} %</td>
         <td>$ ${
           (producto.precio - (producto.precio * producto.descuento) / 100) *
           producto.cantidad
         }</td>
        </tr>`;
      }
    });
  }

  // Funcion editar
  
  
  function editar(index){
    selected=index
    productos = JSON.parse(objetoLocal);
    let prod = productos[index]
    document.getElementById("producto").value = prod.producto;
    document.getElementById("categoria").value = prod.categoria;
    document.getElementById("cantidad").value = prod.cantidad;
    document.getElementById("precio").value = prod.precio;
    document.getElementById("descuento").value = prod.descuento;
  }
});
