const timeline = [];
function roll() {
  // Randomizamos valores para los dados
  const dice1 = Math.ceil(Math.random() * 6);
  const dice2 = Math.ceil(Math.random() * 6);
  const sum = dice1 + dice2;

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
}

// Animation handler
function animateDiceRoll(id, newAsset) {
  const dice = document.getElementById(id);
  // Triggers roll animation
  dice.classList.add("roll");
  // Transitions from roll to reveal
  setTimeout(() => {
    dice.classList.remove("roll");
    if (newAsset !== undefined) dice.src = newAsset;
    if (id === "sum") { dice.textContent = newAsset };
    // Triggers reveal animation
    dice.classList.add("reveal");
    setTimeout(() => dice.classList.remove("reveal"), 500);
  }, 600);
}

function renderTimeline() {
  const last10 = timeline.slice(-10);
  const ul = document.getElementById("timeline");
  ul.innerHTML = last10
    .map((pair) => `<li>${pair[0]}<small>&</small>${pair[1]}</li>`)
    .join("")
}
