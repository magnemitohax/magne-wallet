/*registro de movimientos*/

let transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];

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