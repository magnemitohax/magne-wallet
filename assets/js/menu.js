/*validar sesión*/

const usuarioLogueado = JSON.parse(
    localStorage.getItem("usuarioLogueado")
);

if (!usuarioLogueado) {
    window.location.href = "login.html";
}

/*datos menú principal*/

const bienvenida =
document.getElementById("bienvenida");

const saldo =
document.querySelector(".saldo");

if (bienvenida) {
    bienvenida.textContent =
    `Hola, ${usuarioLogueado.nombre} 👋`;
}

if (saldo) {
    saldo.textContent =
    "$" + usuarioLogueado.saldo.toLocaleString("es-CL");
}

/*logout*/

const btnLogout =
document.getElementById("logout");

if (btnLogout) {
    btnLogout.addEventListener("click", function () {
        localStorage.removeItem(
            "usuarioLogueado"
        );

        window.location.href =
        "login.html";

    });

}