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

/*
function cargarUsuario()
{
    let usuarioActual = sessionStorage.getItem("UsuarioActual");
    let psw = sessionStorage.getItem("Password");
    let usuarios = getUsers();
    console.log(usuarios);
    for(i=0; i<usuarios.length; i++)
    {
        if(usuarios[i].user.username===usuarioActual)
        {
            const div = document.getElementById("usuario");
            const h1 = document.createElement("h1");
            h1.innerHTML = "PERFIL DEL USUARIO";
            h1.id="tituloPerfil";
            const h21 = document.createElement("h2");
            h21.innerHTML = "Username: "+usuarios[i].user.username;
            const h22 = document.createElement("h2");
            h22.innerHTML = "Contraseña del usuario: "+ psw;//El usuario es igual que la contraseña 
            const h23 = document.createElement("h2");
            h23.innerHTML = "Correo electrónico del usuario: "+usuarios[i].user.email;
            const h24 = document.createElement("h2");
            h24.innerHTML = "Rol del usuario: "+usuarios[i].user.role;
            const h25 = document.createElement("h2");
            h25.innerHTML = "Identificador del usuario: "+usuarios[i].user.id;
            const h27 = document.createElement("h2");
            h27.innerHTML = "Fecha de nacimiento del usuario: "+usuarios[i].user.birthdate;
            div.appendChild(h1);
            div.appendChild(h21);
            div.appendChild(h25);
            div.appendChild(h22);
            div.appendChild(h23);
            if(usuarios[i].user.name!=''){
                const h26 = document.createElement("h2");
                h26.innerHTML = "Nombre y apellidos: "+usuarios[i].user.name;
                div.appendChild(h26);
            }
            div.appendChild(h27);
            div.appendChild(h24);
            createButtonBack(div);
            createButtonModify(div, usuarios[i].user.username);
        }
    }
}
*/


function cargarUsuario() {
    let usuarioActual = sessionStorage.getItem("UsuarioActual");
    let psw = sessionStorage.getItem("Password");
    let usuarios = getUsers();
    console.log(usuarios);

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].user.username === usuarioActual) {
            const div = document.getElementById("usuario");
            const container = document.createElement("div");
            container.classList.add("container", "mt-5");

            // Crear la tarjeta principal
            const card = document.createElement("div");
            card.classList.add("card");
            const img = document.createElement("img");
            img.src = "https://media.licdn.com/dms/image/D4D16AQFms2HtCp5ooQ/profile-displaybackgroundimage-shrink_200_800/0/1687126726632?e=2147483647&v=beta&t=5AqtmglAEHSu9SFcdzn0Uk7zOJNMZQUOyd8MZDO__bI";
            img.classList.add("card-img-top");
            img.alt = "Imagen de usuario";
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            const h2Title = document.createElement("h2");
            h2Title.classList.add("card-title");
            h2Title.innerHTML = usuarios[i].user.username;
            const pEmail = document.createElement("p");
            pEmail.classList.add("card-text");
            pEmail.innerHTML = usuarios[i].user.email;
            pEmail.style.textAlign = 'center';

            // Agregar elementos a la tarjeta principal
            cardBody.appendChild(h2Title);
            cardBody.appendChild(pEmail);
            card.appendChild(img);
            card.appendChild(cardBody);
            container.appendChild(card);

            // Crear tarjeta de Información Personal
            const personalCard = document.createElement("div");
            personalCard.classList.add("card", "mt-3");
            const personalHeader = document.createElement("div");
            personalHeader.classList.add("card-header");
            const h3Personal = document.createElement("h3");
            h3Personal.innerHTML = "Información Personal";
            const personalBody = document.createElement("div");
            personalBody.classList.add("card-body");
            const row = document.createElement("div");
            row.classList.add("row");

            // Columna 1
            const col1 = document.createElement("div");
            col1.classList.add("col-md-6");
            const pBirthdate = document.createElement("p");
            pBirthdate.innerHTML = '<strong>Fecha de Nacimiento: </strong>' + (usuarios[i].user.birthdate || 'N/A');
            const pGender = document.createElement("p");
            pGender.innerHTML = '<strong>Género: </strong>' + (usuarios[i].user.gender || 'N/A');
            const pPhone = document.createElement("p");
            pPhone.innerHTML = '<strong>Teléfono: </strong>' + (usuarios[i].user.phone || 'N/A');

            // Agregar elementos a la columna 1
            col1.appendChild(pBirthdate);
            col1.appendChild(pGender);
            col1.appendChild(pPhone);

            // Columna 2
            const col2 = document.createElement("div");
            col2.classList.add("col-md-6");
            const pAddress = document.createElement("p");
            pAddress.innerHTML = '<strong>Dirección: </strong>' + (usuarios[i].user.address || 'N/A');
            const pCity = document.createElement("p");
            pCity.innerHTML = '<strong>Ciudad: </strong>' + (usuarios[i].user.city || 'N/A');
            const pCountry = document.createElement("p");
            pCountry.innerHTML = '<strong>País: </strong>' + (usuarios[i].user.country || 'N/A');

            // Agregar elementos a la columna 2
            col2.appendChild(pAddress);
            col2.appendChild(pCity);
            col2.appendChild(pCountry);

            // Agregar elementos a la fila
            row.appendChild(col1);
            row.appendChild(col2);

            // Agregar elementos a la tarjeta de Información Personal
            personalHeader.appendChild(h3Personal);
            personalBody.appendChild(row);
            personalCard.appendChild(personalHeader);
            personalCard.appendChild(personalBody);
            container.appendChild(personalCard);

            // Crear tarjeta de Otros Detalles
            const detailsCard = document.createElement("div");
            detailsCard.classList.add("card", "mt-3");
            const detailsHeader = document.createElement("div");
            detailsHeader.classList.add("card-header");
            const h3Details = document.createElement("h3");
            h3Details.innerHTML = "Otros Detalles";
            const detailsBody = document.createElement("div");
            detailsBody.classList.add("card-body");
            const rowDetails = document.createElement("div");
            rowDetails.classList.add("row");

            // Columna 1
            const colDetails1 = document.createElement("div");
            colDetails1.classList.add("col-md-6");
            const pPassword = document.createElement("p");
            pPassword.innerHTML = '<strong>Contraseña: </strong>' + (psw|| 'N/A');
            const pId = document.createElement("p");
            pId.innerHTML = '<strong>Identificador: </strong>' + (usuarios[i].user.id || 'N/A');
            const pRole = document.createElement("p");
            pRole.innerHTML = '<strong>Rol: </strong>' + (usuarios[i].user.role || 'N/A');
          
            // Agregar elementos a la columna 1
            colDetails1.appendChild(pPassword);
            colDetails1.appendChild(pId);
            colDetails1.appendChild(pRole);


            // Columna 2
            const colDetails2 = document.createElement("div");
            colDetails2.classList.add("col-md-6");
            const pStatus = document.createElement("p");
            if(usuarios[i].user.status===true){ pStatus.innerHTML = '<strong>Estado: </strong>' + ("Activo"); }
            else if(usuarios[i].user.status===false){ pStatus.innerHTML = '<strong>Estado: </strong>' + ('Inactivo'); }
            else pStatus.innerHTML = '<strong>Estado: </strong>' + ('N/A');
            const pRegistrationDate = document.createElement("p");
            pRegistrationDate.innerHTML = '<strong>Fecha de Registro: </strong>' + (usuarios[i].user.registrationDate || 'N/A');

            // Agregar elementos a la columna 2
            colDetails2.appendChild(pStatus);
            colDetails2.appendChild(pRegistrationDate);


            // Agregar columnas a la fila de Otros Detalles
            rowDetails.appendChild(colDetails1);
            rowDetails.appendChild(colDetails2);

            // Agregar elementos a la tarjeta de Otros Detalles
            detailsHeader.appendChild(h3Details);
            detailsBody.appendChild(rowDetails);
            detailsCard.appendChild(detailsHeader);
            detailsCard.appendChild(detailsBody);
            container.appendChild(detailsCard);

            const lineBreak = document.createElement("br");
            container.appendChild(lineBreak);

            div.appendChild(container);

            createButtonBack(div);
            createButtonModify(div, usuarios[i].user.username);
        }
    }
}

function createButtonBack(place)
{
    const input = document.createElement("input");
    input.setAttribute("type", "button");
    input.setAttribute("value", "Volver al inicio");
    input.setAttribute("id", "botonVolver");
    input.addEventListener("click",() => { window.location.href = "./Login.html"; });
    place.appendChild(input);
}

function createButtonModify(place, user)
{
    var idModificacion = "Usuario";
    sessionStorage.setItem("idModificacion", idModificacion);    
    const input = document.createElement("input");
    input.setAttribute("type", "button");
    input.setAttribute("value", "Modificar Perfil");
    input.setAttribute("id", "botonModificar");
    input.addEventListener("click",() => { 
        window.location.href = "./Modificacion.html";
        sessionStorage.setItem("UsuarioModificacion", user); 
        window.location.href = "./Modificacion.html"; 
    });
    place.appendChild(input);
}