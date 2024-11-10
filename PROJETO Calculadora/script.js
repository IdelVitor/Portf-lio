const display = document.getElementById('display')

let calculo = ''

receba = (valor) => {
    display.innerHTML += valor
    calculo += valor
}

resultado = () => {
    display.innerHTML = eval(calculo)
}

limpar = () => {
    display.innerHTML = ''
    calculo = ''
}

 backspace = () => {
    display.innerHTML = display.innerHTML.slice(0, -1); 
    expression = expression.slice(0, -1); 
}



