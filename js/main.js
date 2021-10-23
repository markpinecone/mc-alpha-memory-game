const cards = document.querySelectorAll('.card');
let setEventListener = cards.forEach(card => card.addEventListener('click', handleCards, false))

function loader() {
    setEventListener
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
let isFliped = false;
let firstCard, secondCard;



function handleCards(event) {
    if (event.currentTarget.classList.contains("card")) {
      event.currentTarget.className = "card fliped_card";
      if (!isFliped) {
        isFliped= true;
        firstCard = this;
      } else {
        if (this != firstCard) {
          isFliped = false;
          secondCard = this;
        } else {
          console.log("Can't use same card twice");
        }
      }
      if (firstCard && secondCard) {
        //cards.forEach(card => card.addEventListener('click', handleCards, false))
        if (firstCard.innerHTML == secondCard.innerHTML) {
        firstCard.className = ('matched fliped_card');
        secondCard.className = ('matched fliped_card');
        firstCard.removeEventListener('click', handleCards);
        secondCard.removeEventListener('click', handleCards);
        console.log('Match Found!')
        } else {
          console.log('No Match Found!')
          cards.forEach(card => card.removeEventListener('click', handleCards))
          sleep(2000).then(() => {
            firstCard.classList.remove('fliped_card');
            secondCard.classList.remove('fliped_card');
            firstCard, secondCard = undefined;
          });
        }
      }
    }
    // console.log(isFliped, firstCard, secondCard)
}


shuffle(glyphs);
console.log(glyphs);

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function createGrid() {
  let gridSize = 16;
  let deck = document.getElementById("container");
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
  }
}

function sleep (time) {
  console.log(`Sleep Mode ${time} ms.`)
  return new Promise((resolve) => setTimeout(resolve, time));
}

function objToString(obj) {
    let str = '';
    for (const [p, val] of Object.entries(obj)) {
        str += `${p}::${val}\n`;
    }
    return str;
}