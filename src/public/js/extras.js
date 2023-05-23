class ApiServices {
  constructor() {
    this.URI = "/api/books";
  }

  async getRestaurant(query) {
    const response = await fetch("api/books/restaurante?" + query);
    const data = await response.json();
    return data;
  }

  async getTransporte(query) {
    const response = await fetch("api/books/transporte?" + query);
    const data = await response.json();
    return data;
  }
  async getParqueadero(query) {
    const response = await fetch("api/books/parqueadero?" + query);
    const data = await response.json();
    return data;
  }
}

const api = new ApiServices();

const rest = async () => {
  const url = window.location.href;
  const querys = url.split("&");
  const fechai = querys[0].slice(-10);
  const fechaf = querys[1].slice(-10);
  const id = querys[2].slice(3);

  const data = await api.getRestaurant(
    "fechai=" + fechai + "&fechaf=" + fechaf
  );

  console.log(data);

  return data[0].ServicioRestaurante;
};

const trans = async () => {
  const url = window.location.href;
  const querys = url.split("&");
  const fechai = querys[0].slice(-10);
  const fechaf = querys[1].slice(-10);
  const id = querys[2].slice(3);

  const data = await api.getTransporte(
    "fechai=" + fechai + "&fechaf=" + fechaf
  );

  console.log(data);

  return data[0].ServicioTransporte;
};

const parq = async () => {
  const url = window.location.href;
  const querys = url.split("&");
  const fechai = querys[0].slice(-10);
  const fechaf = querys[1].slice(-10);
  const id = querys[2].slice(3);

  const data = await api.getParqueadero(
    "fechai=" + fechai + "&fechaf=" + fechaf
  );

  console.log(data);

  return data[0].ServicioParqueadero;
};

const restaurante = document.getElementById("inputR");
const transporte = document.getElementById("inputT");
const guia = document.getElementById("inputG");
const lavanderia = document.getElementById("inputL");
const parqueadero = document.getElementById("inputP");

const btn=document.getElementById("pay");

restaurante.addEventListener("change", actionE);
transporte.addEventListener("change", actionE);
guia.addEventListener("change", actionE);
lavanderia.addEventListener("change", actionE);
parqueadero.addEventListener("change", actionE);

document.addEventListener("DOMContentLoaded", prin);

total = document.getElementById("total");

var price = window.precio;
var n = window.n;
var fechai = window.fechai;
var fechaf= window.fechaf;
var id = window.id;

var sum = price * n;
console.log(sum);
total.textContent = `TOTAL:----------------- ${sum} COP`;

function actionE(e) {
  if (e.target.checked) {
    document
      .getElementById(`${e.target.id}Label`)
      .classList.remove("invisible");
    sum = sum + parseInt(e.target.name);
  } else {
    document.getElementById(`${e.target.id}Label`).classList.add("invisible");
    sum = sum - parseInt(e.target.name);
  }
  total.textContent = `TOTAL:----------------- ${sum} COP`;
  console.log(sum);
}

async function prin() {
  var resta = await rest();
  var transp = await trans();
  var parqu = await parq();

  var advisorR = document.getElementById("advisorR");
  var advisorP = document.getElementById("advisorP");
  var advisorT = document.getElementById("advisorT");

  if (resta < n) {
    advisorR.textContent = "No hay servicio de restaurante disponible";
    restaurante.disabled = true;
  } else {
    advisorR.textContent = `Cupos disponibles: ${resta}`;
  }

  if (transp < n) {
    advisorT.textContent = "No hay servicio de restaurante disponible";
    transporte.disabled = true;
  } else {
    advisorT.textContent = `Cupos disponibles: ${transp}`;
  }

  if (parqu == 0) {
    advisorP.textContent = "No hay servicio de restaurante disponible";
    parqueadero.disabled = true;
  } else {
    advisorP.textContent = `Cupos disponibles: ${parqu}`;
  }
}


btn.addEventListener("click",()=>{
    localStorage.setItem("total",sum)
    servicios={
      restaurante:restaurante.checked,
      transporte:transporte.checked,
      parqueadero:parqueadero.checked,
    }
    localStorage.setItem("servicios",JSON.stringify(servicios))
    window.location.href = `/pay?fechai=${fechai}&fechaf=${fechaf}&id=${id}&n=${n}`;
})
