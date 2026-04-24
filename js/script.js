// Array con el historial de pares de dados
const timeline = [];

// Array finito de 11 elementos (valores posibles para las sumas)
const frequencies = new Array(11).fill(0);
let rollCounter = 0;

// Inicializamos la sección de estadísticas
initStats();

function initStats() {
  const ol = document.getElementById("stats-list");
  // Generamos listado de frecuencias
  for (let i = 2; i <= 12; i++) {
    ol.innerHTML += `
      <li class="stat">
        <div class="stat-info">
          <span class="stat-sum-value">${i}</span>
          <span class="stat-count-value">0 veces</span>
          <span class="stat-percentage-value">0.0%</span>
        </div>
        <progress class="stat-progress-bar" value="0" max="100"></progress>
      </li>`;
  }
}

function renderStats() {
  const rows = document.querySelectorAll(".stat"); // Devuelve listado completo de frecuencias
  // Recorre cada fila, conecta fila con el array
  rows.forEach((row, index) => {
    const times = frequencies[index];
    const percentage = rollCounter > 0 ? (times * 100) / rollCounter : 0; // Calcula porcentaje usando contador
    document.getElementById("rollCounter").innerHTML = rollCounter;

    row.querySelector(".stat-percentage-value").textContent = `${percentage.toFixed(1)}%`; // Formate percentil con un decimal
    row.querySelector(".stat-count-value").textContent = `${times} veces`;
    row.querySelector(".stat-progress-bar").value = percentage;
  });
}

function roll() {
  // Randomizamos valores para los dados
  const dice1 = Math.ceil(Math.random() * 6);
  const dice2 = Math.ceil(Math.random() * 6);
  const sum = dice1 + dice2;

  // Aumentamos el acumulador con la suma correspondiente
  frequencies[sum - 2]++;

  rollCounter++;
  document.getElementById("rollCounter").innerHTML = rollCounter;

  // Deshabiltamos btn-roll hasta que se muestren los dados
  document.getElementById("btn-roll").disabled = true;

  // Lanzar dados en escalera
  animateDiceRoll("first-dice", `assets/img/dice-${dice1}.svg`);
  setTimeout(() => {
    animateDiceRoll("second-dice", `assets/img/dice-${dice2}.svg`);
  }, 200);
  setTimeout(() => {
    animateDiceRoll("sum", `${sum}`);
  }, 500);

  // Actualizar y renderizar timeline
  timeline.push([dice1, dice2]);
  renderTimeline();

  // Renderizamos sección de estadísticas por roll
  renderStats();

  // Volvemos a habilitar btn-roll
  setTimeout(() => {
    document.getElementById("btn-roll").disabled = false;
  }, 1400);
}

function reset() {
  // Limpiamos todo
  rollCounter = 0;
  // timeline.length = 0;
  frequencies.fill(0.0);
  clearTimeline();
  // Renderizamos nuevamente
  animateDiceRoll("first-dice", "assets/img/dice-1.svg");
  animateDiceRoll("second-dice", "assets/img/dice-1.svg");
  animateDiceRoll("sum", "2");
  renderStats();
  renderTimeline();
}

// Animation handler para los dados y sum
function animateDiceRoll(id, newAsset) {
  const dice = document.getElementById(id);
  // Transiciona de roll a reveal
  dice.classList.add("roll");
  // Timeout de 0s para que no se superpongan las clases en mismo frame
  setTimeout(() => {
    dice.classList.remove("roll");
    setTimeout(() => {
      // Actualizamos imagen con el dado correspondiente
      if (newAsset !== undefined) dice.src = newAsset;
      // Si el parametro es sum actualizamos con su valor correspondiente
      if (id === "sum") dice.textContent = newAsset;
      // Ejecuta reveal animation
      dice.classList.add("reveal");
      setTimeout(() => dice.classList.remove("reveal"), 500);
    }, 0);
  }, 800);
}

// Refactorización: renderTimeline() ahora cumple con MVC
// Función para renderizar la vista de la timeline sin modificar el modelo
function renderTimeline() {
  const maxItems = 10;
  // validamos para no caer en undefined
  const ul = document.getElementById("timeline");
  if (timeline.length === 0 || ul.length === 0) return;
  // Creamos el nuevo item con la data de timeline
  const lastRoll = timeline[timeline.length - 1];
  const li = document.createElement("li");
  li.className = "timeline-item";
  li.textContent = `${lastRoll[0]};${lastRoll[1]}`;
  // Insertamos el item en la lista
  ul.appendChild(li);
  // Eliminamos el primer item de la lista para insertar otro nuevo luego de superar maxItems
  if (ul.children.length > maxItems) {
    ul.removeChild(ul.firstChild);
  }

  // Alternamos background-color entre items
  const offset = timeline.length - ul.children.length;
  for (let i = 0; i < ul.children.length; i++) {
    if ((i + offset) % 2 !== 0) {
      ul.children[i].classList.add("red");
    } else {
      ul.children[i].classList.remove("red");
    }
  }
}

function clearTimeline() {
  const ul = document.getElementById("timeline");
  ul.innerHTML = "";
}
