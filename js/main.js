
function loader() {
    createGrid();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click', handleFlipedCards, false));

}

const array = [
  "fas fa-code",
  "fas fa-database",
  "fas fa-hand-spock",
  "fas fa-code-branch",
  "fas fa-bug",
  "fas fa-headphones",
  "fas fa-rocket",
  "fas fa-power-off",
];
const glyphs = array.flatMap((i) => [i, i]);
let matches = 0;
let moves = 25;
let gridSize = 16;
let isFliped = false;
let firstCard;
let secondCard;

// function shuffle(array) {
//   array.sort(() => Math.random() - 0.5);
// }


// Trying out Fisher-Yates shuffle method.
const shuffle = (array) => {
  let element;
  for (let i = array.length - 1; i > 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    element = array[i];
    array[i] = array[rand];
    array[rand] = element;
  }
  return array;
}

shuffle(glyphs);


function createGrid() {
  let deck = document.getElementById("deck");
  for (let i = 0; i < gridSize; i++) {
    let card = document.createElement("div");
    let front = document.createElement("div");
    let back = document.createElement("div");
    let content = document.createElement("div");
    let glyph = document.createElement("i");
    card.className = 'card';
    deck.appendChild(card);
    front.className = "front";
    card.appendChild(front);
    back.className = "back";
    card.appendChild(back);
    content.className = 'content'
    back.appendChild(content);
    glyph.className = glyphs[i];
    content.appendChild(glyph);
    updateMoves();
  }
}

function handleFlipedCards(e) {
    if (e.currentTarget.classList.contains("card")) {
      e.currentTarget.className = "card fliped_card";
      if (!isFliped) {
        isFliped= true;
        firstCard = this;
        removeListener(firstCard, handleFlipedCards);

      } else {
                isFliped = false;
                secondCard = this;
                removeListener(secondCard, handleFlipedCards);
                gameDecisions();
      }
    }
}

function gameDecisions() {
    waitForDecision("wait");
    if (firstCard && secondCard) {
        if (firstCard.innerHTML == secondCard.innerHTML) {
        firstCard.className = ('matched fliped_card');
        secondCard.className = ('matched fliped_card');
        console.log('Match Found!')
        waitForDecision("resume");
        matches += 2;
        moves -= 1;
        updateMoves();
        hasPlayerWon();
        hasPlayerFailed();

        } else {
          console.log('No Match Found!')
          sleep(2000).then(() => {
            firstCard.classList.remove('fliped_card');
            secondCard.classList.remove('fliped_card');
            firstCard, secondCard = undefined;
            waitForDecision("resume");
            moves -= 1;
            updateMoves();
            hasPlayerFailed();
          });
        }
      }
}

function removeListener(object, func) {
    object.removeEventListener('click', func);
    console.log(`Removed event listener for object ${object.innerHTML}`)
}

function addListeners(object, func) {
    object.addEventListener('click', func, false);
    console.log(`Added event listener for object ${object.innerHTML}`)
}

function waitForDecision(action) {
    const cards = document.querySelectorAll('.card');
    switch (action) {
        case "wait":
            cards.forEach(card => card.removeEventListener('click', handleFlipedCards, false));
            console.log('Event listeners has been halted!');
            break;
        case "resume":
            cards.forEach(card => card.addEventListener('click', handleFlipedCards, false));
            console.log('Event listeners has been resumed!');
    }
}

function hasPlayerWon() {
  if (matches == gridSize) {
      document.getElementById('game-status').innerHTML = 'Well Done! &#128521'
      reloadDocument(5000);
  }
}

function hasPlayerFailed() {
  if (moves == 0) {
      const cards = document.querySelectorAll('.card');
      const doc = document.getElementById('moves-left');
      document.getElementById('game-status').innerHTML = 'You Failed! &#129322'

      doc.innerHTML = '<a href="https://www.benu.lv/e-aptieka/uztura-bagatinataji/smadzenu-darbibai-un-nervu-sistemai/atminai">Need supplements for improving memory? Click here!</a>'
      cards.forEach(card => card.removeEventListener('click', handleFlipedCards));
      reloadDocument(6000);
  }
}

function sleep (time) {
  console.log(`Sleep Mode ${time} ms.`)
  return new Promise((resolve) => setTimeout(resolve, time));
}

function updateMoves() {
  document.getElementById('moves-left').innerHTML = `Moves Left: ${moves}`
}

function reloadDocument(time) {
  sleep(time).then(() => {
          location.reload();
  });
}