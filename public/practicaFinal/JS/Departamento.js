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





function cargarDepartamento()
{
    const department = JSON.parse(sessionStorage.getItem("Departamento"));
    const div = document.getElementById("departamento");
    const aside=document.getElementById("asideDepartamento");
    const h1 = document.createElement("h1");
    h1.innerHTML = department.name;
    const h2 = document.createElement("h2");
    h2.id="h2Departamento";
    h2.innerHTML = "Fecha de creación: "+ department.birthDate;
    const h3 = document.createElement("h3");
    h3.innerHTML = "Fecha de finalización: "+ department.deathDate;
    const iframe = document.createElement("iframe");
    iframe.src = department.wikiUrl;
    const img = document.createElement("img");
    img.src = department.imagenUrl;
    div.appendChild(img);
    div.appendChild(h1);
    div.appendChild(h2);
    div.appendChild(h3);
    aside.appendChild(iframe);
    if(department.persons!=null){
      const ul = document.createElement("ul");
      let personas = getPersons();
      ul.innerText = "Personas relacionadas: ";
      for(i=0; i<department.persons.length; i++)
      {
       for(j=0; j<personas.length; j++)
       {
        if(department.persons[i]===personas[j].person.id)
        {
          const li = document.createElement("li");
          li.innerText = personas[j].person.name;
          ul.appendChild(li);
          div.appendChild(ul);
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
            var idModificacion = "Departamento";
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