//**************************************************** ALERTA PIOLITA

swal({
    title: "Bienvenidos",
    text: "Somos entradas flash para que te saques la manija RAPIDO",
    icon: "info",
    button: "ingresar a la tienda"
})

//**************************************************** PASO LOS ID DE HTML A JS

const shopContent = document.getElementById ("shopContent");
const verCarrito = document.getElementById ("vercarrito");
const modalContainer = document.getElementById ("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

//*************************************************** ARRAY DE PRODUCTOS

const productos = [ 
    //eventos
    {
        id: 1,
        nombre: "hernan cattaneo",
        imagen: "./assets/hernancattaneo.jpg",
        precio: 9500,
        cantidad: 1,
    },
    {   
        id: 2,
        nombre: "hot since 82",
        imagen: "./assets/hotsince.jpg",
        precio: 6500,
        cantidad: 1,
    },
    {
        id: 3,
        nombre: "nick warren",
        imagen: "./assets/nickwarren.jpg",
        precio: 8000,
        cantidad: 1,
    },
    {   
        id: 4,
        nombre:"solomun",
        imagen: "./assets/Solomun.png",
        precio: 10000,
        cantidad: 1,
    }
]

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//*************************************************** RECORRE EL ARRAY
productos.forEach((product)=> { 
    let content = document.createElement("div");
    content.className = "card"
    content.innerHTML = `
    <img src="${product.imagen}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} $ </p>
    `

    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar"
    
    content.append(comprar);

    //*********************************************** AGREGAMOS DOM

    comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

    if(repeat){
        carrito.map((prod) => {
            if(prod.id === product.id){
                prod.cantidad++;
            }
        })
    }else{
        carrito.push({
            id: product.id,
            imagen: product.imagen,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: product.cantidad,
        })
    }
        console.log(carrito);
        carritoCounter();
        saveLocal()
    })
});

//***************************************************** AGREGA PRODUC AL CARRITO Y LO MUESTRA

const pintarCarrito = () =>{

    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class= "modal-header-title" >Carrito</h1>
    `;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText = "x";
    modalButton.className = "modal-header-button";
    
    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none"
    } );

    modalHeader.append(modalButton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
        <img src="${product.imagen}">
        <h3>${product.nombre}</h3>
        <p>${product.precio} $ </p>
        <span class="restar"> - </span>
        <p>cantidad: ${product.cantidad}</p>
        <span class="sumar"> + </span>
        <p>total: ${product.cantidad * product.precio}</p>
        `;

        modalContainer.append(carritoContent);

        let eliminar = document.createElement("span");
        eliminar.innerText = "❌";
        eliminar.className ="delete-product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarProducto)
    })
    
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuying = document.createElement ("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `total a pagar: ${total} $ `;
    modalContainer.append(totalBuying);
}

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = () => {
    const foundId = carrito.find((Element) => Element.id);
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoCounter();
    saveLocal();
    pintarCarrito();
};

const carritoCounter = () =>{
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))
};

carritoCounter()

const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//*************************************************** Asincronía y promesas

// ME LEE EL CONTADOR AL FINAL DEL BODY Y yo QUIERO QUE APAREZCA ARRIBA
let contador = 0
const intervalo = setInterval(()=>{
    contador++
        let datos = document.createElement("h3")
        datos.innerHTML = `tiempo de procesar de pago ${contador}`
        document.body.appendChild(datos)
        if(contador >=10){
            clearInterval(intervalo)
            let fin = document.createElement("h3")
            fin.innerHTML = `fin de la compra`
            document.body.appendChild(fin)
        }
}, 1000)

//************************************************ ajax y fetch

let lista = document.getElementById("lista")

fetch(`https://jsonplaceholder.typicode.com/users`)
    .then((resp) => resp.json())
    .then((data) => {
        data.forEach( info =>{
            const datosAMostrar = document.createElement("li")
            datosAMostrar.innerHTML = `
            <h3>${info.name}</h3>
            <h5>${info.email}</h5>
            <p>${info.phone}</p>
            <p>${info.website}</p>
            `
            lista.appendChild(datosAMostrar)
        })
    })
    .catch((err) => console.log("error inesperado, decime que paso", err))