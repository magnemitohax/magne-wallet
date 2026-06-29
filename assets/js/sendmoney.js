/*validar sesión*/

const usuarioLogueado = JSON.parse(
    localStorage.getItem("usuarioLogueado")
);

if (!usuarioLogueado) {
    window.location.href = "login.html";
}

/*saldo*/

document.querySelector(".saldo").textContent =
    "$" + usuarioLogueado.saldo.toLocaleString("es-CL");

/*transferencia*/

const formTransfer =
    document.getElementById("form-transfer");

formTransfer.addEventListener("submit", function (e) {

    e.preventDefault();

    const emailDestino =
        document.getElementById("email").value.trim().toLowerCase();
    const monto =
        Number(document.getElementById("monto").value);
    const clave =
        document.getElementById("clave").value;
    const frecuente =
        document.getElementById("frecuente").checked;
    const mensaje =
        document.getElementById("mensaje");

    mensaje.innerHTML = "";

    let usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];

    const indiceOrigen =
        usuarios.findIndex(
            u => u.email === usuarioLogueado.email
        );

    const indiceDestino =
        usuarios.findIndex(
            u => u.email === emailDestino
        );

/*validaciones destinatiario*/

    if (indiceDestino === -1) {
        mensaje.innerHTML = `
        <div class="alert alert-danger">
            El destinatario no existe.
        </div>
        `;
        return;

    }

    if (indiceOrigen === indiceDestino) {
        mensaje.innerHTML = `
        <div class="alert alert-warning">
            No puedes transferirte a ti mismo.
        </div>
        `;
        return;

    }

    if (clave !== usuarios[indiceOrigen].password) {
        mensaje.innerHTML = `
        <div class="alert alert-danger">
            Contraseña incorrecta.
        </div>
        `;
        return;

    }

    if (monto <= 0) {
        mensaje.innerHTML = `
        <div class="alert alert-danger">
            Debe ingresar un monto válido.
        </div>
        `;
        return;

    }

    if (monto > usuarios[indiceOrigen].saldo) {
        mensaje.innerHTML = `
        <div class="alert alert-danger">
            Saldo insuficiente.
        </div>
        `;
        return;
    }

/*saldos actualizados*/

    usuarios[indiceOrigen].saldo -= monto;

    usuarios[indiceDestino].saldo += monto;

/*movimientos del emisor*/

    usuarios[indiceOrigen].movimientos.push({
        tipo: "Transferencia enviada",
        destinatario:
            usuarios[indiceDestino].nombre,
        monto: monto,
    fecha: new Date().toLocaleString("es-CL")
    });


/*destinatario frecuente*/

    if (frecuente) {
        if (!usuarios[indiceOrigen].contactos) {
            usuarios[indiceOrigen].contactos = [];
        }

        const existe = usuarios[indiceOrigen]
            .contactos
            .some(c => c.email === usuarios[indiceDestino].email);

        if (!existe) {
            usuarios[indiceOrigen].contactos.push({
                nombre: usuarios[indiceDestino].nombre,
                usuario: usuarios[indiceDestino].usuario,
                email: usuarios[indiceDestino].email
            });

        }

    }

/*guardar contactos*/

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    localStorage.setItem(
        "usuarioLogueado",
        JSON.stringify(usuarios[indiceOrigen])
    );

/*actualización de saldos*/

    document.querySelector(".saldo").textContent =
        "$" +
        usuarios[indiceOrigen].saldo.toLocaleString("es-CL");

    mensaje.innerHTML = `
    <div class="alert alert-success">
        Transferencia realizada correctamente.
    </div>
    `;
    formTransfer.reset();

});

/*logout*/

const btnLogout =
    document.getElementById("logout");

if (btnLogout) {
    btnLogout.addEventListener("click", function () {
        localStorage.removeItem("usuarioLogueado");
        window.location.href = "login.html";

    });

}