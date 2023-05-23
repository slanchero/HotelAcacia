const divResultados = document.getElementById("resultados");

const buttons = divResultados.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const url = window.location.href;
    const querys=url.split("&")
    const fechai=querys[0].slice(-10);
    const fechaf=querys[1].slice(-10);
    const n=querys[3].slice(-1);
    window.location.href = `/book?fechai=${fechai}&fechaf=${fechaf}&id=${button.id}&n=${n}`;
  });
});
