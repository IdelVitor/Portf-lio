const board = document.querySelector('.board');
const message = document.getElementById('message');
const attemptsElement = document.getElementById('attempts');
const restartButton = document.getElementById('restart-button');
const historyList = document.getElementById('history-list');

let cards = [];
let flippedCards = [];
let attempts = 0;
let pairsFound = 0;

function generateBoard() {
  const images = ['🐶', '🐱', '🐰', '🐶', '🐱', '🐰'];
  cards = images
    .sort(() => Math.random() - 0.5)
    .map((image) => createCard(image));
  board.innerHTML = '';
  cards.forEach((card) => board.appendChild(card));
}

function createCard(image) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front"></div>
      <div class="card-back">${image}</div>
    </div>
  `;
  card.addEventListener('click', () => flipCard(card));
  return card;
}

function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
    card.classList.add('flipped');
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const isMatch =
    card1.querySelector('.card-back').textContent ===
    card2.querySelector('.card-back').textContent;

  setTimeout(() => {
    if (isMatch) {
      pairsFound++;
      if (pairsFound === 3) {
        message.textContent = 'PARABÉNS! Você encontrou todos os pares!';
      }
    } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
    }
    flippedCards = [];
    attempts++;
    attemptsElement.textContent = `Tentativas: ${attempts}`;
    updateHistory();
  }, 1000);
}

function updateHistory() {
  const historyItem = document.createElement('li');
  historyItem.textContent = `Rodada ${historyList.children.length + 1}: ${attempts} tentativas`;
  historyList.appendChild(historyItem);
  localStorage.setItem('history', historyList.innerHTML);
}

function restartGame() {
  pairsFound = 0;
  attempts = 0;
  flippedCards = [];
  message.textContent = 'Encontre todos os pares!';
  attemptsElement.textContent = `Tentativas: 0`;
  generateBoard();
  historyList.innerHTML = '';
  localStorage.removeItem('history');
}

function loadHistory() {
  const storedHistory = localStorage.getItem('history');
  if (storedHistory) {
    historyList.innerHTML = storedHistory;
  }
}

restartButton.addEventListener('click', restartGame);
window.addEventListener('DOMContentLoaded', () => {
  generateBoard();
  loadHistory();
});
