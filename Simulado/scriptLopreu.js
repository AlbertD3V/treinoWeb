class Jogador {
    constructor(nomeJogador, numeroPartidasJogadas, numeroAcertos, numeroErros) {
        this.nomeJogador = nomeJogador;
        this.numeroPartidasJogadas = numeroPartidasJogadas;
        this.numeroAcertos = numeroAcertos;
        this.numeroErros = numeroErros;
        this.ranking = 0;
    }
}

var jogadores = [];

function calcularRanking(jogador) {
    var pontos = 0;

    if (jogador.numeroPartidasJogadas >= 20) {
        pontos = pontos + 1000;
    } else {
        pontos = pontos + 500;
    }

    if (jogador.numeroAcertos >= 100) {
        pontos = pontos + 40;
    } else {
        pontos = pontos + 15;
    }

    if (jogador.numeroErros <= 10) {
        pontos = pontos - (jogador.numeroErros * 5);
    } else {
        pontos = pontos - (jogador.numeroErros * 10);
    }

    return pontos;
}

function adicionarJogador(evento) {
    evento.preventDefault();

    var nome = document.getElementById("nome").value;
    var partidas = Number(document.getElementById("partidas").value);
    var acertos = Number(document.getElementById("acertos").value);
    var erros = Number(document.getElementById("erros").value);

    var novoJogador = new Jogador(nome, partidas, acertos, erros);
    jogadores.push(novoJogador);

    alert("Um novo jogador foi adicionado.");
    document.getElementById("formJogador").reset();
}

function mostrarRanking(evento) {
    evento.preventDefault();

    var corpoTabela = document.getElementById("corpoTabela");
    corpoTabela.innerHTML = "";

    for (var i = 0; i < jogadores.length; i++) {
        jogadores[i].ranking = calcularRanking(jogadores[i]);

        corpoTabela.innerHTML +=
            "<tr>" +
            "<td>" + jogadores[i].nomeJogador + "</td>" +
            "<td>" + jogadores[i].numeroPartidasJogadas + "</td>" +
            "<td>" + jogadores[i].numeroAcertos + "</td>" +
            "<td>" + jogadores[i].numeroErros + "</td>" +
            "<td>" + jogadores[i].ranking + "</td>" +
            "</tr>";
    }
}

document.getElementById("formJogador").addEventListener("submit", adicionarJogador);
document.getElementById("linkRanking").addEventListener("click", mostrarRanking);
