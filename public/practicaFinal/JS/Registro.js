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

function mostrarSiguienteFormulario() {
    let nombre = document.getElementById("nombre").value;
    let contraseña = document.getElementById("psw").value;
    if(nombre.length===0 || contraseña.length===0)
    {
        window.alert("por favor rellena los campos obligatorios");
        window.href="Registro.html";
    }
    else{
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/api/v1/users/username/"+nombre,false);
        xhr.setRequestHeader("content-type","application/json");
        xhr.onload = function(){
            if(xhr.status===204)
            {
                window.alert("El nombre del usuario ya existe, por favor, elija otro");
                window.href="Registro.html";
            }
            else{
                let form1=document.getElementById("form1");
                let form2=document.getElementById("form2");
                form1.style.display = "none";
                form2.style.display = "block";
            }
        }
        xhr.send();
    }
}



function crearUsuario()
{
    let data = cabeceraAutenticacion();
    
    var xhr2 = new XMLHttpRequest();
    xhr2.open("POST", "/api/v1/users",false);
    xhr2.setRequestHeader("Authorization",data);
    xhr2.setRequestHeader("content-type","application/json");
    body = {
        "username": document.getElementById("nombre").value,
        "email": document.getElementById("email").value,
        "password": document.getElementById("psw").value,
        "role": "READER",
        "name": document.getElementById("nombreReal").value,
        "birthdate": document.getElementById("fechaNac").value
    }
    xhr2.onload = function(){
        if(xhr2.status===201)
        {
            window.alert("Usuario creado con éxito!");
            window.location.href="index.html";
        }
        else{
            window.alert("ERROR, usuario no creado");
        }
    }
    xhr2.send(JSON.stringify(body));
}


function cabeceraAutenticacion()
{
    let authHeader;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/access_token",false);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.onload = function(){
        if(xhr.status===200)
        {  
            authHeader = xhr.getResponseHeader('Authorization');
        }
    }
    xhr.send("username=" + "adminUser" + "&password=" + "*adminUser*");
    return authHeader;
}