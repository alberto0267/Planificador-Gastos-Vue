//Crea solo para esa moneda
export const formatearCantidad = cantidad =>{

    return Number(cantidad).toLocaleString('es-ES',{

        style:'currency',
        currency:'EUR'

    })


 
}
 //Crea un numero randon con fecha y todo
export const idRandom = ()=>{
 
    const fecha = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2);
    return fecha + random;
}


 //Formateo de fecha en vue-- de locos!

export const fechaBonita = () =>
  new Date().toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 🕒 Solo hora: "13:55"
export const soloHora = () =>
new Date().toLocaleTimeString("es-ES", {
  hour: "2-digit",
  minute: "2-digit",
});

// 📅 Solo fecha: "20/05/2025"
export const soloFecha = () =>
new Date().toLocaleDateString("es-ES", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});