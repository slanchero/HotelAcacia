class ApiServices {
  constructor() {
    this.URI = "/api/books";
  }

  async getHabitacion(query) {
    const response = await fetch(this.URI + "/?" + query);
    const data = await response.json();
    return data;
  }

  async getHabitacionCompartida(query) {
    const response = await fetch(this.URI + "/comp/?" + query);
    const data = await response.json();
    return data;
  }

  async getParo(query){
    const response = await fetch(this.URI + "/paro?" + query);
    const data = await response.json();
    return data;
  }
}

const api = new ApiServices();

const selectTipo = document.getElementById("type");
const divTipo = document.getElementById("tipoHabitacion");
const divHuesped = document.getElementById("Huespedes");
const inputHuespedes = document.getElementById("huespedes");
const check_in = document.getElementById("check-in");
const check_out = document.getElementById("check-out");
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const btn = document.getElementById("btnbrowser");

selectTipo.addEventListener("change", () => {
  if (selectTipo.value === "3") {
    inputHuespedes.max = 5;
    inputHuespedes.value = 1;
    btn.addEventListener("click",busquedaCompartida)
  } else{
    inputHuespedes.max = 2;
    inputHuespedes.value = 1;
    btn.addEventListener("click", busquedaDobInd);
  } 
});

const busquedaCompartida=async ()=>{
  if(await paro()==0){
    const data = await api.getHabitacionCompartida(
      "fechai=" +
        checkin.value +
        "&fechaf=" +
        checkout.value +
        "&tipo=" +
        selectTipo.value+
        "&n="+inputHuespedes.value
    );
  
    console.log(data)
    if (data.length < 1) {
      document.getElementById("danger").classList.remove("d-none");
      document.getElementById("text-Danger").textContent="No hay habitacion disponible para estas fecha. Intente utilizar otro tipo de habitacion"
    } else {
      window.location.href = `/reservar?fechai=${checkin.value}&fechaf=${checkout.value}&tipo=${selectTipo.value}&n=${inputHuespedes.value }`;
    }
  }else{
    document.getElementById("danger").classList.remove("d-none");
    document.getElementById("text-Danger").textContent="No se pueden realizar reservas en este rango de fechas debio a problemas de orden publico"
  }
}

const busquedaDobInd = async () => {
  if(await paro()==0){
    const data = await api.getHabitacion(
      "fechai=" +
        checkin.value +
        "&fechaf=" +
        checkout.value +
        "&tipo=" +
        selectTipo.value+
        "&n="+inputHuespedes.value
    );
  
    console.log(data)
    if (data.length < 1) {
      document.getElementById("danger").classList.remove("d-none");
      document.getElementById("text-Danger").textContent="No hay habitacion disponible para estas fecha. Intente utilizar otro tipo de habitacion"
    } else {
      window.location.href = `/reservar?fechai=${checkin.value}&fechaf=${checkout.value}&tipo=${selectTipo.value}&n=${inputHuespedes.value }`;
    }
  }else{
    document.getElementById("danger").classList.remove("d-none");
    document.getElementById("text-Danger").textContent="No se pueden realizar reservas en este rango de fechas debio a problemas de orden publico"
  }
};



const paro=async()=>{
  const data = await api.getParo(
    "fechai=" +
      checkin.value +
      "&fechaf=" +
      checkout.value
  );

  console.log(data)
  if(data.length!=0){
    return data[0].FechaEnRango
  }
  return 0
}