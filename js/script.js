// HISTORIAL INICIALIZADO VACIO
const timeline = [];

// CONTADOR RESULTADOS
let contadorresultados = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// CONTADOR INICIALIZADO EN 0
let counter = 0;

// LOGICA DE TIRADA
function roll() {
  const dice1 = Math.ceil(Math.random() * 6);
  const dice2 = Math.ceil(Math.random() * 6);
  const sum = dice1 + dice2;
  counter = counter + 1;
  timeline.push([dice1, dice2]);

  sumacontador(sum);

  document.getElementById("first-dice").src = `assets/img/dice-${dice1}.svg`;
  document.getElementById("second-dice").src = `assets/img/dice-${dice2}.svg`;
  document.getElementById("sum").textContent = `${sum}`;
  document.getElementById("counter").textContent = counter;
 
  renderStats();
}


// FUNCION RESET A ESTADO INICIAL
function reset() {
  timeline.length = 0;
  counter = 0;
  contadorresultados = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  document.getElementById("sum").textContent = "0";
  document.getElementById("first-dice").src = "assets/img/dice-1.svg";
  document.getElementById("second-dice").src = "assets/img/dice-1.svg";
  document.getElementById("counter").textContent = "0";
  renderTimeline();
  renderStats();
}

// FUNCION CONTADOR DE SUMAS
function sumacontador(sum) {
  if (sum >= 2 && sum <= 12) {
    contadorresultados[sum - 2] = contadorresultados[sum - 2] + 1;
  }
}

function renderStats() {
  const filas = document.querySelectorAll(".stats-item"); // BUSCA TODAS LAS FILAS MEDIANTE "estadistica" USADO EN CLASS

  filas.forEach((fila, index) => {
    // RECORRE CADA FILA, CONECTA FILA CON EL ARRAY
    const veces = contadorresultados[index];
    const porcentaje = counter > 0 ? (veces * 100) / counter : 0; // CALCULA PORCENTAJE USANDO CONTADOR

    const contadorSpan = fila.querySelector(".count-value"); // BUSCA DONDE VA A MOSTRAR CUANTAS VECES SALIO
    const porcentajeSpan = fila.querySelector(".percentage-value"); // BUSCA DONDE VA A MOSTRAR EL PORCENTAJE
    const barra = fila.querySelector(".progress-bar"); // BUSCA LA BARRA VISUAL

    contadorSpan.textContent = `${veces} veces`; // ESCRIBE NUMERO DE APARICIONES
    porcentajeSpan.textContent = `${porcentaje.toFixed(1)} %`; // ESCRIBE PORCENTAJE CON UN DECIMAL

    barra.value = porcentaje;
    
  });
}
