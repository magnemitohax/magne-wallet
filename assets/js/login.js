/*login*/

const formLogin = document.getElementById("form-login");
if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
        e.preventDefault();

            const email = document
                .getElementById("email")
                .value
                .trim()
                .toLowerCase();

            const password = document
                .getElementById("password")
                .value;

            const mensaje =
                document.getElementById("mensaje");

        mensaje.innerHTML = "";

/*usuarios*/

        const usuarios = JSON.parse(
            localStorage.getItem("usuarios") ) || [];

/*busqueda de usuario*/

    const usuarioEncontrado = usuarios.find(
        usuario =>
            usuario.email === email &&
            usuario.password === password
        );

/*validación inicio de sesión*/

    if (!usuarioEncontrado) {
        mensaje.innerHTML = `
            <div class="alert alert-danger">
                Correo o contraseña incorrectos.
            </div>
            `;
            return;
        }

/*mantener sesión abierta*/

        localStorage.setItem(
            "usuarioLogueado",
        JSON.stringify(usuarioEncontrado)
        );

/*mensajes*/

        mensaje.innerHTML = `
            <div class="alert alert-success">
                Bienvenido
                <strong>
                    ${usuarioEncontrado.nombre}
                </strong>
                <br>
                Redireccionando...
            </div>
        `;

/*menú principal*/

        setTimeout(function () {
            window.location.href = "menu.html";
        }, 3000);
    });
}