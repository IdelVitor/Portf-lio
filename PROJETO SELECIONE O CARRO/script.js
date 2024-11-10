// Seleciona os elementos do DOM
const result = document.getElementById('result');
const body = document.body;
const whiteCar = document.getElementById('white');
const redCar = document.getElementById('red');
const brancoBtn = document.getElementById('branco');
const vermelhoBtn = document.getElementById('vermelho');
const resetarBtn = document.getElementById('resetar');
const acelerarBtn = document.getElementById('acelerar');
const desacelerarBtn = document.getElementById('desacelerar');

let carPosition = 0; 
let selectedCar = null; 
const initialCarPosition = 60; 

// Defina os limites de posição para que o carro não saia da pista
const minCarPosition = 10; 
const maxCarPosition = 80; 

// Função para selecionar o carro e atualizar a interface
function selectCar(car, color, colorName) {
    selectedCar = car; 
    result.textContent = colorName;
    body.style.backgroundColor = color;
    carPosition = initialCarPosition; 
    selectedCar.style.top = `${carPosition}px`; 
}

// Eventos de clique para selecionar o carro
whiteCar.addEventListener('click', () => selectCar(whiteCar, 'white', 'Branco'));
redCar.addEventListener('click', () => selectCar(redCar, 'DarkRed', 'Vermelho'));

// Eventos de clique para os botões de seleção de cor no rodapé
brancoBtn.addEventListener('click', () => selectCar(whiteCar, 'white', 'Branco'));
vermelhoBtn.addEventListener('click', () => selectCar(redCar, 'DarkRed', 'Vermelho'));

// Função para redefinir o estado inicial
function reset() {
    selectedCar = null;
    result.textContent = '?';
    body.style.backgroundColor = 'black';
    carPosition = initialCarPosition;
    whiteCar.style.top = `${initialCarPosition}px`;
    redCar.style.top = `${initialCarPosition}px`;
}

// Função para acelerar (move o carro para frente)
function accelerate() {
    if (selectedCar && carPosition > minCarPosition) { 
        carPosition -= 10; 
        selectedCar.style.top = `${carPosition}px`; 
    }
}

// Função para desacelerar (move o carro para trás)
function decelerate() {
    if (selectedCar && carPosition < maxCarPosition) { 
        carPosition += 10; 
        selectedCar.style.top = `${carPosition}px`;
    }
}

// Evento de clique para os botões de acelerar e desacelerar
acelerarBtn.addEventListener('click', accelerate);
desacelerarBtn.addEventListener('click', decelerate);
resetarBtn.addEventListener('click', reset);

// Controle por teclado para aceleração e desaceleração
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        accelerate();
    } else if (event.key === 'ArrowDown') {
        decelerate();
    }
});
