function exibirTextoNaTela(tag, texto) {

    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.1} );

}


function exibirMensagemInicial() {

    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');

}


exibirMensagemInicial();


let numeroLimite = 10;
let listaDeNumerosSorteados = []
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function gerarNumeroAleatorio() {

    let numeroEscolhido = Math.round(Math.random() * numeroLimite + 1);
    let qntdElementosLista = listaDeNumerosSorteados.length;

    if (qntdElementosLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {

        return gerarNumeroAleatorio();

    } else {

        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;

    }

}


function limparCampo() {

    chute = document.querySelector('input');
    chute.value = '';

}


function reiniciarJogo() {

    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}


function verificarChute() {

    let chute = document.querySelector('input').value; 

    if(chute == numeroSecreto) {

    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;

    exibirTextoNaTela('h1', 'Parabéns! Você acertou!');
    exibirTextoNaTela('p', mensagemTentativas);

    document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        
        if(chute > numeroSecreto) {

            exibirTextoNaTela('h1', 'Poxa, você errou. Tente novamente!');
            exibirTextoNaTela('p', 'O número secreto é menor');

        } else {

            exibirTextoNaTela('h1', 'Poxa, você errou. Tente novamente!');
            exibirTextoNaTela('p', 'O número secreto é maior');

        }

        tentativas++;
        limparCampo();
    }

    console.log(numeroSecreto);
}