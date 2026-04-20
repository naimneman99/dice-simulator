// HISTORIAL INICIALIZADO VACIO
const timeline = [];

// CONTADOR INICIALIZADO EN 0
let counter = 0

// LOGICA DE TIRADA
function roll() {
  const dice1 = Math.ceil(Math.random() * 6);
  const dice2 = Math.ceil(Math.random() * 6);
  const sum = dice1 + dice2;
  counter = counter + 1;
  timeline.push([dice1, dice2]);
  document.getElementById("first-dice").src = `assets/img/dice-${dice1}.svg`;
  document.getElementById("second-dice").src = `assets/img/dice-${dice2}.svg`;
  document.getElementById("sum").textContent = `${sum}`;
  document.getElementById("counter").textContent = counter;
  renderTimeline();
}

// RENDERIZADO DE HISTORIAL DE TIRADAS
function renderTimeline() {
  const last10 = timeline.slice(-10);
  const ul = document.getElementById("timeline");
  ul.innerHTML = last10
    .map((pair) => `<li>${pair[0]}<small>&</small>${pair[1]}</li>`)
    .join("")
}

// FUNCION RESET A ESTADO INICIAL
function reset() {
  timeline.length = 0;
  counter = 0;
  document.getElementById("sum").textContent = "0";
  document.getElementById("first-dice").src = "assets/img/dice-1.svg";
  document.getElementById("second-dice").src = "assets/img/dice-1.svg";
  document.getElementById("counter").textContent = "0"
  renderTimeline();
}