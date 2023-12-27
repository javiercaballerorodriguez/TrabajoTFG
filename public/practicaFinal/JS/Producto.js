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



function cargarProducto()
{
    
    var producto = JSON.parse(sessionStorage.getItem("Producto"));
    const div = document.getElementById("producto");
    const aside = document.getElementById("asideProducto");
    const h1 = document.createElement("h1");
    h1.innerHTML = producto.name;
    const h31 = document.createElement("h3");
    h31.id="h2Producto";
    h31.innerHTML = "Fecha de creación: "+ producto.birthDate;
    const h32 = document.createElement("h3");
    h32.innerHTML = "Fecha de finalización: "+ producto.deathDate;
    const h33 = document.createElement("h3");
    h33.innerHTML="Valor del producto: "+ producto.values;
    const iframe = document.createElement("iframe");
    iframe.src=producto.wikiUrl;
    const img = document.createElement("img");
    img.src = producto.imagenUrl;
    div.appendChild(img);
    div.appendChild(h1);
    div.appendChild(h31);
    div.appendChild(h32);
    div.appendChild(h33);
    aside.appendChild(iframe);
    if(producto.persons!=null){
        let personas = getPersons();
        const ul = document.createElement("ul");
        ul.innerText = "Personas relacionadas: ";
        for(i=0; i<producto.persons.length; i++)
        {
            for(j=0; j<personas.length; j++)
            {
                if(producto.persons[i]===personas[j].person.id)
                {
                const li = document.createElement("li");
                li.innerText = personas[j].person.name;
                ul.appendChild(li);
                div.appendChild(ul);
                }
            }
        }
    }
    if(producto.entities!=null){
        let departamentos = getEntities();
        const ulDepartamento = document.createElement("ul");
        ulDepartamento.innerText = "Departamentos relacionados: ";
        for(i=0; i<producto.entities.length; i++)
        {
            for(j=0; j<departamentos.length; j++)
            {
                if(producto.entities[i]===departamentos[j].entity.id)
                {
                    const li = document.createElement("li");
                    li.innerText = departamentos[j].entity.name;
                    ulDepartamento.appendChild(li);
                    div.appendChild(ulDepartamento);
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
                var idModificacion = "Producto";
                sessionStorage.setItem("idModificacion", idModificacion);     
                const input = document.createElement("input");
                input.setAttribute("type", "button");
                input.setAttribute("value", "modificar datos");
                input.addEventListener("click",() => { window.location.href = "./Modificacion.html";  });
                div.appendChild(input);  
            }
        }
    } 
}