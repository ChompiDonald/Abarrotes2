// Variables
const baseDeDatos = [{
        id: 1,
        nombre: 'Avena',
        precio: 24.00,
    },
    {
        id: 2,
        nombre: 'Pan Bimbo',
        precio: 35.00,
    },
    {
        id: 3,
        nombre: 'Huevo',
        precio: 4.50,
    },
    {
        id: 4,
        nombre: 'Coca Cola',
        precio: 20.00,
    },
    {
        id: 5,
        nombre: 'Arroz',
        precio: 20.00,
    },
    {
        id: 6,
        nombre: 'Tomate',
        precio: 12.00,
    },
    {
        id: 7,
        nombre: 'Galletas',
        precio: 50.00,
    },
    {
        id: 8,
        nombre: 'Pollo',
        precio: 39.00,
    },
    {
        id: 9,
        nombre: 'Manzana',
        precio: 80.60,
    },
    {
        id: 10,
        nombre: 'Frijoles',
        precio: 18.00,
    },
  
  

];

let carrito = [];
let total = 0;
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMbotonPagar = document.querySelector('#boton-pagar');
const DOMbotonCancelar = document.querySelector('#boton-cancelar');

function renderizarProductos() {
    baseDeDatos.forEach((info) => {
       
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-3');
        
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
    
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;

       
        const Precio = document.createElement('p');
        Precio.classList.add('card-text');
        Precio.textContent = 'C$' + info.precio;
  
        const Boton = document.createElement('button');
        Boton.classList.add('btn-primary');
        Boton.textContent = 'Agregar';
        Boton.setAttribute('marcador', info.id);
        Boton.addEventListener('click', anyadirProductoAlCarrito);
     

        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(Precio);
        miNodoCardBody.appendChild(Boton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}


function anyadirProductoAlCarrito(evento) {
  
    carrito.push(evento.target.getAttribute('marcador'))
    
    calcularTotal();
   
    renderizarCarrito();

}

function renderizarCarrito() {

    DOMcarrito.textContent = '';

    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {
   
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
        
            return itemBaseDatos.id === parseInt(item);
        });
       
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
          
            return itemId === item ? total += 1 : total;
        }, 0);
      
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}C$`;

        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);

        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
}



function borrarItemCarrito(evento) {

    const id = evento.target.dataset.item;

    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });

    renderizarCarrito();
 
    calcularTotal();
}

function calcularTotal() {

    total = 0;

    carrito.forEach((item) => {
   
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        total = total + miItem[0].precio;
    });

    DOMtotal.textContent = total.toFixed(2);
}


function vaciarCarrito() {

    carrito = [];

    renderizarCarrito();
    calcularTotal();
}


function obtenerPago() {
    const DOMbotonPagar = document.querySelector('#total-final');
    DOMbotonPagar.textContent = DOMtotal.textContent;
}

function finalizarPago() {
    const DOMbotonPagar = document.querySelector('#total-final');
    DOMbotonPagar.textContent = DOMtotal.textContent;
}


function Pago(){
    const DOMInputPagar = document.querySelector('#total-final');
    const DOMInputAPagar = document.getElementById('pagar');
    const DOMInputCambio = document.querySelector('#cambio');
    DOMInputCambio.textContent = (DOMInputAPagar.value - DOMInputPagar.textContent  ).toFixed(2);
    
    
    
}

/*function Cambio(){
    var importe=DOMInputCambio;
 
    
    // Indicamos todas las monedas posibles
    var monedas=Array(500, 200, 100, 50, 20, 10, 5, 1, 0.50, 0.25);
     
    // Creaxmos un arreglo con la misma cantidad de monedas.
    // Este arriglo contendra las monedas a devolver.
    var cambio=Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
     
    // Recorremos todas las monedas.
    for(var i=0; i<monedas.length; i++)
    {
        // Si el importe actual, es superior a la moneda.
        if(importe>=monedas[i])
        {
            // Obtenemos cantidad de monedas.
            cambio[i]=parseInt(importe/monedas[i]);
            // Actualizamos el valor del importe que nos queda por didivir.
            importe=(importe-(cambio[i]*monedas[i])).toFixed(2);
        }
    }
     
    // Bucle para mostrar el resultado.
    for(i=0; i<monedas.length; i++)
    {
        if(cambio[i]>0)
        {
            if(monedas[i]>=5){
                CambioBilletes =(cambio[i]+" billete(s) de: "+monedas[i]+" Córdobas <br>");
            }
            else{
                if(monedas[i]>=1){
                    CambioBilletes =(cambio[i]+" moneda(s) de: "+monedas[i]+" Córdoba <br>");
                }
                else{
                    CambioBilletes =(cambio[i]+" moneda(s) de: "+monedas[i]+" Centavos de Córdoba <br>");
                }
            }
        }
    }
}
*/


/*function Desglozar() {  
    var CambioBillete,   DOMInputCambio = 0;
    var B500 = 0, B200 = 0, B100 = 0, B50 = 0, B20 = 0,B10 = 0, B5 = 0, B1 = 0;

    CambioBillete = document.getElementById("").value;  

    DOMInputCambio  = CambioBillete - DOMInputPagar;

    while (cambio != 0)
    {
        if (cambio >= 500)
        {
            B500++;
            cambio -= 500;
        }

        else if (cambio >= 200)
        {
            B200++;
            cambio -= 200;
        }

        else if (cambio >= 100)
        {
            B100++;
            cambio -= 100;
        }
        else if (cambio >= 50)
        {
            B50++;
            cambio -= 50;
        }
        else if (cambio >= 20)
        {
            B20++;
            cambio -= 20;
        }
        else if (cambio >= 10)
        {
            B10++;
            cambio -= 10;
        }
        else if (cambio >= 5)
        {
            B5++;
            cambio -= 5;
        }
        else if (cambio >= 1)
        {
            B1++;
            cambio -= 1;
        }
    }
}
*/


DOMbotonVaciar.addEventListener('click', vaciarCarrito);
DOMbotonPagar.addEventListener('click', obtenerPago);
DOMbotonCancelar.addEventListener('click',Pago);

renderizarProductos();


