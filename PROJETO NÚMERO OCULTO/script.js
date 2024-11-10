const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const resetBtn = document.getElementById('reset-btn');
const message = document.getElementById('message');
const attemptCount = document.getElementById('attempt-count');

let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

guessBtn.addEventListener('click', () => {
    const userGuess = parseInt(guessInput.value);
    attempts++;

    if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
        message.textContent = 'Por favor, insira um número válido entre 1 e 100.';
    } else if (userGuess < randomNumber) {
        message.textContent = 'Muito baixo! Tente novamente.';
    } else if (userGuess > randomNumber) {
        message.textContent = 'Muito alto! Tente novamente.';
    } else {
        message.textContent = `Parabéns! Você acertou o número ${randomNumber} em ${attempts} tentativas!`;
        guessBtn.disabled = true;
        guessInput.disabled = true;
    }
    attemptCount.textContent = attempts;
    guessInput.value = '';
});

resetBtn.addEventListener('click', () => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptCount.textContent = attempts;
    message.textContent = '';
    guessBtn.disabled = false;
    guessInput.disabled = false;
    guessInput.value = '';
});