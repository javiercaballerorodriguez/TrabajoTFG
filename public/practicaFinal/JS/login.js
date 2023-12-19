function getEntities()
{
    let respuesta=[];
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/v1/entities", false);
   
    xhr.onload = function() {
        if(xhr.status === 200) {
        respuesta = JSON.parse(xhr.response);
        }
    }

    xhr.send();
    return respuesta.entities;
}


function getProducts()
{
    let respuesta=[];
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/v1/products", false);
   
    xhr.onload = function() {
        if(xhr.status === 200) {
        respuesta = JSON.parse(xhr.response);
        }
    }

    xhr.send();
    return respuesta.products;
}

function getPersons()
{
    let respuesta=[];
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/v1/persons", false);
   
    xhr.onload = function() {
        if(xhr.status === 200) {
        respuesta = JSON.parse(xhr.response);
        }
    }
    
    xhr.send();
    return respuesta.persons;
}

function getUsers()
{
    var data = localStorage.getItem("Autorizacion");
    let respuesta=[];
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/v1/users", false);
    xhr.setRequestHeader("Authorization",data);

    xhr.onload = function() {
        if(xhr.status === 200) {
        respuesta = JSON.parse(xhr.response);
        }
    }
    
    xhr.send();
    return respuesta.users;
}



function getData()
{
    let auth = localStorage.getItem('Autorizacion');
    let token = auth.split(' ')[1]; //Elimino 'Bearer'
    let data = JSON.parse(atob(token.split('.')[1]));
    return data;
}



//FUNCIONES DEPARTAMENTO
function guardarDepartamento(event)
{
    const departamentos = getEntities();
    const nombre = event.target.innerHTML;
    for(var i=0; i<departamentos.length; i++)
    {
        if(departamentos[i].entity.name===nombre)
        {
            var departamentosJSON = JSON.stringify(departamentos[i].entity);
            sessionStorage.setItem("Departamento", departamentosJSON);
            return ;
        }
    }
}


function mostrarDepartamentos()
{ 
    let data = getData();
    console.log(data);
    let departamentos = getEntities(); 
    const fila = document.getElementById("filasDepartamentoLogin");
    if(departamentos instanceof Array)
    {
        for(var i=0; i<departamentos.length; i++)
        {
            const td = document.createElement("td");
            const a = document.createElement("a");
            const img = document.createElement("img");
            const br = document.createElement("br");
            const br2 = document.createElement("br");
            img.src = departamentos[i].entity.imageUrl;
            a.onclick = guardarDepartamento;
            a.href = "Departamento.html";
            a.innerHTML= departamentos[i].entity.name;
            td.appendChild(img);
            td.appendChild(br);
            td.appendChild(a);
            td.appendChild(br2);
            fila.appendChild(td);
            if(data.scopes.includes("writer")){
            crearDeleteButton(td);
            }
        }
        if(data.scopes.includes("writer")){
            crearCreateButton(fila);
        }
    }
    else 
    {
        if(data.scopes.includes("writer")){
            crearCreateButton(fila);
        }
    }
}

//Funciones Personas
function guardarPersona(event) {
    const personas = getPersons();
    const nombre = event.target.innerHTML;
    for (var i = 0; i < personas.length; i++) {
        if (personas[i].person.name === nombre) {
            var personaJson = JSON.stringify(personas[i].person);
            sessionStorage.setItem("Persona", personaJson);
            return;
        }
    }
}

function mostrarPersonas() {
    let data = getData();
    let personas = getPersons(); 
    const fila = document.getElementById("filasPersonaLogin");
    if(personas instanceof Array)
    {
        for (var i = 0; i < personas.length; i++) {
            const td = document.createElement("td");
            const a = document.createElement("a");
            const img = document.createElement("img");
            const br = document.createElement("br");
            const br2 = document.createElement("br");
            img.src = personas[i].person.imageUrl;
            a.onclick = guardarPersona;
            a.href = "Persona.html";
            a.innerHTML = personas[i].person.name;
            td.appendChild(img);
            td.appendChild(br);
            td.appendChild(a);
            td.appendChild(br2);
            fila.appendChild(td);
            if(data.scopes.includes("writer")){
                crearDeleteButton(td);
            }
        }
        if(data.scopes.includes("writer")){
            crearCreateButton(fila);
        }
    }
    else {
    if(data.scopes.includes("writer")){
        crearCreateButton(fila);
    }
}
}


//Funciones Productos
function guardarProducto(event) {
    const productos = getProducts();
    const nombre = event.target.innerHTML;
    for (var i = 0; i < productos.length; i++) {
        if (productos[i].product.name === nombre) {
            var productoJSON = JSON.stringify(productos[i].product);
            sessionStorage.setItem("Producto", productoJSON);
            return;
        }
    }
}


function mostrarProductos() {
    let data = getData();
    let productos = getProducts();
    console.log(productos);
    const fila = document.getElementById("filasProductoLogin");
    if(productos instanceof Array)
    {
        for (var i = 0; i < productos.length; i++) {
            const td = document.createElement("td");
            const a = document.createElement("a");
            const img = document.createElement("img");
            const br = document.createElement("br");
            const br2 = document.createElement("br");
            img.src = productos[i].product.imageUrl;
            a.onclick = guardarProducto;
            a.href = "Producto.html";
            a.innerHTML = productos[i].product.name;
            td.appendChild(img);
            td.appendChild(br);
            td.appendChild(a);
            td.appendChild(br2);
            fila.appendChild(td);
            if(data.scopes.includes("writer")){
                crearDeleteButton(td);
            }
        }
        if(data.scopes.includes("writer")){
            crearCreateButton(fila);
        }
    }
    else 
    {
        if(data.scopes.includes("writer")){
            crearCreateButton(fila);
        }
    }
}



function crearCreateButton(fila)
{
    let tdButton = document.createElement("td");
    let input = document.createElement("input");
    input.setAttribute("id", "crearItem");
    input.setAttribute("type", "button");
    input.setAttribute("value", "Crear");
    input.addEventListener("click", () => { irAFormulario(fila); });
    tdButton.appendChild(input);
    fila.appendChild(tdButton);
}



function crearDeleteButton(td)
{
    const input = document.createElement("input");
    input.setAttribute("type", "button");
    input.setAttribute("value", "Eliminar");
    input.addEventListener("click", () => { deleteItem(td); });
    td.appendChild(input);
}


//Crea el boton modificar perfiles en la opcion de "Gestionar Perfiles"
function createButtonModify(place, usuario)
{
    var idModificacion = "Usuario";
    sessionStorage.setItem("idModificacion", idModificacion);    
    const input = document.createElement("input");
    input.setAttribute("type", "button");
    input.setAttribute("value", "Modificar Perfil");
    input.setAttribute("id", "botonModificar");
    input.addEventListener("click",() => {
        let user = usuario;
        sessionStorage.setItem("UsuarioModificacion", user); 
        window.location.href = "./Modificacion.html"; 
    });
    place.appendChild(input);
}


//FUNCION QUE LLEVA AL FORMULARIO Y TE CREA EL ELEMENTO
function irAFormulario(fila)
{
    location.href="./Formulario.html";
    sessionStorage.setItem("idFil", fila.id);
}

function createItem()
{
    window.alert("aqui si");
    if(document.getElementById("form").checkValidity()){
        var data = localStorage.getItem("Autorizacion");
        var variable = sessionStorage.getItem("idFil");
        let body;
        switch(variable)
        {
            case "filasPersonaLogin":
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/api/v1/persons",true);
                xhr.setRequestHeader("Authorization",data);
                xhr.setRequestHeader("content-type","application/json");
                body ={
                    "name": document.getElementById("nombre").value,
                    "birthDate": document.getElementById("fechaNac").value,
                    "deathDate": document.getElementById("fechaDef").value,
                    "wikiUrl": document.getElementById("wiki").value,
                    "imageUrl": document.getElementById("img").value}
                xhr.onload = function(){
                    console.log(xhr.status);
                    if(xhr.status===201)
                    {
                        window.alert("Persona creada con éxito!");
                    }
                    else{
                        window.alert("ERROR, persona no creada");
                    }
                }
                xhr.send(JSON.stringify(body));
                break;



            case "filasProductoLogin":
                window.alert("aqui tambien");
                var listaPersonas = checkValues(document.getElementsByName("ListaPersonas"));
                var listaDepartamentos = checkValues(document.getElementsByName("ListaDepartamentos"));
                let respuesta;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/api/v1/products",true);
                xhr.setRequestHeader("Authorization",data);
                xhr.setRequestHeader("content-type","application/json");
                body ={
                    "name": document.getElementById("nombre").value,
                    "birthDate": document.getElementById("fechaNac").value,
                    "deathDate": document.getElementById("fechaDef").value,
                    "wikiUrl": document.getElementById("wiki").value,
                    "imageUrl": document.getElementById("img").value,
                //    "value": document.getElementById("value").value
                }
                xhr.onload = function(){
                    if(xhr.status===201)
                    {
                        window.alert("Producto creado con éxito!");
                        respuesta=JSON.parse(xhr.response).product;
                        window.alert(JSON.stringify(respuesta));
                    
                        //Se utiliza un for con una longitud equivalente a los departamentos seleccionadas en las checkbox
                        for(i=0; i<listaDepartamentos.length; i++){
                            var xhr2 = new XMLHttpRequest();
                            xhr2.open("PUT", "/api/v1/products/"+respuesta.id+"/entities/add/"+listaDepartamentos[i],false);
                            xhr2.setRequestHeader("Authorization",data);
                            xhr2.onload = function(){
                            }
                            xhr2.send(null);
                        }
                        window.alert("Lista de departamentos creada con exito!")

                        //Utilizamos ahora otro for para realizar los PUTs de las personas que se seleccionan
                        for(i=0; i<listaPersonas.length; i++){
                            var xhr3 = new XMLHttpRequest();
                            xhr3.open("PUT", "/api/v1/products/"+respuesta.id+"/persons/add/"+listaPersonas[i],false);
                            xhr3.setRequestHeader("Authorization",data);
                            xhr3.onload = function(){
                            }
                            xhr3.send(null);
                        }
                        window.alert("Lista de personas creada con exito!")
                    }
                    else{
                        window.alert("ERROR, producto no creado");
                        window.alert(xhr.status);
                    }
                }
                xhr.send(JSON.stringify(body));
                break;



            case "filasDepartamentoLogin":
                var listaPersonas = checkValues(document.getElementsByName("ListaPersonas"));
                let resp;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/api/v1/entities",true);
                xhr.setRequestHeader("Authorization",data);
                xhr.setRequestHeader("content-type","application/json");
                body ={
                    "name": document.getElementById("nombre").value,
                    "birthDate": document.getElementById("fechaNac").value,
                    "deathDate": document.getElementById("fechaDef").value,
                    "wikiUrl": document.getElementById("wiki").value,
                    "imageUrl": document.getElementById("img").value
                }
                xhr.onload = function(){
                    if(xhr.status===201)
                    {
                        window.alert("Departamento creado con éxito!");
                        resp= JSON.parse(xhr.response).entity;

                        //Utilizamos ahora un for para realizar los PUTs de las personas que se seleccionan
                        for(i=0; i<listaPersonas.length; i++){
                            var xhr2 = new XMLHttpRequest();
                            xhr2.open("PUT", "/api/v1/entities/"+resp.id+"/persons/add/"+listaPersonas[i],false);
                            xhr2.setRequestHeader("Authorization",data);
                            xhr2.onload = function(){
                            }
                            xhr2.send(null);
                        }
                        window.alert("Lista de personas creada con exito!")
                    }
                    else{
                        window.alert("ERROR, departamento no creado");
                    }
                }
                xhr.send(JSON.stringify(body));
                break;


            default:
                return ;
        }
    }
}



function deleteItem(item)
{
    var data = localStorage.getItem("Autorizacion");
    if(typeof item === "string"){
        let usuarios = getUsers();
        for(var i=0; i<usuarios.length; i++)
        {
            if(usuarios[i].user.username===item)
            {
                let xhr = new XMLHttpRequest();
                xhr.open("DELETE", "/api/v1/users/"+usuarios[i].user.id, false);
                xhr.setRequestHeader("Authorization", data);
                xhr.onload = function() {
                    if(xhr.status === 204) {
                        window.alert("usuario eliminado correctamente");
                        window.location.reload();
                    }
                    else window.alert("usuario NO eliminado");
                }
                xhr.send();
            }
        }
    }
    else {
        var idFila= item.parentElement.id;
        var nombre = item.children[2].textContent;
        switch(idFila)
        {
            case "filasPersonaLogin":
                var personas = getPersons();
                for(var i=0; i<personas.length; i++)
                {
                    if(personas[i].person.name===nombre)
                    {
                        let xhr = new XMLHttpRequest();
                        xhr.open("DELETE", "/api/v1/persons/"+personas[i].person.id, false);
                        xhr.setRequestHeader("Authorization", data);
                        xhr.onload = function() {
                            if(xhr.status === 204) {
                                window.alert("persona eliminada correctamente");
                                window.location.reload();
                            }
                            else window.alert("persona NO eliminada correctamente");
                        }
                        xhr.send();
                    }
                }
                break;
            case "filasProductoLogin":                      //En el caso de que queramos eliminar un producto:
                var productos = getProducts();
                for(var i=0; i<productos.length; i++)
                {
                    if(productos[i].product.name===nombre)
                    {
                        let xhr = new XMLHttpRequest();
                        xhr.open("DELETE", "/api/v1/products/"+productos[i].product.id, false);
                        xhr.setRequestHeader("Authorization", data);
                        xhr.onload = function() {
                            if(xhr.status === 204) {
                                window.alert("producto eliminado correctamente");
                                window.location.reload();
                            }
                            else window.alert("producto NO eliminado correctamente");
                        }
                        xhr.send();
                    }
                }
                break;
            case "filasDepartamentoLogin":                       //En el caso de que queramos eliminar un departamento:
                var departamentos = getEntities();
                for(var i=0; i<departamentos.length; i++)
                {
                    if(departamentos[i].entity.name===nombre)
                    {
                        let xhr = new XMLHttpRequest();
                        xhr.open("DELETE", "/api/v1/entities/"+departamentos[i].entity.id, false);
                        xhr.setRequestHeader("Authorization", data);
                        xhr.onload = function() {
                            if(xhr.status === 204) {
                                window.alert("departamento eliminado correctamente");
                                window.location.reload();
                            }
                            else window.alert("departamento NO eliminado correctamente");
                        }
                        xhr.send();
                    }
                }
                break;
            default:
                return ;
        }
    }
}


function idUsuario()
{
    let data = getData();
    const form = document.getElementById("nombreUs");
    const a=document.createElement("a");
    a.innerHTML="Bienvenido usuario con identificador: "+ data.sub;
    form.appendChild(a);
}

function verPerfil()
{
    window.location.href="Usuario.html";
}

function cargarDatos()
{
    mostrarDepartamentos();
    mostrarProductos();
    mostrarPersonas();
    idUsuario();
    permisosGestionarPerfiles();
}

function introducirAtributosAlFormulario()
{
    let elemento = sessionStorage.getItem("idFil");
    let inputCrear = document.getElementById("crear");
    /*if(elemento === 'filasProductoLogin'){
         // Crear el campo de value
        let form= document.getElementById("form");
        var valueLabel = document.createElement("label");
        valueLabel.textContent = "Valor: ";
        var inputValue = document.createElement("input");
        inputValue.id="value";
        inputValue.type = "text";
        inputValue.name = "valor";
        var espacio = document.createElement("br");
        form.insertBefore(valueLabel, inputCrear);
        form.insertBefore(inputValue, inputCrear);
      //  form.insertBefore(espacio, inputValue);
    }
    */
    if(elemento === 'filasPersonaLogin'){
    var form = document.getElementById("form");
    const brLast = document.createElement("br");  // Salto de línea antes del botón
    form.insertBefore(brLast, document.getElementById("crear"));
    }
}


//Funciones formulario
function cargarFormulario()
{
    introducirAtributosAlFormulario();
    var idFil = sessionStorage.getItem("idFil");
    var personasArray = getPersons();
    var departamentosArray = getEntities();
    switch(idFil)
    {
        case "filasProductoLogin":
            if(personasArray.length!=0)
            {
                checkBox(personasArray,"Personas involucradas", "ListaPersonas");
            }
            if(departamentosArray.length!=0)
            {
                checkBox(departamentosArray,"Departamentos involucrados", "ListaDepartamentos");
            }
            break;
        case "filasDepartamentoLogin":
            if(personasArray.length!=0)
            {
                checkBox(personasArray,"Personas involucradas", "ListaPersonas");
            }
    }
}

//Funcion que comprueba los valores marcados en las checkbox y los guarda
function checkValues(array)
{
    var arrayReturn=[];
    for(var i=0;i<array.length; i++)
    {
        if(array[i].checked)
        {
            arrayReturn.push(array[i].id);
        }
    }
    return arrayReturn;
}

//Funcion que genera las checkbox cuando se crea un departamento o producto
function checkBox(array, texto, name)
{
    const label = document.createElement("label");
    label.appendChild(document.createTextNode(texto));
    var form = document.getElementById("form");
    var brTitle = document.createElement("br");  // Salto de línea después del título
    label.style.display = "inline";

    const brTitleStart = document.createElement("br"); // Salto de línea antes del título
    form.insertBefore(brTitleStart, document.getElementById("crear"));
    
    form.insertBefore(label, document.getElementById("crear"));
    form.insertBefore(brTitle, document.getElementById("crear"));   // Insertar el salto de línea después del título

    for(var i=0; i<array.length; i++)
    {
        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", name);
        if(name==="ListaPersonas"){ 
            input.setAttribute("id", array[i].person.id);
            input.setAttribute("value", array[i].person.name);
        }
        else if(name==="ListaDepartamentos"){
            input.setAttribute("id", array[i].entity.id);
            input.setAttribute("value", array[i].entity.name);
        }
        input.style.margin = "0 6px";
        form.insertBefore(input, document.getElementById("crear"));

        const labelNombre = document.createElement("label");
        if(name==="ListaPersonas"){ 
            labelNombre.setAttribute("for", array[i].person.name);
            labelNombre.appendChild(document.createTextNode(array[i].person.name));
        }
        else if(name==="ListaDepartamentos"){
            labelNombre.setAttribute("for", array[i].entity.name);
            labelNombre.appendChild(document.createTextNode(array[i].entity.name));
        }
        const brCheckbox = document.createElement("br");  // Salto de línea después de cada checkbox
        form.insertBefore(labelNombre, document.getElementById("crear"));
        form.insertBefore(brCheckbox, document.getElementById("crear"));

        if (i === array.length - 1) {
            const brLast = document.createElement("br");  // Salto de línea antes del botón
            form.insertBefore(brLast, document.getElementById("crear"));
        }
        document.getElementById("crear").style.display="block";
    }
}

function deslogearse()
{
    window.location.href="index.html";
}

function permisosGestionarPerfiles()
{
    let usuarioActual = sessionStorage.getItem("UsuarioActual");
    let usuarios = getUsers();
    for(var i=0; i<usuarios.length; i++)
    {
        if(usuarios[i].user.username===usuarioActual)
        {
            if(usuarios[i].user.role==="READER")
            {
                let li = document.getElementById("manageProfiles");
                li.style.display="none";
            }
        }
    }
}


function gestionarPerfiles()
{
    let div = document.getElementById("modalbody");
    let usuarios = getUsers();
    console.log(usuarios);
    for (var i = 0; i < usuarios.length; i++) {
        const a = document.createElement("a");
        const br = document.createElement("br");
        const br2 = document.createElement("br");
        a.innerHTML = usuarios[i].user.username;
        div.appendChild(a);
        createButtonModify(div, usuarios[i].user.username);
        let inputEliminar = document.createElement("input");
        inputEliminar.setAttribute("type", "button");
        inputEliminar.setAttribute("value", "Eliminar");
        inputEliminar.setAttribute("id", "eliminarUsuario");
        inputEliminar.setAttribute("data-nombre-usuario", usuarios[i].user.username);
        inputEliminar.addEventListener("click", () => { deleteItem(inputEliminar.getAttribute("data-nombre-usuario")); });
        div.appendChild(inputEliminar);
        div.appendChild(br2);
        div.appendChild(br);
    }
}

function cambiarValor()
{
    // Objeto que representa un producto con el campo 'valor'
const producto = {
    valor: 1000, // Valor inicial del producto
    porcentajeDeDepreciacion: 0.2, // Porcentaje de depreciación anual (20%)
  };
  
  // Función para calcular el nuevo valor del producto después de un año
  function calcularNuevoValorProducto(producto) {
    producto.valor *= (1 - producto.porcentajeDeDepreciacion);
    actualizarValorEnPagina(producto.valor); // Llamada a la función que actualiza el valor en la página
  }
  
  // Función para actualizar el valor en la página (sustituye esto con tu propia lógica)
  function actualizarValorEnPagina(nuevoValor) {
    // Actualiza el valor en la página web, por ejemplo, actualizando un elemento HTML
    document.getElementById('valor-producto').textContent = nuevoValor;
  }
  
  // Ejemplo de uso
  console.log("Valor inicial del producto:", producto.valor);
  
  // Configurar un intervalo para llamar a la función cada año (en milisegundos)
  const intervaloAnual = 1000 * 60 * 60 * 24 * 365; // Un año en milisegundos
  setInterval(function() {
    calcularNuevoValorProducto(producto);
  }, intervaloAnual);
  
}