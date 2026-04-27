
// Array finito de 11 elementos (valores posibles para las sumas)
const frequencies = new Array(11).fill(0);
let rollCounter = 0;

// Inicializamos la sección de estadísticas
initStats();

function initStats() {
  const ol = document.getElementById("stats-list");

  ol.innerHTML = ""; // Limpiamos cualquier contenido previo

  // Generamos listado de frecuencias
  for (let i = 2; i <= 12; i++) {
    ol.innerHTML += `
      <li class="stat">
        <div class="stat-info">
          <span class="stat-dice-value">${i}</span>
          <span class="stat-count-value">0 veces</span>
          <span class="stat-percentage-value">0.0%</span>
        </div>
        <div class="stat-progress-bar">
          <div class="stat-progress-bar-fill" style="width: 0%"></div>
        </div>
      </li>`;
  }
}

function renderStats() {

  // Actualizamos el contador total de tiradas
  const counterElement = document.getElementById("rollCounter");
  if (counterElement) {
    counterElement.textContent = rollCounter;
  }

  // Traemos todas las filas de la lista de estadísticas y la recorremos para actualizar sus valores
  const rows = document.querySelectorAll(".stat");
  rows.forEach((row, index) => {
    
    // Obtenemos la cantidad de veces que se ha obtenido cada suma a partir del array de frecuencias
    const times = frequencies[index];

    // Calculamos el porcentaje respecto al total de tiradas
    const percentage = rollCounter > 0 ? (times * 100) / rollCounter : 0;
    
    // Actualizamos los textos (Porcentaje y Cantidad)
    row.querySelector(".stat-percentage-value").textContent = `${percentage.toFixed(1)}%`;
    row.querySelector(".stat-count-value").textContent = `${times} veces`;

    // Actualizamos el ancho de la barra de progreso (DIV de relleno)
    const fill = row.querySelector(".stat-progress-bar-fill");

    if (fill) {
      // Le pasamos el porcentaje directamente al ancho del CSS
      fill.style.width = `${percentage}%`;
    }
  });
}

function roll() {
  playDiceSound(); // Dispara el pitido sintetizado
  // Randomizamos valores para los dados (del 1 al 6)
  const dice1 = Math.ceil(Math.random() * 6);
  const dice2 = Math.ceil(Math.random() * 6);
  
  const sum = dice1 + dice2;

  // Actualizamos el contador total y el array de frecuencias
  rollCounter++;
  frequencies[sum - 2]++;
  
  const btnRoll = document.getElementById("btn-roll");
  btnRoll.disabled = true; // Evita múltiples clicks durante la animación

  // Animaciones en "escalera"
  animateDiceRoll("first-dice", `assets/img/dice-${dice1}.svg`); // Animacion 1er dado
    
  setTimeout(() => {
      animateDiceRoll("second-dice", `assets/img/dice-${dice2}.svg`); // Animacion 2do dado
  }, 200);

  // Mostramos el resultado de la suma más tarde
  setTimeout(() => {
      animateDiceRoll("sum", sum); // Animacion resultado suma 
    }, 500);
    
  // Actualizamos estadísticas después de mostrar la suma
  // 800ms (giro) + 500ms (revelación) = 1300ms totales de los dados
  setTimeout(() => {
    renderStats();
  }, 1300);
  
  
  // REHABILITAR EL BOTÓN - Esperamos a que terminen las animaciones antes de permitir otro roll
  setTimeout(() => {
      btnRoll.disabled = false;
  }, 1800);

}

function reset() {
  playDiceSound(); // Dispara el pitido sintetizado

  // Bloqueamos el botón de tirar y el de reset mientras se reinician las estadísticas y se renderizan los dados a su estado inicial
  const btnRoll = document.getElementById("btn-roll");
  const btnReset = document.getElementById("btn-reset");
  btnRoll.disabled = true;
  btnReset.disabled = true;

  rollCounter = 0;
  frequencies.fill(0.0);
  
  
  // Renderizamos nuevamente
  animateDiceRoll("first-dice", "assets/img/dice-1.svg");
  animateDiceRoll("second-dice", "assets/img/dice-1.svg");
  animateDiceRoll("sum", "2"); // valor por defecto para la suma (2)
  renderStats();
  
  // Rehabilitamos los botones cuando esten por terminar las animaciones
  setTimeout(() => {
    btnRoll.disabled = false;
    btnReset.disabled = false;
  }, 1400);
}


function animateDiceRoll(id, newAsset) {

  const dice = document.getElementById(id);
  if (!dice) return; // valida que el elemento exista

  dice.classList.add("roll"); // Ejecuta roll animation - efecto de "giro"

  setTimeout(() => {
    dice.classList.remove("roll"); // Quitamos la clase de roll 
    
    // Timeout de 0s para que no se superpongan las clases en mismo frame
    setTimeout(() => {

      // Actualizamos imagen con el dado correspondiente
      if (id !== "sum" && newAsset !== undefined) {
        dice.src = newAsset;
      }
      
      // Si el parametro es sum actualizamos con su valor correspondiente
      if (id === "sum") {
          dice.textContent = newAsset;
      }
      
      // Ejecuta reveal animation - efecto de "aparición"
      dice.classList.add("reveal");
      
      // Quitamos la clase de reveal cuando termine la animacion (500ms) para que pueda volver a aplicarse en el próximo roll
      setTimeout(() => {
        dice.classList.remove("reveal");
      }, 500);

    }, 0);
  }, 800);
}


function playDiceSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);
    osc.type = 'triangle';
    
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    osc.start(now);
    osc.stop(now + 0.15);
  } catch (e) {
    console.log('Audio no disponible');
  }
}
