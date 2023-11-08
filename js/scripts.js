/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 
/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
// Al cargar la página, verifica si hay datos del carrito en el localStorage y cárgalos
var cartItems ;
var cartTotal; 
var cartItemCount;
var  priceTotal; 
var quantitySpan;
var cartItem ;
var productImage;
var productInfo;
var totalPriceSpan;
var itemCount
window.addEventListener('DOMContentLoaded', event => {
    
    // // Navbar shrink function
    // var navbarShrink = function () {
    //     const navbarCollapsible = document.body.querySelector('#mainNav');
    //     if (!navbarCollapsible) {
    //         return;
    //     }
    //     if (window.scrollY === 0) {
    //         navbarCollapsible.classList.remove('navbar-shrink')
    //     } else {
    //         navbarCollapsible.classList.add('navbar-shrink')
    //     }

    // };
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
    
        // Verifica si la página actual tiene la clase "index"
        if (window.scrollY === 0 && !document.body.classList.contains('index')) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });
});

//                               ********************** YO ************************

// *************funcion para cambiar el color del boton del carrito al hacer scroll********
window.addEventListener('DOMContentLoaded', (event) => {


    // Función para cambiar el color al hacer scroll
    const changeColorOnScroll = () => {
        const botonCarrito = document.querySelector('.boton-carrito');
        const contador = document.querySelector('.contador');
         priceTotal = document.querySelector('#price-total');

        if (window.scrollY > 0) {
            botonCarrito.classList.add('scrolled');
            contador.classList.add('scrolled');
            priceTotal.classList.add('scrolled');
        } else {
            botonCarrito.classList.remove('scrolled');
            contador.classList.remove('scrolled');
            priceTotal.classList.remove('scrolled');
        }
    };

    // Llama a la función para establecer los estilos iniciales
    changeColorOnScroll();

    // Agrega un event listener para el evento scroll
    window.addEventListener('scroll', changeColorOnScroll);

   
});
//               ********************** funciones para el carrito*****************                                   
let cartData = JSON.parse(localStorage.getItem("cartData")) || [];
console.log(cartData)
function guardarDatos(){
    localStorage.setItem("cartData", JSON.stringify(cartData));  //para el formulario newsletter
    localStorage.setItem("formContactos", JSON.stringify(datosContactos)); //para el formulario contacto
}


//                 *****************************************Agrigar producto en el carro*****************************************
//Este evento se activa cuando la página web ha terminado de cargar todos sus recursos (HTML, CSS, imágenes, etc.)
window.addEventListener('DOMContentLoaded', event => {     
    // ******** función inicializarCarrito********
    function inicializarCarrito() {
         cartItems = document.getElementById("cart-items");//Lea el ul del div  lista de elemnto en el carrito
         cartTotal = document.getElementById("cart-total"); //lea el l total del carrito.
         cartItemCount = document.getElementById("cart-item-count");//lea el contador de la cantidad de elementos en el carrito.
         priceTotal = document.getElementById("price-total"); // lea el span donde va el precio total***
        // Limpiar el carrito actual
        cartItems.innerHTML = "";            //se limpian todos los elementos de la lista del carrito.
        cartTotal.textContent = "0.00";      //establece el total del carrito a 0
        cartItemCount.textContent = "0";      //establece el contador de elemnto a 0

        // Llenar el carrito con los datos almacenados
        // Calcular el precio total y actualizarlo en el botón ****
          let totalPriceCart = 0;
        if (cartData) {                                        //si tiene informacion de porducto 
            for (const item of cartData) {                     //utilizar un bucle for...of para iterar a través de los elementos en cartData
                 cartItem = document.createElement("li"); //crea un li para guardar la informacion
                productImage = document.createElement("img");// crea img
                // productImage.src = item.image;                     //y lo asigna el ruta del img (lo he qutado para ponerlo en el if de bajo para que sale bien la ruta del img en el index)
                
                // aqui las lineas de (144-152) es para cambiar la ruta de las imagen en la lista si estamos en el index
                
                // Obtiene la URL actual del navegador
                   var currentURL = window.location.href;
                    // Comprueba si la URL contiene cierta cadena de texto para determinar la página
                    if (currentURL.includes("index.html")) {
                    // Estás en la página index.html
                    productImage.src = item.image.replace('../', '');
                    } else {productImage.src = item.image; }

                productImage.alt = item.productName;               //signa el alt img
                cartItem.appendChild(productImage);                //agrega la imagen en el cartItem (li) 

                 productInfo = document.createElement("span");//aqui crea un span para que dentro guardadr la información del producto
                productInfo.classList.add("size-info");            //añadir al span una class=size-info para el tamsño de laletra
                productInfo.textContent = `${item.productName} - $${item.price}`;// aqui agregamos la info de producto en el span
                cartItem.appendChild(productInfo);                              //ponemos la info producto dentro el cart itam(li)
                 
                // Agregar la cantidad y el precio total al elemento del carrito
        
                 quantitySpan = document.createElement("span");
                quantitySpan.classList.add("quantity");
                quantitySpan.textContent = `- Cantidad: ${item.quantity}`;
                cartItem.appendChild(quantitySpan);
                 totalPriceSpan = document.createElement("span");
                totalPriceSpan.classList.add("total-price");
                totalPriceSpan.textContent = `- Total: $${item.totalPrice}`;
                cartItem.appendChild(totalPriceSpan);

                cartItems.appendChild(cartItem);                       // agregamos cada cartItem(li) en el cartItems(ul)en el div del carrito en HTML
                 
                // Calcular el precio total****
                totalPriceCart += parseFloat(item.totalPrice);

                // para el contador cantidad producto
                  itemCount = parseInt(cartItemCount.textContent); //actualizarlo con inicio cantidad
                cartItemCount.textContent = itemCount + item.quantity;              //aqui sube al añadir cada item

               // Actualizar el precio total en el botón del carrito***
                priceTotal.textContent = `cart: $${totalPriceCart.toFixed(2)}`;
            }
        }
        cartTotal.textContent = totalPriceCart.toFixed(2);
    }
    
    // **********Función para vaciar el carrito*************
function vaciarCarrito() {
    // Limpiar el carrito actual
     cartItems = document.getElementById("cart-items");
     cartTotal = document.getElementById("cart-total");
     cartItemCount = document.getElementById("cart-item-count");
     priceTotal = document.getElementById("price-total");
    
    cartItems.innerHTML = "";
    cartTotal.textContent = "0.00";
    cartItemCount.textContent = "0";
    priceTotal.textContent = "cart: $0.00";   //Actualizar el precio total en el botón del carrito

    // Vaciar el carrito en el Local Storage
    cartData = [];
    guardarDatos();
}
// llamar la funcion vaciar carrito
// Obtén una referencia al botón "Vaciar Carrito" por su ID
const vaciarCarritoButton = document.getElementById("vaciar-carrito-button");
// Agrega un escuchador de eventos para el clic en el botón
vaciarCarritoButton.addEventListener("click", function () {
    // Llama a la función vaciarCarrito para vaciar el carrito y eliminar los datos del Local Storage
    vaciarCarrito();
});

// Llamar a inicializarCarrito al inicio para cargar el carrito al cargar la página
inicializarCarrito();

// funcion del boton comprar para que sale un mensage y vacia la lista al clicar
const comprarButton = document.getElementById("comprar-button");  //lea el boton
comprarButton.addEventListener("click", function () {
     cartItems = document.getElementById("cart-items");
    if (cartItems.children.length === 0) {
        alert("No has agregado nada al carrito.");
    } else {
        alert("Gracias por tu compra. El proceso de compra continúa en la página de pago.");
        // Vaciar el carrito llamando a la función
        vaciarCarrito();
    }
});
    // ***funciones para agrigar los elemnto de compra en la lista de compra y calcular el total y guardar en el local storag***
    
   // ***********funcion para agrigar elemento en lista de compra*********
    function addToCart(productName, price, image) {

     // Buscar si el producto ya está en el carrito
   let existingCartItem = cartData.find(item => item.productName === productName);  //almacena la referencia al producto existente en el carrito si se encuentra.
     
    if (existingCartItem){
        // Si el producto ya está en el carrito, aumentar la cantidad y actualizar el precio total
        existingCartItem.quantity += 1;                                 //se incrementa la propiedad quantity del producto en existingCartItem
        existingCartItem.totalPrice = existingCartItem.quantity * price;  //calcula el nuevo precio total del producto en el carrito multiplicando la cantidad (quantity) por el precio unitario (price)
        
           // Actualizar la cantidad en el HTML
           cartItems = document.getElementById("cart-items");         //obtiene la referencia al elemento de la lista de elementos en el carrito
           let existingElement= cartItems.querySelector(`[data-product="${productName}"]`); //busca el elemento específico en la lista que corresponde al producto 
            
           quantitySpan = existingElement.querySelector(".quantity");                   //selecciona el elemento que muestra la cantidad en el carrito.
           quantitySpan.textContent = ` Cantidad: ${existingCartItem.quantity}`;      //actualiza el texto en el elemento HTML para mostrar la nueva cantidad.
   
           totalPriceSpan = existingElement.querySelector(".total-price");              //elecciona el elemento que muestra el precio total del producto en el carrito.
           totalPriceSpan.textContent = `- Total: $${existingCartItem.totalPrice.toFixed(2)}`;  //actualiza el texto en el elemento HTML para mostrar el nuevo precio total.
     
            // Actualizar el array cartData
        const cartItemIndex = cartData.findIndex(item => item.productName === productName);  //busca el índice del producto en el arreglo cartData que coincide con el nombre del producto que se está agregando nuevamente al carrito.
        cartData[cartItemIndex] = existingCartItem;                                          //actualiza el elemento correspondiente en el arreglo cartData con los nuevos datos del producto

        // Actualizar los datos en el localStorage
        guardarDatos();                             //guardar la información actualizada 
    } else{
    // Crear un nuevo elemento de lista para el carrito done vamos enjectar los informacion de cada elemento
  cartItem = document.createElement("li");

// imagen
    // Crear una imagen miniatura
     productImage = document.createElement("img"); //crear otra imagen pequeña para agrigarla en la lista de compra
    productImage.src = image;                           //aqui igualamos la ruta de imagen con la misma ruta del parametro de image recibido del evento de laddEventListener
    productImage.alt = productName;                     //aqui el alt del img
    // Agregar la imagen miniatura al elemento del carrito en el li creado antes
    cartItem.appendChild(productImage);

//info producto
    // Agregar el nombre del producto y el precio al elemento del carrito
     productInfo = document.createElement("span");      //aqui creamos un span pra guardar el nombre y el precio del producto
    productInfo.classList.add("size-info");                  //aqui añadido una clase (size-info) para el span de div del carro de compra que hemos creado
    productInfo.textContent = `${productName} - $${price}`; //aqui enyectamos el nombre y precio
    // Agregar la información del producto al elemento del carrito
    cartItem.appendChild(productInfo);                      //aqui agregar la span del nombre y preci en li
     
    // Agregar la cantidad y el precio total al elemento del carrito
    quantitySpan = document.createElement("span");
    quantitySpan.classList.add("quantity");
    quantitySpan.textContent = " - Cantidad: 1"; // Inicializar en 1
    cartItem.appendChild(quantitySpan);

    totalPriceSpan = document.createElement("span");
    totalPriceSpan.classList.add("total-price");
    totalPriceSpan.textContent = ` - Total: $${price}`;
    cartItem.appendChild(totalPriceSpan); 

    // Establecer un atributo de datos para el nombre del producto
    cartItem.setAttribute("data-product", productName);

    // Agregar el elemento al carrito
    cartItems = document.getElementById("cart-items"); //aqui leemos el div de la lista
    cartItems.appendChild(cartItem);                         //aqui agregamos el li (informaciones del producto) en el div de lista
     
    // Guardar los elementos del carrito en el localStorage
   
    const cartItemsData = {
        productName,
        price,
        image,
        quantity: 1,
        totalPrice: price
    };
       cartData.push(cartItemsData);
    guardarDatos();
}
        // Actualizar el total del carrito
         cartTotal = document.getElementById("cart-total"); //aqui leemos el ul del div de lista de compra
        const currentTotal = parseFloat(cartTotal.textContent); //aqui enyecta el pricio total inicial 
        const itemPrice = parseFloat(price);                   //el pricio del proucto
        const newTotal = currentTotal + itemPrice;             //sumamos el pricio incial con el pricio de la nuevo producto
        cartTotal.textContent = newTotal.toFixed(2);           //aqui enyectamos el pricio total final y Redondear a dos decimales

        // Incrementar la cantidad de artículos en el carrito
       cartItemCount = document.getElementById("cart-item-count"); //leemos el contador del articlas
         itemCount = parseInt(cartItemCount.textContent);
        cartItemCount.textContent = itemCount + 1;


    // Actualizar el precio total en el botón del carrito***
     priceTotal = document.getElementById("price-total");
    priceTotal.textContent = `cart: $${(currentTotal + itemPrice).toFixed(2)}`;
    
}

// aqui llamar la funcion de addToCart
    // Escuchar clics en botones "Add to Cart"
    const addToCartButtons = document.querySelectorAll(".add-to-cart");//leemos el boton de add to
    addToCartButtons.forEach((button) => {  //hacemos for eche para todo los botone para escojer informacion de cada elemento
        button.addEventListener("click", function () { //añadir evento de listning al clicar el boton add to
            const productName = button.getAttribute("data-product");
            const price = button.getAttribute("data-price");    //data-product, data-price y data-image son atributtos hemos creado para leer la info de cada producto
            const image = button.getAttribute("data-image");
            addToCart(productName, price, image);
        });
    });
});

//                       ************************************Abrir y cerrar la lista de compra**************************************

// crear funcion de evento de listener para abrir y cerar la lista decompra al clicar
const cartToggle = document.getElementById("cart-toggle"); //leer el id del boton del icon de carro
const cart = document.getElementById("cart");  //leer el id del div de la lista de compra
let cartVisible = false; //chivato 

cartToggle.addEventListener("click", (e) => {   //e como parámetro de la función de devolución de llamada del evento y luego utilizamos e.preventDefault()
    e.preventDefault(); // Detiene la propagación del evento

    if (cartVisible) {
        cart.style.display = "none";
    } else {
        cart.style.display = "block";
    }

    cartVisible = !cartVisible; // Alternar el estado lugar de depender de si el carrito ya está visible o no
});


//                         *********************para las div del producto-shop***********************
// funcion para que aparece y desaparece el boton add to cart en pagina shop cuando el mouse esta encima o fuera

// crear funcion con el evento mouseover para que se aparece el div y el boton de add to
function display(element) {
    const btn = element.querySelector('.boton-cart');
    btn.style.display = "block";
    // btn.style.backgroundColor="#7f695a"
    }
    // crear funcion con el evento mouseout para que  desaparece el div y el boton de add to
    function hide(element) {
        const btn = element.querySelector('.boton-cart');
        btn.style.display = "none";
    }

     // ********funcion para mostrar el modal del imagen para el pg. shop***************************
    // Obtener elementos del DOM
    // var modal = document.getElementById('image-modal');
    // var modalImage = document.getElementById('modal-image');
    // var closeModalButton = document.getElementById('close-modal');
    
    // // Función para mostrar el modal
    // function openModal(imageSrc) {
    //   modalImage.src = imageSrc;
    //   modal.style.display = 'block';
    // }
    
    // // Función para cerrar el modal
    // function closeModal() {
    //   modal.style.display = 'none';
    // }
    // // Agrega un evento al botón de cierre
    // closeModalButton.addEventListener('click', closeModal);
// ****************************************************************************************************************

//                         ******************************************************

//                         ***********************************formulario newsletter footer ***************************************
// ***+funcion para enviar el formulario de newsletter en el footer****
document.addEventListener("DOMContentLoaded", function () {
    // Al cargar la página, intenta recuperar los datos del localStorage
    let emails = JSON.parse(localStorage.getItem("newsletterEmails")) || [];
    
    const newsletterForm = document.getElementById("newsletter-form");
    const emailInput = document.getElementById("email");

    newsletterForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe por defecto.

        const email = emailInput.value;

        if (email) {
            // Verifica si el email ya está en la lista
            if (!emails.includes(email)) {
                emails.push(email); // Agrega el email al array si no está ya incluido

                // Guarda el array de emails en el localStorage
                localStorage.setItem("newsletterEmails", JSON.stringify(emails));

                // Puedes mostrar un mensaje de éxito o redirigir a otra página aquí
                alert("Email registrado con éxito.");
            } else {
                alert("El email ya está registrado.");
            }
             // Limpiar el formulario
            //    form.reset();

            emailInput.value = ""; // Limpia el campo de entrada
        } else {
            alert("Por favor, ingresa un email válido.");
        }
    });
});
// *************************************************
// funcion para enviar el formulario de contactos
var datosContactos = JSON.parse(localStorage.getItem("formContactos")) || [];

const contactForm = document.getElementById("contactForm")

function agregarContacto(){
    const nameInput = document.getElementById("name").value;
    const emailAddress = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phone").value;
    const messageInput = document.getElementById("message").value;

    const contacto = {
        numero:Math.floor(1000 + Math.random() * 9000),
        nameInput,
        emailAddress,
        phoneNumber,
        messageInput,
    }
    datosContactos.push(contacto);
    guardarDatos(); 
    contactForm.reset();
}

// contactForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     agregarContacto(contactForm);
// });
