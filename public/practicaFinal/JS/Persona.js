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

//Funcion que realiza una llamada Ajax a la API para conseguir todas las entidades
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


//Funcion que realiza una llamada Ajax a la API para conseguir todos los productos
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


function cargarPersona(){
    var persona = JSON.parse(sessionStorage.getItem("Persona"));
    var div = document.getElementById("divPersona");
    const aside = document.getElementById("asidePersona");
    const h1 = document.createElement("h1");
    const departamentosPersona = persona.entities;
    const productosPersona = persona.products;
    h1.innerHTML = persona.name;
    const h2 = document.createElement("h2");
    h2.id="h2Persona";
    h2.innerHTML = "Fecha de nacimiento: "+persona.birthDate;
    const h3 = document.createElement("h3");
    h3.innerHTML = "Fecha de defunción: "+persona.deathDate;
    const iframe = document.createElement("iframe");
    iframe.src = persona.wikiUrl;
    const imagen = document.createElement("img");
    imagen.src = persona.imageUrl;
    div.appendChild(imagen);
    div.appendChild(h1);
    div.appendChild(h2);
    div.appendChild(h3);
    aside.appendChild(iframe);
    if(departamentosPersona!=null)
    {
        const ul = document.createElement("ul");
        ul.innerText = "Departamentos de los que forma parte: ";
        for(var i=0; i<departamentosPersona.length; i++)
        {
            const departamentos = getEntities();
            for(j=0; j<departamentos.length; j++){
                if(departamentos[j].entity.id===departamentosPersona[i])
                {
                    const li = document.createElement("li");
                    li.innerText = departamentos[j].entity.name;
                    ul.appendChild(li);
                    div.appendChild(ul);
                }
            }
        }
    }
    if(productosPersona!=null)
    {
        const ul2 = document.createElement("ul");
        ul2.innerText = "Productos que ha creado: ";
        for(var i=0; i<productosPersona.length; i++)
        {
            const productos = getProducts();
            for(j=0; j<productos.length; j++){
                if(productos[j].product.id===productosPersona[i])
                {
                    const li2 = document.createElement("li");
                    li2.innerText = productos[j].product.name;
                    ul2.appendChild(li2);
                    div.appendChild(ul2);
                }
            }
        }
    }
    let usuarioActual = sessionStorage.getItem("UsuarioActual");
    let usuarios = getUsers();
    for(var i=0; i<usuarios.length; i++)
    {
        if(usuarios[i].user.username===usuarioActual)
        {
            if(usuarios[i].user.role==="WRITER")
            {
                var idModificacion = "Persona";
                sessionStorage.setItem("idModificacion", idModificacion);     
                const input = document.createElement("input");
                input.setAttribute("type", "button");
                input.setAttribute("value", "modificar datos");
                input.addEventListener("click",() => { window.location.href = "./Modificacion.html";   });
                div.appendChild(input);  
            }
        }
    }
}

