const btnContinuar = document.getElementById("continuar");

const n = document.getElementById("n").getAttribute("name");

var names = [];
var lastNames = [];
var generos = [];
var paises = [];
var checkin = [];
var checkout = [];
var typeDoc = [];
var doc = [];
var emails = [];
var codes = [];
var numeros = [];

for (let i = 0; i < n; i++) {
  names[i] = document.getElementById("nombre-" + i);
  lastNames[i] = document.getElementById("apellido-" + i);
  generos[i] = document.getElementById("genero-" + i);
  paises[i] = document.getElementById("pais-" + i);
  checkin[i] = document.getElementById("checkin-" + i);
  checkout[i] = document.getElementById("checkout-" + i);
  typeDoc[i] = document.getElementById("tipoDoc-" + i);
  doc[i] = document.getElementById("documento-" + i);
  emails[i] = document.getElementById("email-" + i);
  codes[i] = document.getElementById("codigo-" + i);
  numeros[i] = document.getElementById("numero-" + i);
}

btnContinuar.addEventListener("click", (e) => {
  var data = [];
  for (let i = 0; i < n; i++) {
    data[i] = {
      nombre: names[i].value,
      apellido: lastNames[i].value,
      genero: generos[i].value,
      pais: paises[i].value,
      checkin: checkin[i].value,
      checkout: checkout[i].value,
      tipoDocumento: typeDoc[i].value,
      documento: doc[i].value,
      email: emails[i].value,
      code: codes[i].value,
      numero: numeros[i].value,
    };
  }

  const jsonData = JSON.stringify(data);
  console.log(jsonData)
  localStorage.setItem('data', jsonData);

  const url = window.location.href;
  const querys=url.split("&")
  const fechai=querys[0].slice(-10);
  const fechaf=querys[1].slice(-10);
  const id=querys[2].slice(3)
  window.location.href = `/services?fechai=${fechai}&fechaf=${fechaf}&id=${id}&n=${n}`;

});
