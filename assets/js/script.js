/*Registro*/

const formRegistro = document.getElementById("form-registro");

if (formRegistro) {

    formRegistro.addEventListener("submit", function(event) {

        event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const fono = document.getElementById("fono").value;
    const nacimiento = document.getElementById("nacimiento").value;
    const password = document.getElementById("password").value;
    const confirmarPassword = document.getElementById("confirmarpassword").value;

    if (password !== confirmarPassword) {
        document.getElementById("mensaje").innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            Las contraseñas no coinciden
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
        `
        return;
    };

    const nuevoUsuario = {
        nombre,
        email,
        fono,
        nacimiento,
        password,
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios))

    document.getElementById("mensaje").innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            Registro exitoso, redirigiendo....
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
        `
    setTimeout(() => {
        window.location.href = "login.html";

    }, 3000);

})

/*Inicio de sesión*/

const formLogin = document.getElementById("form-login");

if (formLogin) {

    formLogin.addEventListener("submit", function(event) {

        event.preventDefault();

    const usuario = document.getElementById("nombre").value;
    const password = document.getElementById("password").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(function (user) {
        return user.email === usuario && 
                user.password === password;

        if (usuarioEncontrado) {

            localStorage.setItem("usuarioLogueado", JSON.stringify("usuarioEncontrado"))

            document.getElementById("mensaje").innerHTML = `
            <div class="alert alert-sucess alert-dismissible fade show" role="alert">
            Inicio de sesión exitoso, redirigiendo....
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
            `

            setTimeout(() => {
                window.location.href = "menu.html"
            }, 3000);
        } else {
            `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            usuario y/o contraseña incorrecta
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
        `
        }

    })

    /*cierre de sesión*/

    document.getElementByiD("logout").addEventListener
        ("click", function () {
            localStorage.removeItem("usuarioLogueado");
            window.location.href = "login.html";

        })

    /*cierra sesiones activas*/
        localStorage.removeItem("usuarioLogueado");

    /*redirecciona la inicio*/
        window.location.href = "login.html";
    
});



    /*menú*/

    const usuarioLogueado = localStorage.getItem("usuario");

    if (!usuarioLogueado) {
        window.location.href = "login.html";

    }


    /*saldo*/
        /*saldo inicial*/
        if(localStorage.getItem("saldo") === null){
            localStorage.setItem("saldo", 500000);
    }

        /*saldo actualizado*/
    let saldo = Number(localStorage.getItem("saldo"));

        /*muestra el saldo actual*/
    document.querySelector(".saldo").textContent = 
    "$" + saldo.toLocaleString("es-CL")

}}



    /*usuario logueado*/
    
        const usuarioLogueado = JSON.parse(
            localStorage.getItem("usuarioLogueado")
    );

    /*redirección sin login*/

        if (!usuarioLogueado) {
            window.location.href = "login.html";
}


/*destinatarios*/

const inputBusqueda = document.getElementById("buscarUsuario");
const listaUsuarios = document.getElementById("listaUsuarios");

// Obtener usuarios guardados
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

inputBusqueda.addEventListener("input", function () {

    const texto = this.value.toLowerCase();

    // Limpiar resultados anteriores
    listaUsuarios.innerHTML = "";

    // Si no escribió nada
    if (texto === "") {
        return;
    }

    // Filtrar usuarios
    const resultados = usuarios.filter(usuario =>
        usuario.usuario !== usuarioLogueado.usuario && (
            usuario.nombre.toLowerCase().includes(texto) ||
            usuario.usuario.toLowerCase().includes(texto)
        )
    );

    // Mostrar resultados
    resultados.forEach(usuario => {

        const item = document.createElement("button");

        item.type = "button";
        item.classList.add("list-group-item", "list-group-item-action");

        item.innerHTML = `
            <strong>${usuario.nombre}</strong>
            <br>
            <small>@${usuario.usuario}</small>
        `;

        // Seleccionar usuario
        item.addEventListener("click", function () {
            inputBusqueda.value = usuario.usuario;
            listaUsuarios.innerHTML = "";
        });

        listaUsuarios.appendChild(item);
    });

});


    /*transferencias*/

document.getElementById("formEnvio").addEventListener("submit", function (e) {

    /*evitar recarga*/
    e.preventDefault();

    /*datos destinatario*/
    const destinatario =
        document.getElementById("buscarUsuario").value.trim();

    const monto =
        Number(document.getElementById("monto").value);

    /*saldo actualizado*/
    let saldo =
        Number(localStorage.getItem("saldo"));

/*validaciones*/


    /*destinatario*/
    if (!destinatario) {

        document.getElementById("mensaje").innerHTML = `
                    <div class="alert alert-danger">
                        Debe seleccionar un destinatario.
                    </div>
                `;

        return;
    }

    /*monto a enviar*/
    if (monto <= 0) {

        document.getElementById("mensaje").innerHTML = `
                <div class="alert alert-danger">
                    Debe ingresar un monto válido.
                </div>
            `;

        return;
    }

    /*monto disponible*/
    if (monto > saldo) {

        document.getElementById("mensaje").innerHTML = `
                <div class="alert alert-danger">
                    Saldo insuficiente.
                </div>
            `;

        return;
    }

    /*saldo actualizado*/

    saldo -= monto;

    localStorage.setItem("saldo", saldo);

/*registro de movimientos*/

    let transacciones =
        JSON.parse(
            localStorage.getItem("transacciones")
        ) || [];

    transacciones.push({

        tipo: "envio",
        destinatario: destinatario,
        monto: monto,
        fecha: new Date().toLocaleString("es-CL")

    });

    localStorage.setItem(
        "transacciones",
        JSON.stringify(transacciones)
    );

    /*mensajes de interfaz*/

    /*mensaje de exito*/
    document.getElementById("mensaje").innerHTML = `
            <div class="alert alert-success">
                Transferencia realizada correctamente.
            </div>
        `;

    /*cambio saldo a moneda local*/
    document.querySelector(".saldo").textContent =
        "$" + saldo.toLocaleString("es-CL");

    /*reinicio formulario*/
    this.reset();

    /*duración mensaje*/
    setTimeout(() => {
        document.getElementById("mensaje").innerHTML = "";
    }, 3000);

});