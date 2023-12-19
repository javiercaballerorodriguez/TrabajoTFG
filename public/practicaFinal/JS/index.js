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

function logearse() {
    var user = document.getElementById("Username").value;
    var psw = document.getElementById("Password").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/access_token",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.onload = function(){
        if(xhr.status===200)
        {  
            sessionStorage.setItem("UsuarioActual", user);
            sessionStorage.setItem("Password", psw);
            let authHeader = xhr.getResponseHeader('Authorization');
            localStorage.setItem("Autorizacion", authHeader);
            var usuarios = getUsers();
            for(var i=0; i<usuarios.length; i++)
            {
                if(usuarios[i].user.username===user)
                {
                    if(usuarios[i].user.status===false)
                    {
                        window.alert("Lo siento, su usuario está inactivo");
                    }
                    else {
                    window.location.href = 'Login.html';
                    return;
                    }
                }
            }
        } else{
                window.alert("Credenciales incorrectas, por favor introducelas de nuevo");
        }
    }
    xhr.send( "username=" + user + "&password=" + psw );
}


