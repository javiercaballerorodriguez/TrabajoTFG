
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


function checkNoValues(array)
{
    var arrayReturn=[];
    for(var i=0;i<array.length; i++)
    {
        if(!array[i].checked)
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
    form.insertBefore(brTitleStart, document.getElementById("modificacion"));
    
    form.insertBefore(label, document.getElementById("modificacion"));
    form.insertBefore(brTitle, document.getElementById("modificacion"));   // Insertar el salto de línea después del título

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
        form.insertBefore(input, document.getElementById("modificacion"));

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
        form.insertBefore(labelNombre, document.getElementById("modificacion"));
        form.insertBefore(brCheckbox, document.getElementById("modificacion"));

        if (i === array.length - 1) {
            const brLast = document.createElement("br");  // Salto de línea antes del botón
            form.insertBefore(brLast, document.getElementById("modificacion"));
        }
        document.getElementById("modificacion").style.display="block";
    }
}




//Funcion que realiza una llamada Ajax a la API para conseguir todas las personas
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



//Funcion que realiza una llamada Ajax a la API para conseguir todas los departamentos
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


function cargarModificacion()
{
    introducirAtributosAlFormulario();
    var usuarioActual = sessionStorage.getItem("UsuarioActual");
    var usuarioModificacion = sessionStorage.getItem("UsuarioModificacion");
    var usuarios = getUsers();
    var item = sessionStorage.getItem("idModificacion");
    var personasArray = getPersons();
    var departamentosArray = getEntities();
    switch(item)
    {
        case "Usuario":
            crearFormularioUsuario();
            for(var i=0; i<usuarios.length; i++){
                if(usuarios[i].user.username===usuarioActual)
                {
                    if(usuarios[i].user.role==="READER")
                    {
                        let opcionStatus = document.getElementById("status");
                        let opcionRol = document.getElementById("rol");
                        let tituloStatus = document.getElementById("labelStatus");
                        let tituloRol = document.getElementById("labelRol");
                        opcionRol.hidden="true";
                        tituloRol.hidden="true";
                        opcionStatus.hidden="true";
                        tituloStatus.hidden="true";
                    }
                    if(usuarioModificacion!=null && usuarioActual!=usuarioModificacion)
                    {
                        let tituloNombre = document.getElementById("labelNombreAp");
                        let inputNombre = document.getElementById("nombreReal");
                        tituloNombre.hidden="true";
                        inputNombre.style.display="none";
                    }
                }
            }
            break;
        case "Persona":
            let form = document.getElementById("form");
            let br = document.createElement("br");
            form.insertBefore(br, document.getElementById("modificacion"));
            break;
        case "Producto":
            checkBox(personasArray,"Personas involucradas", "ListaPersonas");
            checkBox(departamentosArray,"Departamentos involucrados", "ListaDepartamentos");
            break;
        case "Departamento":
            checkBox(personasArray,"Personas involucradas", "ListaPersonas");
    }

}

function tipoContraseña() {
    var passwordInput = document.getElementById("contraseña");
    var icon = document.getElementById("toggleIcon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

function crearFormularioUsuario()
{
    let formAntiguo= document.getElementById("form");
    let form = document.createElement("form");
    let br = document.createElement("br");
    form.setAttribute("id", "form");
    form.setAttribute("action", "Usuario.html");
    form.classList.add("container", "mt-3");  // Añade clases Bootstrap

    // Crear el campo de contraseña
    var contraseñaLabel = document.createElement("label");
    contraseñaLabel.textContent = "Contraseña:";
    contraseñaLabel.classList.add("form-groupContraseña");  // Añade clase Bootstrap
    var inputContraseña = document.createElement("input");
    inputContraseña.id="contraseña";
    inputContraseña.type = "password";
    inputContraseña.name = "contraseña";
    inputContraseña.style.display="block";
    inputContraseña.classList.add("form-control");  // Añade clase Bootstrap
    form.appendChild(contraseñaLabel);
    form.appendChild(inputContraseña);
    
    // Crear el botón de alternar
    var toggleIcon = document.createElement("i");
    toggleIcon.id = "toggleIcon";
    toggleIcon.classList.add("fas", "fa-eye", "toggle-icon");  // Añade clases Bootstrap y personalizadas
    toggleIcon.onclick = tipoContraseña;
    form.appendChild(toggleIcon);

    // Crear el campo de email
    var emailLabel = document.createElement("label");
    emailLabel.textContent = "Email:";
    emailLabel.classList.add("form-groupEmail");  // Añade clase Bootstrap
    var inputEmail = document.createElement("input");
    inputEmail.id="correo";
    inputEmail.type = "text";
    inputEmail.name = "email";
    inputEmail.classList.add("form-control");  // Añade clase Bootstrap
    form.appendChild(emailLabel);
    form.appendChild(inputEmail);

    // Crear el campo de rol
    var rolLabel = document.createElement("label");
    rolLabel.id="labelRol";
    rolLabel.textContent = "Rol:";
    rolLabel.classList.add("form-groupRol");  // Añade clase Bootstrap
    var inputRol = document.createElement("select");
    inputRol.id="rol";
    inputRol.name = "Rol";
    var optionWriter = document.createElement("option");
    optionWriter.value = "WRITER";
    optionWriter.textContent = "Writer";
    var optionReader = document.createElement("option");
    optionReader.value = "READER";
    optionReader.textContent = "Reader";
    inputRol.appendChild(optionWriter);
    inputRol.appendChild(optionReader);
    inputRol.classList.add("form-control");  // Añade clase Bootstrap
    form.appendChild(rolLabel);
    form.appendChild(inputRol);
    
    // Crear el campo de fecha de nacimiento
    var fechaLabel = document.createElement("label");
    fechaLabel.textContent = "Fecha de Nacimiento:";
    fechaLabel.classList.add("form-groupFechaNac");  // Añade clase Bootstrap
    var inputFechaNac = document.createElement("input");
    inputFechaNac.id="fechaNac";
    inputFechaNac.type = "date";
    inputFechaNac.name = "fecha";
    inputFechaNac.classList.add("form-control");  // Añade clase Bootstrap
    form.appendChild(fechaLabel);
    form.appendChild(inputFechaNac);

    // Crear el campo de nombre y apellidos
    var nombreLabel = document.createElement("label");
    nombreLabel.textContent = "Nombre del usuario:";
    nombreLabel.id="labelNombreAp";
    nombreLabel.classList.add("form-groupNombre");  // Añade clase Bootstrap
    var inputNombre = document.createElement("input");
    inputNombre.id="nombreReal";
    inputNombre.type = "text";
    inputNombre.name = "contraseña";
    inputNombre.classList.add("form-control");  // Añade clase Bootstrap
    form.appendChild(nombreLabel);
    form.appendChild(inputNombre);

    //Crear el campo de status
    var statusLabel = document.createElement("label");
    statusLabel.id="labelStatus";
    statusLabel.textContent = "Estado del usuario:";
    statusLabel.classList.add("form-groupStatus");  // Añade clase Bootstrap
    var inputStatus = document.createElement("select");
    inputStatus.id="status";
    inputStatus.name = "Estado";
    var optionTrue = document.createElement("option");
    optionTrue.value = true;
    optionTrue.textContent = "Activo";
    var optionFalse = document.createElement("option");
    optionFalse.value = false;
    optionFalse.textContent = "Inactivo";
    inputStatus.appendChild(optionTrue);
    inputStatus.appendChild(optionFalse);
    inputStatus.classList.add("form-control");  // Añade clase Bootstrap
    form.appendChild(statusLabel);
    form.appendChild(inputStatus);
    form.appendChild(document.createElement("br"));

    //Crear el boton de modificar
    let inputModificar = document.createElement("button");
    inputModificar.id="modificacion";
    inputModificar.type="submit";
    inputModificar.textContent="Modificar Valores";
    inputModificar.classList.add("btn", "btn-primary");
    inputModificar.onclick=modificar;
    form.appendChild(inputModificar);
    formAntiguo.parentNode.replaceChild(form, formAntiguo);
}




function updatePersona(persona)
{
    let data = localStorage.getItem("Autorizacion");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/v1/persons/"+persona.person.id,false);
    xhr.setRequestHeader("content-type","application/json");
    xhr.onload = function(){
        if(xhr.status===200){
            var etag=xhr.getResponseHeader("ETag");
            
            var xhr2 = new XMLHttpRequest();
            xhr2.open("PUT", "/api/v1/persons/"+persona.person.id,true);
            xhr2.setRequestHeader("Authorization",data);
            xhr2.setRequestHeader("If-Match", etag);
            xhr2.setRequestHeader("content-type","application/json");

            if(document.getElementById("nombre").value.length !=0){
                persona.person.name= document.getElementById("nombre").value;
            }
            if(document.getElementById("fechaNac").value.length !=0){
                persona.person.birthDate= document.getElementById("fechaNac").value;
            }
            if(document.getElementById("fechaDef").value.length !=0){
                persona.person.deathDate= document.getElementById("fechaDef").value;
            }
            if(document.getElementById("wiki").value.length !=0){
                persona.person.wikiUrl= document.getElementById("wiki").value;
            }
            if(document.getElementById("img").value.length !=0){
                persona.person.imageUrl= document.getElementById("img").value;
            }
            xhr2.onload = function(){
                if(xhr2.status===209)
                {
                    window.alert("Persona modificada correctamente");
                }
            }
            xhr2.send(JSON.stringify(persona.person));
        }
    }
    xhr.send(null);
}


function updateProducto(producto)
{
    let data = localStorage.getItem("Autorizacion");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/v1/products/"+producto.product.id,false);
    xhr.setRequestHeader("content-type","application/json");
    xhr.onload = function(){
        if(xhr.status===200){
            var etag=xhr.getResponseHeader("ETag");
            
            var xhr2 = new XMLHttpRequest();
            xhr2.open("PUT", "/api/v1/products/"+producto.product.id,false);
            xhr2.setRequestHeader("Authorization",data);
            xhr2.setRequestHeader("If-Match", etag);
            xhr2.setRequestHeader("content-type","application/json");
            if(document.getElementById("nombre").value.length !=0){
                producto.product.name= document.getElementById("nombre").value;
            }
            if(document.getElementById("fechaNac").value.length !=0){
                producto.product.birthDate= document.getElementById("fechaNac").value;
            }
            if(document.getElementById("fechaDef").value.length !=0){
                producto.product.deathDate= document.getElementById("fechaDef").value;
            }
            if(document.getElementById("wiki").value.length !=0){
                producto.product.wikiUrl= document.getElementById("wiki").value;
            }
            if(document.getElementById("img").value.length !=0){
                producto.product.imageUrl= document.getElementById("img").value;
            } 
            if(document.getElementById("value").value.length !=0){
                producto.product.values= document.getElementById("value").value;
            }
            xhr2.onload = function(){
                if(xhr2.status===209)
                { 
                    var listaPersonasNoMarcadas = checkNoValues(document.getElementsByName("ListaPersonas"));
                    var listaPersonasMarcadas = checkValues(document.getElementsByName("ListaPersonas"));
                    for(var k=0; k<listaPersonasMarcadas.length; k++)
                    {
                        var xhr3 = new XMLHttpRequest();
                        xhr3.open("PUT", "/api/v1/products/"+producto.product.id+"/persons/add/"+listaPersonasMarcadas[k],false);
                        xhr3.setRequestHeader("Authorization",data);
                        xhr3.onload = function(){
                        }
                        xhr3.send(null);
                    }
                    for(var j=0; j<listaPersonasNoMarcadas.length; j++)
                    {
                        var xhr3 = new XMLHttpRequest();
                        xhr3.open("PUT", "/api/v1/products/"+producto.product.id+"/persons/rem/"+listaPersonasNoMarcadas[j],false);
                        xhr3.setRequestHeader("Authorization",data);
                        xhr3.onload = function(){
                        }
                        xhr3.send(null);
                    }
                    var listaDepartamentosNoMarcados = checkNoValues(document.getElementsByName("ListaDepartamentos"));
                    var listaDepartamentosMarcados = checkValues(document.getElementsByName("ListaDepartamentos"));
                    for(var k=0; k<listaDepartamentosMarcados.length; k++)
                    {
                        var xhr3 = new XMLHttpRequest();
                        xhr3.open("PUT", "/api/v1/products/"+producto.product.id+"/entities/add/"+listaDepartamentosMarcados[k],false);
                        xhr3.setRequestHeader("Authorization",data);
                        xhr3.onload = function(){
                        }
                        xhr3.send(null);
                    }
                    for(var j=0; j<listaDepartamentosNoMarcados.length; j++)
                    {
                        var xhr3 = new XMLHttpRequest();
                        xhr3.open("PUT", "/api/v1/products/"+producto.product.id+"/entities/rem/"+listaDepartamentosNoMarcados[j],false);
                        xhr3.setRequestHeader("Authorization",data);
                        xhr3.onload = function(){
                        }
                        xhr3.send(null);
                    }
                    window.alert("Producto modificado correctamente");
                }
            }
            xhr2.send(JSON.stringify(producto.product));
        }
    }
    xhr.send(null);
}


function updateDepartamento(departamento)
{
    let data = localStorage.getItem("Autorizacion");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/v1/entities/"+departamento.entity.id,false);
    xhr.setRequestHeader("content-type","application/json");
    xhr.onload = function(){
        if(xhr.status===200){
            var etag=xhr.getResponseHeader("ETag");
            
            var xhr2 = new XMLHttpRequest();
            xhr2.open("PUT", "/api/v1/entities/"+departamento.entity.id,false);
            xhr2.setRequestHeader("Authorization",data);
            xhr2.setRequestHeader("If-Match", etag);
            xhr2.setRequestHeader("content-type","application/json");
            if(document.getElementById("nombre").value.length !=0){
                departamento.entity.name= document.getElementById("nombre").value;
            }
            if(document.getElementById("fechaNac").value.length !=0){
                departamento.entity.birthDate= document.getElementById("fechaNac").value;
            }
            if(document.getElementById("fechaDef").value.length !=0){
                departamento.entity.deathDate= document.getElementById("fechaDef").value;
            }
            if(document.getElementById("wiki").value.length !=0){
                departamento.entity.wikiUrl= document.getElementById("wiki").value;
            }
            if(document.getElementById("img").value.length !=0){
                departamento.entity.imageUrl= document.getElementById("img").value;
            } 
            xhr2.onload = function(){
                if(xhr2.status===209)
                { 
                    var listaPersonasNoMarcadas = checkNoValues(document.getElementsByName("ListaPersonas"));
                    var listaPersonasMarcadas = checkValues(document.getElementsByName("ListaPersonas"));
                    for(var k=0; k<listaPersonasMarcadas.length; k++)
                    {
                        var xhr3 = new XMLHttpRequest();
                        xhr3.open("PUT", "/api/v1/entities/"+departamento.entity.id+"/persons/add/"+listaPersonasMarcadas[k],false);
                        xhr3.setRequestHeader("Authorization",data);
                        xhr3.onload = function(){
                        }
                        xhr3.send(null);
                    }
                    for(var j=0; j<listaPersonasNoMarcadas.length; j++)
                    {
                        var xhr3 = new XMLHttpRequest();
                        xhr3.open("PUT", "/api/v1/entities/"+departamento.entity.id+"/persons/rem/"+listaPersonasNoMarcadas[j],false);
                        xhr3.setRequestHeader("Authorization",data);
                        xhr3.onload = function(){
                        }
                        xhr3.send(null);
                    }
                    window.alert("Departamento modificado correctamente");
                }
            }
            xhr2.send(JSON.stringify(departamento.entity));
        }
    }
    xhr.send(null);
}


function updateUsuario(usuario)
{
    let usuarioActual = sessionStorage.getItem("UsuarioActual");
    let usuarioModificacion = sessionStorage.getItem("UsuarioModificacion");
    let rol = getData();
    let psw = sessionStorage.getItem("Password");
    let data = localStorage.getItem("Autorizacion");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/v1/users/"+usuario.user.id,false);
    xhr.setRequestHeader("Authorization",data);
    xhr.setRequestHeader("content-type","application/json");
    xhr.onload = function(){
        if(xhr.status===200){
            var etag=xhr.getResponseHeader("ETag");
            
            var xhr2 = new XMLHttpRequest();
            xhr2.open("PUT", "/api/v1/users/"+usuario.user.id,false);
            xhr2.setRequestHeader("Authorization",data);
            xhr2.setRequestHeader("If-Match", etag);
            xhr2.setRequestHeader("content-type","application/json");

            if(document.getElementById("contraseña").value.length !=0){
               usuario.user.password=document.getElementById("contraseña").value;
               if(usuarioActual===usuarioModificacion){
               psw= document.getElementById("contraseña").value;
               sessionStorage.setItem("Password", psw);
               }
            }
            if(document.getElementById("correo").value.length !=0){
                usuario.user.email= document.getElementById("correo").value;
            }
            if(document.getElementById("rol").value.length !=0 && rol.scopes.includes("writer")){
                usuario.user.role= document.getElementById("rol").value;
            }
            if(document.getElementById("status").value.length !=0 && rol.scopes.includes("writer")){
                if(document.getElementById("status").value==="false")
                {
                    usuario.user.status= false;
                }
                else usuario.user.status= true;
            }
            if(document.getElementById("nombreReal").value.length !=0){;
                usuario.user.name= document.getElementById("nombreReal").value;
            }
            if(document.getElementById("fechaNac").value.length !=0){;
                usuario.user.birthdate= document.getElementById("fechaNac").value;
            }
            if(usuarioActual!=usuarioModificacion)
            {
                window.location.href="Login.html";
            }
            xhr2.onload = function(){
                if(xhr2.status===209)
                {
                    window.alert("Usuario modificado correctamente");
                }
            }
            xhr2.send(JSON.stringify(usuario.user));
        }
    }
    xhr.send(null);
}


function introducirAtributosAlFormulario()
{
    let elemento = sessionStorage.getItem("idModificacion");
    let inputModificar = document.getElementById("modificacion");
    /*if(elemento === 'Producto'){
         // Crear el campo de value
        let form= document.getElementById("form");
        var valueLabel = document.createElement("label");
        valueLabel.textContent = "Valor: ";
        var inputValue = document.createElement("input");
        inputValue.id="value";
        inputValue.type = "text";
        inputValue.name = "valor";
        form.insertBefore(valueLabel, inputModificar);
        form.insertBefore(inputValue, inputModificar);
    }*/
}

function modificar()
{
    let usuario = sessionStorage.getItem("UsuarioModificacion");
    var item = sessionStorage.getItem("idModificacion");
    switch(item)
    {
        case 'Usuario':
            let usuariosArray = getUsers();
            for(var i=0; i<usuariosArray.length; i++)
            {
                if(usuariosArray[i].user.username===usuario)
                {
                    updateUsuario(usuariosArray[i]);
                }
            }
            break;

        case "Persona":
            let persona = JSON.parse(sessionStorage.getItem("Persona"));
            let personasArray = getPersons();
            for(var i=0; i<personasArray.length; i++)
            {
                if(personasArray[i].person.name===persona.name)
                {
                    updatePersona(personasArray[i]);
                }
            }
            break;
        case "Producto":
            let producto = JSON.parse(sessionStorage.getItem("Producto"));
            let productosArray = getProducts();
            for(var i=0; i<productosArray.length; i++)
            {
                if(productosArray[i].product.name===producto.name)
                {
                    updateProducto(productosArray[i]);
                }
            }
            break;
            
        case "Departamento":
            let departamento = JSON.parse(sessionStorage.getItem("Departamento"));
            let departamentosArray = getEntities();
            for(var i=0; i<departamentosArray.length; i++)
            {
                if(departamentosArray[i].entity.name===departamento.name)
                {
                    updateDepartamento(departamentosArray[i]);
                } 
            }
            break;

        default: 
            return ;
    }
}


