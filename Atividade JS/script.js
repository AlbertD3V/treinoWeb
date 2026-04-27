class Pedido {
    constructor(codigo, nomeProduto, quantidade, precoUnitario) {
        this.codigo = codigo;
        this.nomeProduto = nomeProduto;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
        this.precoTotal = 0;
        this.totalCompra = 0;
    }

    calcularPrecoTotal() {
        this.precoTotal = this.quantidade * this.precoUnitario;
        return this.precoTotal;
    }
}

const listaPedidos = [];

const formularioPedido = document.getElementById("formPedido");
const botaoListarPedido = document.getElementById("btnListarPedido");
const secaoTabela = document.getElementById("secaoTabela");
const corpoTabela = document.getElementById("corpoTabela");

function formatarNumero(valor) {
    return Number(valor.toFixed(2)).toString();
}

function obterNumero(campoId) {
    const valorCampo = document.getElementById(campoId).value.trim().replace(",", ".");
    return Number(valorCampo);
}

function limparFormulario() {
    document.getElementById("codigo").value = "";
    document.getElementById("nomeProduto").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("precoUnitario").value = "";
    document.getElementById("codigo").focus();
}

function adicionarPedido(evento) {
    evento.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const nomeProduto = document.getElementById("nomeProduto").value.trim();
    const quantidade = obterNumero("quantidade");
    const precoUnitario = obterNumero("precoUnitario");


    const novoPedido = new Pedido(codigo, nomeProduto, quantidade, precoUnitario);
    listaPedidos.push(novoPedido);

    alert("Novo produto adicionado no pedido.");
    limparFormulario();
}

function criarCelula(texto) {
    const celula = document.createElement("td");
    celula.textContent = texto;
    return celula;
}

function listarPedido(evento) {
    if (evento) {
        evento.preventDefault();
    }

    if (listaPedidos.length === 0) {
        alert("Nenhum produto foi adicionado no pedido.");
        secaoTabela.style.display = "none";
        return;
    }

    corpoTabela.innerHTML = "";

    let totalAcumulado = 0;

    for (const pedido of listaPedidos) {
        totalAcumulado += pedido.calcularPrecoTotal();
        pedido.totalCompra = totalAcumulado;

        const linha = document.createElement("tr");
        linha.appendChild(criarCelula(pedido.codigo));
        linha.appendChild(criarCelula(pedido.nomeProduto));
        linha.appendChild(criarCelula(formatarNumero(pedido.quantidade)));
        linha.appendChild(criarCelula(formatarNumero(pedido.precoUnitario)));
        linha.appendChild(criarCelula(formatarNumero(pedido.precoTotal)));
        linha.appendChild(criarCelula(formatarNumero(pedido.totalCompra)));
        corpoTabela.appendChild(linha);
    }

    secaoTabela.style.display = "block";
}

formularioPedido.addEventListener("submit", adicionarPedido);


botaoListarPedido.addEventListener("click", listarPedido);

