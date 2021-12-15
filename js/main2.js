// variables libros y gastos al comenzar;
var librosComprados = 0;
var totalGasto = 0;
var listaComprados =[];
var librosNovedades=[];
var cuotas3 =false;
var cuotas6=false;
var cuotas12=false;
var totalGasto3=0;
var venta = false;
var contenido ="";
var login;
// constructor para Crear objetos con libros
class libros{
    constructor (id,nombre,autor,precio,stock,imagen,anio){
        this.id = id;
        this.nombre = nombre;
        this.autor=autor;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.anio =anio;
        this.cantidad = 0;
    }
}
    // creación de los libros
    const libro1 = new libros(1,'Arsene Lupin','Maurice Leblanc',1300,20,'img/arsenelupin.jpg',2007);
    const libro2 = new libros(2,'Harry Potter 5','J.K. Rowling',1700,15,'img/harrypotter5.jfif',2003);
    const libro3 = new libros(3,'El Alquimista','Paulo Coelho',1600,40,'img/alquimista.jpg',1988);
    const libro4 = new libros(4,'Amor En Los Tiempos del Colera','Garcia Marquéz',1800,25,'img/amorColera.jpg',1985);
    const libro5 = new libros(5,'Las Mil y Una Noches','Anónimo',1000,30,'img/milyunanoches.jpg',2010);
    const libro6 = new libros(6,'Drácula','Stocker Bram',3000,25,'img/dracula.jpg',2021);
    const libro7 = new libros(7,'El Precio de la Pasión','Gabriel Rolón',1390,10,'img/pasion.jpg',2021);
    const libro8 = new libros(8,'El Principito','Antoine Saint Exupery',700,30,'img/principito.jpg',1943);

    var listaLibros = [libro1,libro2,libro3,libro4,libro5,libro6,libro7,libro8];
    localStorage.setItem('listaOriginal',JSON.stringify(listaLibros));
// agregar cards de forma dinámica al html
function cards(listadoLibro){
    if (venta == true){
        $('#cards').html('').fadeIn('fast');
        for (const libro of listadoLibro){
            $('#cards').append(
                `<div class="card">
                    <img src="${libro.imagen}" class="card-img-top card-imagen" alt="imagen libro">
                    <div class="card-body">
                        <h5 class="card-title">${libro.nombre}</h5>
                        <p class="card-text">${libro.autor}</p>
                        <p class="card-text stock"id="stock${libro.id}">stock:${libro.stock}</p>
                        <p class="card-text precio">Precio: ARS $ ${libro.precio}</p>
                    </div>
                <button class="btn btn-danger"id="btn${libro.id}">COMPRAR</button>
                </div>`
            );
        }
        comprar(listadoLibro);
    }
    else {
        for (const libro of listadoLibro){
            $('#cards').append(
                `<div class="card">
                    <img src="${libro.imagen}" class="card-img-top card-imagen" alt="imagen libro">
                    <div class="card-body">
                        <h5 class="card-title">${libro.nombre}</h5>
                        <p class="card-text">${libro.autor}</p>
                        <p class="card-text precio">Precio: ARS $ ${libro.precio}</p>
                    </div>
                    <button class="btn btn-danger"id="btn${libro.id}">LOGIN</button>
                </div>`
            );
        }
        comprar(listadoLibro);
    }
}
function inicio(listadoLibro){
       // Comprobar estado del carrito al iniciar
    librosAnteriores = JSON.parse(localStorage.getItem('lista')); //recuperar datos de libros comprados
    login = localStorage.getItem('usuario'); // recuperar datos de usuario
    if(login !=null){   //comprobar si el usuario inicio sesión
        venta=true;
        // listaLibros = JSON.parse(localStorage.getItem('listaLibrosAnteriores')); //recuperar datos listado de libros
        if (librosAnteriores !=null || listaComprados.length !=0){ // comprobar si el carrito esta lleno ó vacio
            $('#imgCarrito').html(`<img src="img/comprar.png"alt="carrito lleno">`); //mostrar carrito lleno si hay libros para comprar
            // recuperar datos de libros comprados ,preciom , cantidad, stock
            librosComprados= parseInt(localStorage.getItem('cantidadTotal'));  //recuperar libros totales
            totalGasto = parseInt(localStorage.getItem('precioTotal'));         // recuperar precio total
            listadoLibro = JSON.parse(localStorage.getItem('listaLibrosAnteriores')); //recuperar datos listado de libros 
            listaComprados = librosAnteriores;  //tomar valor de libros comprados
            listadoLibro = JSON.parse(localStorage.getItem('listaLibrosAnteriores')); //recuperar datos listado de libros 
        }
        else if (librosAnteriores ==null || listaComprados.length ==0){//comprobar login y estado del carrito
            // Mostrar imagen Carrito Vacio
            var imgCarrito = document.getElementById('imgCarrito');
            imgCarrito.innerHTML =`<img src="img/carritovacio.png"alt="carrito">`;
            //mostrar precio y cantidad en carrito de compras
            cantidadTotal = document.getElementById('cantidadTotal');
            cantidadTotal.innerHTML = librosComprados;
            precioTotal = document.getElementById('precioTotal');
            precioTotal.innerHTML = '$ '+totalGasto;
        }  
        $('#txtCuenta').html('  '+login.toUpperCase()).css({
            'color':'blue',
            'font-weight':'bold'   
        });
        $('#datosCarrito').show();
        $('#modalMiCuenta').fadeOut('slow');
        $('#cards').fadeOut('fast');
        $('#btnCuenta').hide();
        $('#btnSalir').html('<button class="btn btn-danger ms-3">Salir</button>');
        cantidadTotal = document.getElementById('cantidadTotal'); // valores de cantidad y precio totales sin realizar compras
        cantidadTotal.innerHTML = librosComprados;
        precioTotal = document.getElementById('precioTotal');
        precioTotal.innerHTML = '$ '+totalGasto;
        $('#btnSalir').click(()=>{
            location.href = "./index.html";  // salir de login del usuario
            localStorage.removeItem('usuario');  //borrar datos de usuario
        });
        $('#imgCarrito').click(function(){  // click en imagen del carrito para finalizar la compra
            if (venta ==true && listaComprados.length == 0){  //mensaje si el carrito esta vacio
                mensajesAdvertencias('#mensajeCarrito','No existen productos en el carrito para comprar'); 
                $('#toast').fadeIn('fast');
                $('#toast').fadeOut(3000);   
            }
            else if (venta==true && listaComprados.length !==0){
                contenido='';
                $('#contenidoCompra').html(contenido);
                modalCarrito(listaComprados);
                $('#carrito').fadeIn('fast');
            }
        });
    }
    else {
        $('#datosCarrito').hide();
    } 
    cards(listadoLibro);
};
// Crear modal por libro
function modal(listadoLibro){
    for(const lib of listadoLibro){
        $('#modalContainer').append(`
            <div class="modal" tabindex="-1" id="modal${lib.id}">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Nuevos Aires - Venta OnLine</h5>
                        </div>
                        <div class="modal-body">
                            <p><img src="${lib.imagen}"width="100px"height="120px"><span class="texto-modal">${lib.nombre}</span></p>
                                <form action=""id="formu${lib.id}" class="text-center">
                                    <label for=""class="form-label">Cantidad</label>
                                    <input type="number" name="cantidad" id="cantidad${lib.id}"class="form-control"placeholder="Ingrese la Cantidad">
                                </form>
                            <section id="resultado${lib.id}"class="resultado"></section>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning"id="btnCerrar${lib.id}">Cancelar</button>
                            <button type="button" class="btn btn-success"id="btnAgregar${lib.id}">Agregar Carrito</button>
                        </div>
                    </div>
                </div>
            </div>`
        );
    }
    datosCompra(listadoLibro);    
}
// mostrar y ocultar modal delibros
function comprar(listadoLibro){
    modal(listadoLibro);
    for (const libro of listadoLibro){
        $(`#btn${libro.id}`).click(function(){  //boton para mostrar modal
            if(listaComprados.length!=0){
                listadoLibro= JSON.parse(localStorage.getItem('listaLibrosAnteriores'));
            }
            if (libro.stock ==0){
                $('#mensajeError').html('');
                $('#mensajeError').html('No hay cantidades disponibles en stock');
                mensajesError('No hay cantidades disponibles en stock');  //comprobar si hay stock disponible al hacer click en boton para poder comprar
                $('#alertError').fadeIn('fast');
                $('#alertError').fadeOut(3000);
                return false;
            }
            else if (venta == false){
                mensajesError('Debes Iniciar sesión para poder Comprar');  //comprobar si hay stock disponible al hacer click en boton para poder comprar
                $('#alertError').fadeIn('fast');
                $('#alertError').fadeOut(3000);
                return false;
            }
            else if (venta == true){
                $(`#modal${libro.id}`).show(); //mostrar modal
            }
        });
    }
}
// tomar datos del modal para agregar libros a la compra
function datosCompra(listadoLibro){
    for(const lib of listadoLibro){
        let cantidad = document.getElementById(`cantidad${lib.id}`); 
        $(`#btnAgregar${lib.id}`).click(function(){ //click boton agregar carrito
            if((cantidad.value)<=0 || cantidad ==null){
                comprobarCantidad(lib,cantidad); //validar cantidad ingresada
            }
            else if ((cantidad.value)>lib.stock){
                $(`#resultado${lib.id}`).html('<p>No hay disponible esa cantidad en el stock</p>').css('color','red'); //validar si la cantidad a comprar es superio al stock
            }
            else{
                agregarCarrito(lib,cantidad);
                document.getElementById(`resultado${lib.id}`).innerHTML="";
                $(`#pago${lib.id}`).val('Seleccione un medio de pago');
                $(`#opcionCuotas${lib.id}`).slideUp(); //ocultar opcion de cuotas
                $(`#modal${lib.id}`).fadeOut(500);  //ocultar modal y resetear datos de formulario
                cantidad.value='';
                $(`#formu${lib.id}`).reset();  // restear formulario       
            }
        });
        $(`#btnCerrar${lib.id}`).click(function(){  //ocultar modal y resetear formulario
            document.getElementById(`resultado${lib.id}`).innerHTML="";
            cantidad.value='';
            $(`#pago${lib.id}`).val('Seleccione un medio de pago');
            $(`#opcionCuotas${lib.id}`).slideUp();
            $(`#modal${lib.id}`).hide();
        })
    }
}
// comprobar que se ingrese la cantidad de compra en los libros
const comprobarCantidad =(lib,cantidad) =>{
    if((cantidad.value)<=0 || cantidad == null){  // validar si la cantidad es incorrecta o no se ingresa  y mostrar mensaje
        cantidad.focus();
        $(`#resultado${lib.id}`).html('<p>Cantidad Incorrecta</p>').css('color','red')
        $(`#formu${lib.id}`).reset();  //resetear formulario
    }
}
//elegir medio de pago - efectivo / cuotas
function pago(){
    $('#logoTarjeta').html('<img src="img/visamaster.png" alt="logo tarjeta"class="logo-tarjeta"><hr class="linea">');//logo original de tarjeta
    $('#tarjeta').hide(); //ocultar tarjeta hasta que no se elija la opción correcta
    $('#pago').change(()=>{
        switch ($('#pago').val()){
            case 'efectivo':
                    $('#resultadoCarrito').html(`1 Pago de  $ ${totalGasto}`).css('color','grey');
                    $('#opcionCuotas').fadeOut('fast');
                    $('#cantCuotas').val('Seleccione la cantidad de cuotas');
                    $('#formTarjeta').trigger('reset'); //limpiar formulario de tarjeta
                    $('#logoTarjeta').html('<img src="img/visamaster.png" alt="logo tarjeta"class="logo-tarjeta"><hr class="linea">');//logo original de tarjeta
                    $('#mensajeTarjeta').html(''); //limpiar mensaje de tarjeta
                    $('#tarjeta').fadeIn('fast'); //mostrar tarjeta
            break;
            case 'cuotas':
                    $('#opcionCuotas').fadeIn('slow');
                    $('#resultadoCarrito').html('');
                    $('#tarjeta').fadeOut('fast');
                    cuotas();
            break;
            default: 
                $('#resultadoCarrito').html('');
                $('#opcionCuotas').fadeOut('fast');
                $('#cantCuotas').val('Seleccione la cantidad de cuotas');
                $('#tarjeta').fadeOut('fast');
            break;
        };
    });
}
// Compra con cuotas
function cuotas(){
    let cantCuota = $('#cantCuotas');
    cantCuota.change(function(){
        switch (cantCuota.val()){
            case '3':  //opción 3 cuotas
                $('#formTarjeta').trigger('reset'); //limpiar formulario de tarjeta
                $('#mensajeTarjeta').html(''); //limpiar mensaje de tarjeta
                $('#logoTarjeta').html('<img src="img/visamaster.png" alt="logo tarjeta"class="logo-tarjeta"><hr class="linea">');//logo original de tarjeta
                $('#tarjeta').fadeIn('fast'); //mostrar tarjeta
                let cuota3 = Math.round(totalGasto*1.15);  // valor de precio total 3 cuotas
                //valor de precio en 3 cuotas
                $(`#resultadoCarrito`).html(`<p>Precio Final: $ ${(cuota3)}</p><p>Cuotas: 3 cuotas de $ ${(cuota3/3).toFixed(2)}</p>`).css('color','grey');
                return cuotas3 = true;
            break;
            case '6':  //opción 6 cuotas
                $('#formTarjeta').trigger('reset'); //limpiar formulario de tarjeta
                $('#mensajeTarjeta').html(''); //limpiar mensaje de tarjeta
                $('#logoTarjeta').html('<img src="img/visamaster.png" alt="logo tarjeta"class="logo-tarjeta"><hr class="linea">');//logo original de tarjeta
                $('#tarjeta').fadeIn('fast'); //mostrar tarjeta
                let cuota6 = Math.round(totalGasto*1.20);  // valor de precio total 6 cuotas
                // valor de precio en 6 cuotas
                $(`#resultadoCarrito`).html(`<p>Precio Final: $ ${(cuota6)}</p><p>Cuotas: 6 cuotas de $ ${(cuota6/6).toFixed(2)}</p>`).css('color','grey');
                return cuotas6 = true;
            break;
            case '12':   //opción 12 cuotas
                $('#formTarjeta').trigger('reset'); //limpiar formulario de tarjeta
                $('#mensajeTarjeta').html(''); //limpiar mensaje de tarjeta
                $('#logoTarjeta').html('<img src="img/visamaster.png" alt="logo tarjeta"class="logo-tarjeta"><hr class="linea">');//logo original de tarjeta
                $('#tarjeta').fadeIn('fast'); //mostrar tarjeta
                let cuota12 = Math.round(totalGasto*1.30);  // valor de precio total 12 cuotas
                // valor de precio en 6 cuotas
                $(`#resultadoCarrito`).html(`<p>Precio Final: $ ${(cuota12)}</p><p>Cuotas: 12 cuotas de $ ${(cuota12/12).toFixed(2)}</p>`).css('color','grey');
                return cuotas12 = true;
            break;
            default:
                $(`#resultadoCarrito`).html('');  //opcion por defecto borrar lo escrito
                $('#mensajeTarjeta').html(''); //limpiar mensaje de tarjeta
                $('#tarjeta').fadeOut('fast'); //ocultar tarjeta
            break;
        };
    });
}
//validación formulario contacto
function formulario(){
    var nombre = document.getElementById('txtNombre');
    var email = document.getElementById('txtEmail');
    var cant =document.getElementById('txtCantidad');
    var mensaje =document.getElementById('mensaje');
    var botonEnviar = document.getElementById('btnEnvio');
    var botonBorrar = document.getElementById('btnBorrar');
    // acción boton enviar
    botonEnviar.onclick =()=>{
        if (nombre.value.trim() ==''){
            mensaje.innerHTML=`<p>El Nombre es incorrecto</p>`;
            return false;
        }
        else if (email.value.trim()==''|| email.value.indexOf('@')==-1 || email.value.indexOf('.')==-1){
            mensaje.innerHTML=`<p>El Correo es incorrecto</p>`;
            return false;
        }
        else if(isNaN(cant.value) || cant.value<=0){
            mensaje.innerHTML=`<p>La Cantidad es incorrecta</p>`;
            return false;
        }
        else{
            mensaje.innerHTML=`<p>Datos Enviados</p>`
            setTimeout(enviarFormulario,1000);
        }
    }
    // acción boton cancelar
    botonBorrar.onclick =()=>{
        nombre.value= '';
        email.value='';
        cant.value='';
        mensaje.innerHTML='';
    }
}
function enviarFormulario(){
    $('#formulario2').submit()
}
// libros que se agregan al carrito
function agregarCarrito(lib,cant){
    lib.cantidad = parseInt(cant.value);
    librosComprados +=lib.cantidad; // sumar cantidad de libros
    lib.stock = lib.stock - lib.cantidad;
    $('#imgCarrito').html(`<img src="img/comprar.png"alt="carrito lleno">`);  //imagen carrito lleno  
    cantidadTotal.innerHTML = librosComprados;   
    let repetido = false;
    for (let i=0;i<listaComprados.length;i++){  // comprobar si existe el libro y sumarle la cantidad nueva
        if(listaComprados[i].id == lib.id){
            repetido = true;
            if (repetido ==true){
                console.log('libro repetido');
                listaComprados = JSON.parse(localStorage.getItem('lista')); //traer datos para hacer la suma de nueva cantidad
                listaComprados[i].cantidad= listaComprados[i].cantidad + lib.cantidad;  //sumar cantidad al item ya agregado al carrito
            }
        }
    }
    if(repetido==false){
        listaComprados.push(lib);
    }
    if (cuotas3==true){     // mostrar carrito precio con credito , recargo 15% en 3 cuotas
        totalGasto += Math.round((lib.precio*cant.value)*1.15);
        cuotas3 =false;
    }
    else if (cuotas6==true){     // mostar carrito precio con credito , recargo 20% en 6 cuotas
        totalGasto += Math.round((lib.precio*cant.value)*1.20);
        cuotas6 =false;
    }
    else if (cuotas12==true){     // mostrar carrito precio con credito , recargo 30% en 12 cuotas
        totalGasto += Math.round((lib.precio*cant.value)*1.30);
        cuotas12 =false;
    }
    else{
        totalGasto += lib.precio*cant.value;  // precio con pago debito
    }
    precioTotal.innerHTML = '$ ' +totalGasto;   // precio total de libros comprados en carrito  
    $(`#stock${lib.id}`).html(`<p class="card-text stock">stock:${lib.stock}</p>`);
    //guardar datos
    localStorage.setItem('lista',JSON.stringify(listaComprados)); // guardar datos de libros comprados
    localStorage.setItem('listaLibrosAnteriores',JSON.stringify(listaLibros));  // guardar datos de libros
    localStorage.setItem('lista',JSON.stringify(listaComprados)); // guardar datos de libros comprados
    localStorage.setItem('cantidadTotal',librosComprados); // guardar cantidad de libros comprados
    localStorage.setItem('precioTotal',totalGasto); //guardar precio total de libros comprados
}
function modalCarrito(listado){
      //mostrar modal carrito de compras
    $('#modalCarrito').append(`
        <div class="modal" tabindex="-1"id="carrito">
            <div class="modal-dialog">
                <div class="modal-content text-start">
                    <div class="modal-header">
                        <h5 class="modal-title">Nuevos Aires - Compras</h5>
                        <button type="button" class="btn-close"id="btnClose"></button>
                    </div>
                    <div class="modal-body">
                        <h6 class="detalleCompra text-center">Detalle de Compra</h6>
                        <section class="text-center"id="contenidoCompra"></section>
                        <section>
                            <h6 class="detalleCompra text-center">Forma de Pago </h6>
                            <p class="text-center detalle-carrito"id="detalleCarrito"><span><b id="modalComprados"></b></span> - <span><b id="modalPrecio"></b></span></p>
                        </section> 
                        <section>
                            <form action=""id="formuCarrito" class="text-center">
                                <label for="pago"class="form-label">Medio de Pago</label>
                                <select name="pago" id="pago"class="form-select text-center">
                                    <option >Seleccione un medio de pago</option>
                                    <option value="efectivo">Debito</option>
                                    <option value="cuotas">Credito</option>
                                </select>
                                <section class="opcionCuotas"id="opcionCuotas">
                                    <label for="cantCuotas"class="form-label">Cuotas</label>
                                    <select name="cantCuotas" id="cantCuotas"class="form-select text-center">
                                        <option >Seleccione la cantidad de cuotas</option>    
                                        <option value="3">3</option>
                                        <option value="6">6</option>
                                        <option value="12">12</option>
                                    </select>
                                </section>
                            </form>
                            <section id="resultadoCarrito"class="resultado"></section>
                        </section> 
                        <section id="tarjeta"class="tarjeta">
                            <form class="container form-tarjeta"id="formTarjeta">
                                <section id="logoTarjeta">
                                    <img src="img/visamaster.png" alt="logo tarjeta"class="logo-tarjeta"><br><hr class="linea">
                                </section>
                                <input type="number"class="numTarjeta"placeholder="XXXX"max="5999" min="4000"id="numTarjeta1"oninput="comprobarTarjeta()"autocomplete="off">
                                <input type="number"class="numTarjeta"placeholder="XXXX"max="9999" min="0"id="numTarjeta2"oninput="comprobarTarjeta()"autocomplete="off"disabled>
                                <input type="number"class="numTarjeta"placeholder="XXXX"max="9999" min="0"id="numTarjeta3"oninput="comprobarTarjeta()"autocomplete="off"disabled>
                                <input type="number"class="numTarjeta"placeholder="XXXX"max="9999" min="0"id="numTarjeta4"oninput="comprobarTarjeta()"autocomplete="off"disabled><br><br>
                                <label class="label-mes">MM</label>
                                    <select id="mesTarjeta"disabled>
                                        <option value="mes">MM</option>
                                        <option>01</option>
                                        <option>02</option>
                                        <option>03</option>
                                        <option>04</option>
                                        <option>05</option>
                                        <option>06</option>
                                        <option>07</option>
                                        <option>08</option>
                                        <option>09</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                    </select>
                                <label class="label-mes">AA</label>
                                <select id="anioTarjeta"disabled>
                                    <option value="anio">AA</option>
                                    <option>22</option>
                                    <option>23</option>
                                    <option>24</option>
                                    <option>25</option>
                                    <option>26</option>
                                    <option>27</option>
                                    <option>28</option>
                                </select>
                                <label class="label-mes">COD</label>
                                <input type="number"min="0"max="999"id="codTarjeta"title="Ingrese el código de seguridad"oninput="comprobarTarjeta()"placeholder="XXX"autocomplete="off"disabled><br>
                                <label for="nombreTarjeta"class="labelTarjeta">Nombre</label><br>
                                <input type="text"id="nombreTarjeta"maxlength="30"minlength="5"title="Ingrese Nombre y Apellido"autocomplete="off"onkeyup="textoTarjeta(this)"placeholder="Ingrese el Nombre"disabled>
                                </form>
                        </section>
                    </div>
                    <div class="modal-footer pt-5">
                        <button type="button" class="btn btn-danger"id="btnCancelarCompra">Cancelar Compra</button>
                        <button type="button" class="btn btn-primary"id="btnFinalizarCompra">Finalizar Compra</button>
                    </div>
                </div>
            </div>
        </div>
    `);
        for (let lib of listado){  //mostrar lista de libros comprados
                contenido += `<p class="texto-modal-compra"><img src="${lib.imagen}" alt="libro imagen" width="50" height="60">  ${lib.nombre} - ${lib.cantidad} - $ ${lib.precio*lib.cantidad}<button type="button" class="close" aria-label="Close"id="btnBorrarLista${lib.id}">
                <span aria-hidden="true">&times;</span>
                </button></p>
                <hr>`;
                $('#modalComprados').html(`Libros: ${librosComprados}`); // mostrar libros comprados en modal carrito
                $('#modalPrecio').html(`Libros: $${totalGasto}`); // motrar precio total en modal carrito
            };
    $('#contenidoCompra').html(contenido); //mostrar en modal html
    pago();  // funcion forma de pago
    $('#btnClose').click(()=>{   //boton cerra modal de compra y resetear formularios
        contenido='';
        $('#contenidoCompra').html(contenido);
        $('#pago').val('Seleccione un medio de pago');
        $('#cantCuotas').val('Seleccione la cantidad de cuotas');
        $('#opcionCuotas').hide();
        $('#resultadoCarrito').html('');
        $('#carrito').fadeOut('slow');
        $('#formTarjeta').trigger('reset');
        $('#mensajeTarjeta').html('');
    });
    for(let libro of listado){   //llamar a funcion para quitar libro de la lista
        $(`#btnBorrarLista${libro.id}`).click(()=>{
            sacarLibro(libro,libro.id);
        }); 
    }
    $('#btnFinalizarCompra').attr('disabled','disabled');  //boton disabled no finalizar hasta que se completen todos los datos
    $('#btnFinalizarCompra').click(()=>{  // comprobar que se seleccione medio de pago y finalizar o cancelar compra
        if ($('#pago').val()!=='efectivo' && $('#pago').val()!=='cuotas'){
            $('#resultadoCarrito').html('No se selecciono forma de pago').css('color','red');
        }
        else if ( $('#pago').val()=='cuotas' && ($('#cantCuotas').val()!=='3' && $('#cantCuotas').val()!=='6' && $('#cantCuotas').val()!=='12')){
            $('#resultadoCarrito').html('No se selecciono cantidad de Cuotas').css('color','red');
        }
        else {
            limpiarCarrito('Gracias por su compra'); //mensaje compra finalizada
        }
    });
    $('#btnCancelarCompra').click(()=>{
        limpiarCarrito('Compra cancelada');
        $('.modal-final').css('color','red');
    })
}
// quitar libros de la lista de compras
function sacarLibro(listado,id){
    console.log(id);
    console.log(listado.cantidad);
    listaComprados =  listaComprados.filter(element =>element.id !=id); //buscar el id a quitar de la lista y quitarlo
    contenido=''; //limpiar contenido
    $('#contenidoCompra').html(contenido);
    librosComprados -= listado.cantidad;  //quitar libros comprados al sacarlos de la lista
    totalGasto -= (listado.precio*listado.cantidad);  //quitar precio al sacarlos de la lista
    $('#cantidadTotal').html(librosComprados);
    $('#precioTotal').html(totalGasto);
    $('#detalleCarrito').html('');
    for (let lib of listaLibros){ // devolver el stock a los libros que se quitan de la lista
        if(lib.id == id){
            lib.stock = lib.stock + lib.cantidad;
        }
    }
    localStorage.setItem('lista',JSON.stringify(listaComprados)); // guardar datos de libros comprados
    localStorage.setItem('listaLibrosAnteriores',JSON.stringify(listaLibros));  // guardar datos de libros
    localStorage.setItem('cantidadTotal',librosComprados); // guardar cantidad de libros comprados
    localStorage.setItem('precioTotal',totalGasto); //guardar precio total de libros comprados
    $('#cards').html('').hide(); //ocultar y mostrar cards de libros con stock actualizado
    $('#cards').fadeIn('fast');
    cards(listaLibros);  //llamar a función para mostrar cards de libros
     //mostrar cantidad actualizada de libros elegidos
    $('#detalleCarrito').fadeIn('fast').html(`<span><b>Libros : ${librosComprados}</b></span> - <span><b>Total: $ ${totalGasto}</b></span></p>`);
    modalCarrito(listaComprados);
    if (listaComprados.length==0){  // si se remueven todos los items vaciar carrito y todos los libros elegidos
        localStorage.removeItem('lista');
        localStorage.removeItem('listaLibrosAnteriores');
        localStorage.removeItem('cantidadTotal');
        localStorage.removeItem('precioTotal');
        location.href ='./index.html';
    }
}
// Finalizar compra ó cancelarla
const limpiarCarrito =(mensaje)=>{
    localStorage.removeItem('lista');
    localStorage.removeItem('listaLibrosAnteriores');
    localStorage.removeItem('cantidadTotal');
    localStorage.removeItem('precioTotal');
    mensajes(mensaje);
    $('#carrito').fadeOut('fast');
    $('#alert').fadeIn('fast');
}
function botonTop(){  //efecto al hacer click en boton top
    $('#botonTop').click(function(){
        $('html').animate({
            scrollTop: $('#inicio').offset().top
        },1000);
    });
}
function linkContacto(){
//efecto al hacer click en contacto e ir a la sección
    $('#linkContacto').click(function(){
        $('html').animate({   //mostrar botón top con efecto  
            scrollTop: $('#formContacto').offset().top,
            fadeIn:$('#botonTop').slideDown(1500).fadeOut('fast').fadeIn('fast').fadeOut('fast').fadeIn('fast')
        },1000)
        });
}
function scroll(){
    var scrollPos = 0;
    window.addEventListener('scroll',function(){   //mostrar boton top al hacer scroll hacia abajo
    if ((document.body.getBoundingClientRect().top) < scrollPos){ 
        $('#botonTop').fadeIn(1500);
    }
    else 
        $('#botonTop').fadeOut('fast');   // ocultar boton top al hacer scroll hacia arriba
    scrollPos = (document.body.getBoundingClientRect()).top;
    });
}
// libros opción novedades
const novedades =() =>{
    $('#novedades').click(function(){
        if(listaComprados.length !=0){
            listaLibros = JSON.parse(localStorage.getItem('listaLibrosAnteriores')); // recuperar datos de libros si hay en carrito
        }
        $('#novedades').addClass('item-activo');
        $('#menorPrecio').removeClass('item-activo');
        $('#todos').removeClass('item-activo');
        $('#cards').fadeOut('fast'); //ocultar con efecto
        var librosNovedades = listaLibros.filter(libro => libro.anio == 2021);  // filtrar libros por año 2021 - novedades
        $('#cards').html('').fadeIn('fast');// aparecer con efecto
        cards(librosNovedades);
    });
}
// Ordenar libros por precio
function menorPrecio(){
    $('#menorPrecio').click(function(){
        if(listaComprados.length !=0){
            listaLibros = JSON.parse(localStorage.getItem('listaLibrosAnteriores')); // recuperar datos de libros si hay en carrito
        }
        $('#todos').removeClass('item-activo');
        $('#novedades').removeClass('item-activo');
        $('#menorPrecio').addClass('item-activo');
        listaLibros.sort(function(lib1,lib2){  //ordenar por menor precio
            if(lib1.precio < lib2.precio){    
                return -1;
            }
        });
        $('#cards').fadeOut('fast'); //ocultar con efecto
        $('#cards').html('').fadeIn('fast');
        cards(listaLibros);
    });
}
// menú de busqueda
const busqueda=(listadoLibro)=>{
    if(listaComprados.length !=0){
        listaLibros = JSON.parse(localStorage.getItem('listaLibrosAnteriores')); // recuperar datos de libros si hay en carrito
    }
    $('#novedades').removeClass('item-activo');
    $('#menorPrecio').removeClass('item-activo');
    $('#cards').html('');  //limpiar html de libros 
    const texto = $('#txtSearch').val().toLowerCase(); //tomar valor de campo de búsqueda
    for (const lib of listaLibros){
        let nombre = lib.nombre.toLowerCase();
        if(nombre.indexOf(texto) !== -1){  //buscar palabra escrita en nombres de libro
            if(venta == true){
                $('#cards').append(  // crear el card del libro que se busca
                    `<div class="card">
                    <img src="${lib.imagen}" class="card-img-top card-imagen" alt="imagen libro">
                    <div class="card-body">
                        <h5 class="card-title">${lib.nombre}</h5>
                        <p class="card-text">${lib.autor}</p>
                        <p class="card-text stock"id="stock${lib.id}">stock:${lib.stock}</p>
                        <p class="card-text precio">Precio: ARS $ ${lib.precio}</p>
                    </div>
                    <button class="btn btn-danger"id="btn${lib.id}">COMPRAR</button>
                </div>`
                );
                comprar(listadoLibro);  //llamar a función para permitir comprar
            }
            else {
                $('#cards').append(  // crear el card del libro que se busca
                    `<div class="card">
                    <img src="${lib.imagen}" class="card-img-top card-imagen" alt="imagen libro">
                    <div class="card-body">
                        <h5 class="card-title">${lib.nombre}</h5>
                        <p class="card-text">${lib.autor}</p>
                        <p class="card-text stock"id="stock${lib.id}">stock:${lib.stock}</p>
                        <p class="card-text precio">Precio: ARS $ ${lib.precio}</p>
                    </div>
                    <button class="btn btn-danger"id="btn${lib.id}">LOGIN</button>
                </div>`
                );
                comprar(listadoLibro);  //llamar a función para permitir comprar
            }
        }
    }
    if ($('#cards').html() == ''){
        $('#cards').html(`
            <div class="container-fluid text-center">
                <div class="row">
                    <div class="col">
                        <p class="error-busqueda">No Se econtraron resultados</p>
                    </div>
                </div>
            </div>
        `);    
    };
}
// llamar a función busqueda según el nombre del libro elegido
const buscar =(listadoLibro)=>{
    let encontrar = $('#txtSearch').val();
    $('#btnSearch').click(()=>{  //buscar libro al presionar botón de busqueda
        busqueda(listadoLibro);
    });
    $('#txtSearch').keyup(function() { //busca libro según lo que el usuario haya escrito
        busqueda(listadoLibro); 
    });
}
const modalLogin =()=>{   //modal para ingreso de datos inicio de Sesión
    $('#modalCuenta').append(`
        <div class="modal" tabindex="-1"id="modalMiCuenta">
            <div class="modal-dialog">
                <div class="modal-content text-center">
                    <div class="modal-header">
                        <h5 class="modal-title">Nuevos Aires - Login</h5>
                    </div>
                    <div class="modal-body">
                        <form action="" metchod="POST" class="container p-3b">
                            <label for=""class="form-label">Usuario</label>
                            <input type="text"class="form-control"id="usuarioLogin"placeholder="Ingrese el Usuario">
                            <label for=""class="form-label">Contraseña</label>
                            <input type="password"class="form-control"id="passwordLogin"placeholder ="Ingrese la Contraseña">
                            </form>
                            <button class="btn btn-outline-secondary p-1 m-3">Registarse</button>
                            <section id="resultadoLogin"></section>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-danger"id="btnCerrarCuenta">Cerrar</button>
                    <button type="button" class="btn btn-primary"id="btnDatosUsuario">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    `);
    $('#btnCerrarCuenta').click(()=>{
        $('#usuarioLogin').val('');  //borrar datos ingresas al cerrar modal sin iniciar sesión
        $('#passwordLogin').val('');
        $('#modalMiCuenta').fadeOut('fast')
    });  // cerrar modal inicio sesión
    datosUsuarios();
}
// Iniciar Sesion y registo de usuarios
function cuentaUsuarios (){
    $('#btnCuenta').click(()=>{
        modalLogin();
        $('#resultadoLogin').html('');
        $('#usuarioLogin').removeClass('is-valid');
        $('#usuarioLogin').removeClass('is-invalid');
        $('#passwordLogin').removeClass('is-invalid');
        $('#modalMiCuenta').fadeIn('fast');
    });
}
function datosUsuarios(){
    let usuario = $('#usuarioLogin');
    let password = $('#passwordLogin');
    $('#btnDatosUsuario').click(()=>{
        $.ajax({        //obtener datos de usuario via ajax
            url:'js/usuarios.json',
            method:'GET',
            success: (listaUsuarios)=>{  //validar si existe el nombre de usuario y la contraseña para login
                for (usuarios of listaUsuarios){
                    if (usuario.val().toLowerCase() !== usuarios.nombre && usuario.val().trim()!==''){
                        $('#resultadoLogin').html('No existe el usuario').css('color','red');
                        usuario.addClass('is-invalid');
                        usuario.focus();
                        existe=false;    
                    }
                    else if (usuario.val().trim()==''){
                        $('#resultadoLogin').html('No se Ingreso el usuario').css('color','red');
                        usuario.addClass('is-invalid');
                        usuario.focus();
                        existe=false;    
                    }
                    else if (password.val().trim()==''){
                        $('#resultadoLogin').html('No se Ingreso la contraseña').css('color','red');
                        usuario.removeClass('is-invalid');
                        usuario.addClass('is-valid');
                        password.addClass('is-invalid');
                        password.focus();
                        existe=false;  
                    }
                    else if (password.val().toLowerCase()!==usuarios.password){
                        $('#resultadoLogin').html('Contraseña Incorrecta').css('color','red');
                        usuario.removeClass('is-invalid');
                        usuario.addClass('is-valid');
                        password.addClass('is-invalid');
                        password.focus();
                        existe=false;  
                    }
                    else if (usuario.val().toLowerCase() == usuarios.nombre && password.val().toLowerCase()== usuarios.password) {
                        existe=true;
                    }
                    if ( existe ==true){
                        localStorage.setItem('usuario',usuario.val());   //guardar datos de usuario
                        inicio(listaLibros);
                    }
                }
            }
        });
    });
}
//mostrar mensajes con modal de compra finalizada o cancelada
function mensajes(mensaje){
    $('#modalAlert').append(`
    <div class="modal" tabindex="-1"id="alert">
        <div class="modal-dialog">
            <div class="modal-content text-center">
                <div class="modal-header">
                    <img src="img/fondoHeader.jpg" width="70" height="50"alt="imagen libro"><h5 class="modal-title modal_final-title">Nuevos Aires - Libros</h5>
                </div>
                <div class="modal-body modal-final">
                    ${mensaje}
                </div>
                <div class="modal-footer modal-final">
                <button type="button" class="btn btn-danger"id="btnCerrarModal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
`);
$('#btnCerrarModal').click(()=>{
    location.href='./index.html'; //al hacer click cerrar modal recargar página con datos borrados
})
} 
//mensajes error - modal
function mensajesError(mensaje){
    $('#modalAlert').append(`
    <div class="modal" tabindex="-1"id="alertError">
        <div class="modal-dialog">
            <div class="modal-content text-center">
                <div class="modal-header">
                    <img src="img/fondoHeader.jpg" width="70" height="50"alt="imagen libro"><h5 class="modal-title modal_final-title">Nuevos Aires - Libros</h5>
                </div>
                <div class="modal-body modal-error"id="mensajeError">
                    ${mensaje}
                </div>
            </div>
        </div>
    </div>
    `);
} 
const mensajesAdvertencias =(id,mensaje)=>{   //mensaje carrito vacio
    $(id).append(`
    <div class="toast" role="alert" id="toast">
        <div class="toast-header">
            <img src="img/fondoHeader.jpg" class="rounded mr-2" width="50" height="40"alt="imagen libro">
            <strong class="mr-auto mensaje-toast">Nuevos-Aires  Libros</strong>
        </div>
        <div class="toast-body text-center">
            ${mensaje}
        </div>
    </div>
    `);
}
//datos tarjeta
function comprobarTarjeta(){
    $('#numTarjeta1').on('input',function(){  // comprobar que se ingresen 4 digitos maximo en número de tarjeta
        if (this.value.length >4){
            this.value = this.value.slice(0,4);
        }
    });
    $('#numTarjeta2').on('input',function(){
        if (this.value.length >4){
            this.value = this.value.slice(0,4);
        }
    });
    $('#numTarjeta3').on('input',function(){
        if (this.value.length >4){
            this.value = this.value.slice(0,4);
        }
    });
    $('#numTarjeta4').on('input',function(){
        if (this.value.length >4){
            this.value = this.value.slice(0,4);
        }
    });
    $('#codTarjeta').on('input',function(){
        if(this.value.length >3){
            this.value = this.value.slice(0,3);  // valor ingresado que no sea mayor a 3 digitos
        }
    })
    //comprobar numero de tarjeta
    $('#numTarjeta1').keyup(function(){ //primeros cuatro digitos
        let visa= '<img src="img/visa-logo.png"alt="visa"class="logo-visa"><hr class="linea">';
        let mastercard = '<img src="img/mastercard.png"alt="mastercard"class="logo-mastercard"><hr class="linea">';
        if(this.value >=4000 && this.value <=4999){   // comprobar tarjeta y los 4 digitos - pasar al siguiente campo si es correcto
            $('#logoTarjeta').html(visa).fadeIn('fast');
            $('#numTarjeta2').removeAttr('disabled'); //de 4000-4999 logo visa
            $('#numTarjeta2').focus();
        }
        else if (this.value >=5000 && this.value <=5999){
            $('#logoTarjeta').html(mastercard).fadeIn('fast');  // de 5000-5999 logo mastercard
            $('#numTarjeta2').removeAttr('disabled');
            $('#numTarjeta2').focus();
        }
        else if (this.value.length==4 && (this.value <4000 || this.value >6000)){  // error si los 4 digitos no estan en el rango permitido para detectar tipo de tarjeta
            mensajesError('Número Incorrecto');
            $('#alertError').show();
            $('#alertError').fadeOut(3000);
        }
        else{
            $('#logoTarjeta').html('<img src="img/visamaster.png" alt="logo tarjeta"class="logo-tarjeta"><hr class="linea">');
            $('#numTarjeta1').focus();
            $('#numTarjeta2').attr('disabled','disabled'); //numero menor ó menos de 4 digitos error y deshabilitar inputs
            $('#numTarjeta3').attr('disabled','disabled');
            $('#numTarjeta4').attr('disabled','disabled');
            $('#mesTarjeta').attr('disabled','disabled');
            $('#anioTarjeta').attr('disabled','disabled');
            $('#codTarjeta').attr('disabled','disabled');
            $('#nombreTarjeta').attr('disabled','disabled');
        }
    });
    $('#numTarjeta2').keyup(function(){ //segundos cuatro digitos
        if(this.value.length ==4){
            $('#numTarjeta2').focus();
            $('#numTarjeta3').removeAttr('disabled');// si se ingresan 4 digitos pasar al siguiente
            $('#numTarjeta3').focus();
        }
        else{
            $('#numTarjeta3').attr('disabled','disabled'); // error y deshabilitar inputs
            $('#numTarjeta4').attr('disabled','disabled');
            $('#mesTarjeta').attr('disabled','disabled');
            $('#anioTarjeta').attr('disabled','disabled');
            $('#codTarjeta').attr('disabled','disabled');
            $('#nombreTarjeta').attr('disabled','disabled');
            $('#numTarjeta2').focus(); 
        }
    });
    $('#numTarjeta3').keyup(function(){ //terceros cuatro digitos
        if(this.value.length ==4){
            $('#numTarjeta3').focus();
            $('#numTarjeta4').removeAttr('disabled');// si se ingresan 4 digitos pasar al siguiente
            $('#numTarjeta4').focus();
        }
        else{
            $('#numTarjeta4').attr('disabled','disabled'); // error y deshabilitar inputs
            $('#mesTarjeta').attr('disabled','disabled');
            $('#anioTarjeta').attr('disabled','disabled');
            $('#codTarjeta').attr('disabled','disabled');
            $('#nombreTarjeta').attr('disabled','disabled');    
            $('#numTarjeta3').focus(); 
        }
    });
    $('#numTarjeta4').keyup(function(){ //cuarto cuatro digitos
        if(this.value.length ==4){
            $('#numTarjeta4').focus();
            $('#mesTarjeta').removeAttr('disabled');
            $('#mesTarjeta').focus();
        }
        else{  // error y deshabilitar inputs
            $('#mesTarjeta').attr('disabled','disabled');
            $('#anioTarjeta').attr('disabled','disabled');  
            $('#codTarjeta').attr('disabled','disabled');
            $('#nombreTarjeta').attr('disabled','disabled');
            $('#numTarjeta4').focus();  
        }
    });
    $('#mesTarjeta').change(()=>{  //habilitar año si se elige una opción
        if($('#mesTarjeta').val() !=='mes'){
            $('#anioTarjeta').removeAttr('disabled');
            $('#anioTarjeta').focus();
        }
        else if ($('#mesTarjeta').val() == 'mes'){  // si no se elije deshabilitar inputs
            $('#anioTarjeta').attr('disabled','disabled');
            $('#codTarjeta').attr('disabled','disabled');
            $('#nombreTarjeta').attr('disabled','disabled');
            $('#mesTarjeta').focus();
        }
    });
    $('#anioTarjeta').change(()=>{{  // habilitar cod de tarjeta si se elije año
        if($('#anioTarjeta').val()!=='anio'){
            $('#codTarjeta').removeAttr('disabled');
            $('#codTarjeta').focus();
        }
        else if ($('#anioTarjeta').val()=='anio'){  // si no se elije deshabilitar inputs
            $('#codTarjeta').attr('disabled','disabled');
            $('#nombreTarjeta').attr('disabled','disabled');
            $('#anioTarjeta').focus();
        }
    }});
    $('#codTarjeta').keyup(function(){ //cod seguridad tarjeta verificar que se ingresen todos los digitos
        if(this.value.length ==3){
            $('#nombreTarjeta').removeAttr('disabled'); //si es correcto habilitar input nombre
            $('#nombreTarjeta').focus();
        }
        else {
            $('#nombreTarjeta').attr('disabled','disabled'); // si es incorrecto deshabilitar input nombre
            $('#codTarjeta').focus();
        }
    });
    $('#nombreTarjeta').keyup(function(){ // si la palabra es mayor  a 5 caracteres habilitar boton de finalizar compra
        if(this.value.length >5){
            $('#btnFinalizarCompra').removeAttr('disabled');
        }
        else{
            $('#btnFinalizarCompra').attr('disabled','disabled'); //anular input si son menos de 5 caracteres
        }
    })
} 
//pasar texto en nombre de tarjeta a mayusculas
function textoTarjeta(palabra){
    palabra.value = palabra.value.toUpperCase();
}
const ocultarCollapse=()=>{ //oculta el menu collapse al hacer click en un item
    $('.navbar-nav>li>a').on('click', function(){
            $('.navbar-collapse').collapse('hide');
    });
    $('#btnSearch').click(()=>{
        $('.navbar-collapse').collapse('hide'); //ocultar collapse al hacer click en botón buscar
    })
}
// cargar al iniciar la pagina
$(document).ready(function(){
    // localStorage.clear();    
    inicio(listaLibros);
    formulario();        //función validaciòn de formulario de contacto
    linkContacto();     // función para ir a formulario de contacto con animación
    botonTop();         // función para mostrar el boton Top y volver al inicio del sitio
    scroll();           // función para mostra boton top al hacer scroll    
    menorPrecio();      // función para mostrar libros ordenados por precio de menor a mayor
    novedades();        // función para mostrar los libros por novedad, en este caso los del 2021
    buscar(listaLibros);   // función para buscar los libros según lo que haya escrito el usuario
    cuentaUsuarios();  // función para iniciar sesión y poder realizar la compra
    comprobarTarjeta();   // comprobar datos en tarjeta
    ocultarCollapse(); //ocultar collapse al hacer click en link en celulares
})
