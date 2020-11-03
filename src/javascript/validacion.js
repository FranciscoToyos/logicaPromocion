window.addEventListener('load',() =>{

    let formP = document.getElementById('form')
    let producto = document.getElementById('producto')
    let categoria = document.getElementById('categoria')
    let precio = document.getElementById('precio')
    let descuento = document.getElementById('descuento')
    let inputs = document.querySelectorAll('.products')

    // Resetear errores
    for (let i = 0; i <inputs.length;i++){
        inputs[i].classList.remove('in-valid')
    };

    producto.addEventListener('blur', () => {
        if(producto.value.trim() == '' || producto.value.length < 2){
            document.querySelector('li.errorProducto').style.display = 'block';
        }else{
            document.querySelector('li.errorProducto').style.display = 'none';
            producto.classList.remove('in-valid');
        }
    });
    categoria.addEventListener("blur", ()=> {
        if (categoria.value.trim() == "") {
            categoria.classList.add("in-valid");
            document.querySelector("li.errorCategoria").style.display ='block';
        } else {
            document.querySelector("li.errorCategoria").style.display ='none';
            categoria.classList.remove("in-valid");
        }
    });
    cantidad.addEventListener('blur', () => {
        if (cantidad.value.trim() == '' || Number(cantidad.value)< 0 ){
            cantidad.classList.add('in-valid');
            document.querySelector('li.errorCantidad').style.display='block';
        }else{
            document.querySelector("li.errorCantidad").style.display ='none';
            precio.classList.remove("in-valid");
        
        }
    })
    precio.addEventListener("blur", ()=> {
        if (precio.value.trim() == "" || Number(precio.value) == 0) {
            precio.classList.add("in-valid");
            document.querySelector("li.errorPrecio").style.display ='block';
        } else {
            document.querySelector("li.errorPrecio").style.display ='none';
            precio.classList.remove("in-valid");
        }
    });
   descuento.addEventListener("blur", ()=> {
        if (descuento.value.trim() == "" || Number(descuento.value) > 99) {
           descuento.classList.add("in-valid");
            document.querySelector("li.errorDescuento").style.display ='block';
        } else {
            document.querySelector("li.errorDescuento").style.display ='none';
           descuento.classList.remove("in-valid");
        }
    })
    formP.addEventListener("submit", (e) => {
        // check errores, si hay errores no permite el submit
        let hasErrors = () => {
            let errores = [];
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].classList.contains('in-valid')) {
                   errores.push(true);
                } else {
                    errores.push(false);
                };
            };
            return errores;
        };
        
        if (hasErrors().includes(true)) {
            console.log(errores);
            e.preventDefault();
        };
    });
})