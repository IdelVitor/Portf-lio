let saldo = 0;
let entradasTotais = 0;
let saídasTotais = 0;

function atualizarInterface() {
    document.getElementById('balance').textContent = saldo.toFixed(2);
    document.getElementById('total-entries').textContent = entradasTotais.toFixed(2);
    document.getElementById('total-expenses').textContent = saídasTotais.toFixed(2);
}

function adicionarTransacao(tipo, valor, id, detalhe) {
    const lista = document.getElementById('transaction-list');
    if (lista.children[0].textContent === 'Não constam transações') lista.innerHTML = '';

    const item = document.createElement('li');
    const agora = new Date().toLocaleString('pt-BR');
    item.textContent = `${tipo.toUpperCase()} | ${detalhe} | ${valor.toFixed(2)} | ${agora} | ID: ${id}`;
    lista.appendChild(item);
}

document.getElementById('pix-area').addEventListener('click', () => {
    document.getElementById('pix-forms').classList.toggle('hidden');
});

document.getElementById('pay').addEventListener('click', () => alert('Sistema indisponível. Tente novamente mais tarde.'));
document.getElementById('invest').addEventListener('click', () => alert('Sistema indisponível. Tente novamente mais tarde.'));

document.getElementById('receive-tab').addEventListener('click', () => {
    document.getElementById('transfer-form').classList.add('hidden');
    document.getElementById('receive-form').classList.remove('hidden');
});

document.getElementById('transfer-tab').addEventListener('click', () => {
    document.getElementById('receive-form').classList.add('hidden');
    document.getElementById('transfer-form').classList.remove('hidden');
});

document.getElementById('receive-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const cpf = document.getElementById('cpf-cnpj').value;
    const valor = parseFloat(document.getElementById('amount-receive').value);

    if (!cpf || !valor) {
        document.getElementById('error-message-receive').classList.remove('hidden');
        return;
    }

    document.getElementById('error-message-receive').classList.add('hidden');
    saldo += valor;
    entradasTotais += valor;

    const id = Date.now().toString();
    adicionarTransacao('Entrada', valor, id, `CNPJ/CPF: ${cpf}`);
    alert('Transação realizada com sucesso!');
    atualizarInterface();
});

document.getElementById('transfer-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const chave = document.getElementById('pix-key').value;
    const valor = parseFloat(document.getElementById('amount-transfer').value);

    if (!chave || !valor) {
        document.getElementById('error-message-transfer').classList.remove('hidden');
        return;
    }

    if (valor > saldo) {
        alert('Saldo insuficiente!');
        return;
    }

    document.getElementById('error-message-transfer').classList.add('hidden');
    saldo -= valor;
    saídasTotais += valor;

    const id = Date.now().toString();
    adicionarTransacao('Saída', valor, id, `Chave PIX: ${chave}`);
    alert('Transação realizada com sucesso!');
    atualizarInterface();
});
atualizarInterface();
