class Pedido {
    constructor(codigo, nomeProduto, quantidade, precoUnitario, precoTotal, totalCompra) {
        this.codigo = codigo;
        this.nomeProduto = nomeProduto;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
        this.precoTotal = precoTotal;
        this.totalCompra = totalCompra;
    }
}

var listaPedidos = [];

function formatarMoeda(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
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

    var codigo = document.getElementById("codigo").value.trim();
    var nomeProduto = document.getElementById("nomeProduto").value.trim();
    var quantidade = Number(document.getElementById("quantidade").value);
    var precoUnitario = Number(document.getElementById("precoUnitario").value);

    if (codigo === "" || nomeProduto === "" || quantidade <= 0 || precoUnitario <= 0) {
        alert("Preencha todos os campos corretamente antes de adicionar.");
        return;
    }

    var novoPedido = new Pedido(codigo, nomeProduto, quantidade, precoUnitario, 0, 0);
    listaPedidos.push(novoPedido);

    alert("Novo produto adicionado no pedido.");
    limparFormulario();
}

function listarPedido() {
    var corpoTabela = document.getElementById("corpoTabela");
    var secaoTabela = document.getElementById("secaoTabela");
    var totalCompra = 0;
    var linhasTabela = "";
    var i = 0;

    if (listaPedidos.length === 0) {
        alert("Nenhum produto foi adicionado no pedido.");
        secaoTabela.style.display = "none";
        return;
    }

    for (i = 0; i < listaPedidos.length; i++) {
        listaPedidos[i].precoTotal = listaPedidos[i].quantidade * listaPedidos[i].precoUnitario;
        totalCompra = totalCompra + listaPedidos[i].precoTotal;
    }

    for (i = 0; i < listaPedidos.length; i++) {
        listaPedidos[i].totalCompra = totalCompra;

        linhasTabela = linhasTabela +
            "<tr>" +
            "<td>" + listaPedidos[i].codigo + "</td>" +
            "<td>" + listaPedidos[i].nomeProduto + "</td>" +
            "<td>" + listaPedidos[i].quantidade + "</td>" +
            "<td>" + formatarMoeda(listaPedidos[i].precoUnitario) + "</td>" +
            "<td>" + formatarMoeda(listaPedidos[i].precoTotal) + "</td>" +
            "<td>" + formatarMoeda(listaPedidos[i].totalCompra) + "</td>" +
            "</tr>";
    }

    corpoTabela.innerHTML = linhasTabela;
    document.getElementById("totalCompra").textContent = formatarMoeda(totalCompra);
    secaoTabela.style.display = "block";
}

var formularioPedido = document.getElementById("formPedido");
var botaoListarPedido = document.getElementById("btnListarPedido");

if (formularioPedido) {
    formularioPedido.addEventListener("submit", adicionarPedido);
}

if (botaoListarPedido) {
    botaoListarPedido.addEventListener("click", listarPedido);
}
