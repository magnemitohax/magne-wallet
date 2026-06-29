/*registro de usuarios*/

const formRegistro = document.getElementById("form-registro");

if (formRegistro) {
    formRegistro.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const fono = document.getElementById("fono").value.trim();
        const nacimiento = document.getElementById("nacimiento").value;
        const password = document.getElementById("password").value;
        const confirmar = document.getElementById("confirmarpassword").value;

        const mensaje = document.getElementById("mensaje");

        mensaje.innerHTML = "";

/*validaciones*/

        if (
            !nombre ||
            !email ||
            !fono ||
            !nacimiento ||
            !password ||
            !confirmar
        ) {

            mensaje.innerHTML = `
                <div class="alert alert-danger">
                    Debe completar todos los campos.
                </div>
            `;
            return;
        }

        if (password.length < 8) {

            mensaje.innerHTML = `
                <div class="alert alert-warning">
                    La contraseña debe tener al menos 8 caracteres.
                </div>
            `;
            return;
        }

        if (password !== confirmar) {

            mensaje.innerHTML = `
                <div class="alert alert-danger">
                    Las contraseñas no coinciden.
                </div>
            `;
            return;
        }

/*usuarios*/

        let usuarios =
            JSON.parse(localStorage.getItem("usuarios")) || [];

/*email ya en uso*/

        const existeEmail = usuarios.some(
            usuario => usuario.email === email
        );

        if (existeEmail) {
            mensaje.innerHTML = `
                <div class="alert alert-warning">
                    Ya existe una cuenta registrada con ese correo.
                </div>
            `;
            return;
        }

/*nombre de usuario*/

        let usuario = email.split("@")[0];
        let contador = 1;
            while (
            usuarios.some(
                u => u.usuario === usuario
            )
        ) {
            usuario = email.split("@")[0] + contador;
            contador++;

        }

/*nuevo usuario*/

        const nuevoUsuario = {
            id: Date.now(),
            nombre,
            usuario,    
            email,
            fono,
            nacimiento,
            password,   
            saldo: 500000,
            contactos: [],
            movimientos: [],
            fechaRegistro:
                new Date().toLocaleString("es-CL")

        };

        usuarios.push(nuevoUsuario);
        localStorage.setItem(
        "usuarios",
            JSON.stringify(usuarios)
        );

        mensaje.innerHTML = `
            <div class="alert alert-success">
                Registro realizado correctamente.
            <hr>
                Tu nombre de usuario es:
                <strong>@${usuario}</strong>
                <br><br>
                Serás redirigido al Login.
            </div>
        `;

        formRegistro.reset();

        setTimeout(function () {
            window.location.href = "login.html";
        }, 3000);

    });

}