
document.getElementById(
  "total"
).textContent = `TOTAL:----------------- ${localStorage.getItem("total")} COP`;

const boton = document.getElementById("btn");

boton.addEventListener("click", async () => {
  const url = window.location.href;
  const querys = url.split("&");
  const fechai = querys[0].slice(-10);
  const fechaf = querys[1].slice(-10);
  const id = querys[2].slice(3);
  const n = querys[3].slice(-1);
  const fechaActual = new Date();
  const servicios = await JSON.parse(localStorage.getItem("servicios"));

  const huespedesData = JSON.parse(localStorage.getItem("data"));
  const conf = uuidv4();

  const data = {
    estado: "activa",
    fechai: "'" + fechai + "'",
    fechaf: "'" + fechaf + "'",
    nConfirmacion: conf,
    numeroAcompa: n,
    idHabitacion: id,
    horaCheckin: `'${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}'`,
    horaCheckout: `'${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}'`,
    restaurante: servicios.restaurante,
    transporte: servicios.transporte,
    parqueadero: servicios.parqueadero,
    total: localStorage.getItem("total"),
    totalPersonas: n,
    infoHuespedes: huespedesData,
  };

  const response = await fetch("/api/books/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  localStorage.clear()
  window.location.href = `/bookconfirm`;
});

function uuidv4() {
  const data = [1e7] + 1e3;

  return data
    .replace(
      /[018]/g,
      (c) => crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4))
    )
    .toString(16);
}
