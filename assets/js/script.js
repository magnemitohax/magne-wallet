/*Registro*/

document.getElementById("form-registro").addEventListener("submit", function(event) {
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

document.getElementById("form-login").addEventListener("submit", function (event) {
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


    /*Menú*/

    const usuarioLogueado = localStorage.getItem("usuario");

    if (!usuarioLogueado) {
        window.location.href = "login.html";

    }
    })

    /*saldo*/
        if(localStorage.getItem("saldo") === null){
            localStorage.setItem("saldo", 500000);
    }

    let saldo = Number(localStorage.getItem("saldo"));

    document.querySelector(".saldo").textContent = 
    "$" + saldo.toLocaleString("es-CL")



