const timeline = [];
function roll() {
  const dice1 = Math.ceil(Math.random() * 6);
  const dice2 = Math.ceil(Math.random() * 6);
  const sum = dice1 + dice2;
  timeline.push([dice1, dice2]);
  document.getElementById("first-dice").src = `assets/img/dice-${dice1}.svg`;
  document.getElementById("second-dice").src = `assets/img/dice-${dice2}.svg`;
  document.getElementById("sum").innerHTML = `${sum}`;
  renderTimeline();
}

function renderTimeline() {
  const last10 = timeline.slice(-10);
  const ul = document.getElementById("timeline");
  ul.innerHTML = last10
    .map((pair) => `<li>[${pair[0]}&${pair[1]}]</li>`)
    .join("")
}
