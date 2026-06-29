/*validar sesión*/

const usuarioLogueado = JSON.parse(
    localStorage.getItem("usuarioLogueado")
);

if (!usuarioLogueado) {
    window.location.href = "login.html";

}

/*mostrar saldo*/

const saldo = document.querySelector(".saldo");

saldo.textContent =
"$" + usuarioLogueado.saldo.toLocaleString("es-CL");

/*depósitos*/

const formDepositar =
document.getElementById("formDepositar");

formDepositar.addEventListener("submit", function(e){
    e.preventDefault();
    const monto = Number(
        document.getElementById("monto").value
    );

    const mensaje =
    document.getElementById("mensaje");
    mensaje.innerHTML = "";

/*validaciones*/

    if (monto <= 0){

        mensaje.innerHTML = `
        <div class="alert alert-danger">
            Debe ingresar un monto válido.
        </div>
        `;
        return;
    }

/*carga de usuarios*/

    let usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    const indice = usuarios.findIndex(
        usuario =>
        usuario.email === usuarioLogueado.email

    );

/*actualización saldo*/

    usuarios[indice].saldo += monto;

/*registro de movimientos*/

    usuarios[indice].movimientos.push({
        tipo: "Depósito",
        monto: monto,
        fecha: new Date().toLocaleString("es-CL")
    });

/*guardar usuarios*/

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    localStorage.setItem(
        "usuarioLogueado",
        JSON.stringify(usuarios[indice])
    );

/*actualizar pagina*/

    saldo.textContent =
    "$" +
    usuarios[indice].saldo.toLocaleString("es-CL");
    mensaje.innerHTML = `
        <div class="alert alert-success">
            Depósito realizado correctamente.
        </div>
    `;
    formDepositar.reset();

});

/*logout*/

const btnLogout =
document.getElementById("logout");
btnLogout.addEventListener("click", function(){
    localStorage.removeItem(
        "usuarioLogueado"
    );
    window.location.href =
        "login.html";
});