class Registro {
    constructor(estado, data, numeroCasos, numeroObitos) {
        this.Estado = estado;
        this.Data = data;
        this["Número de Casos"] = numeroCasos;
        this["Número de Óbitos"] = numeroObitos;
        this.Percentual = 0;
    }
}

var registros = [];

function calcularPercentual(registro) {
    if (registro["Número de Casos"] === 0) {
        registro.Percentual = 0;
    } else {
        registro.Percentual = (registro["Número de Óbitos"] / registro["Número de Casos"]) * 100;
    }

    return registro.Percentual;
}

function adicionarregistro(evento) {
    evento.preventDefault();

    var estado = document.getElementById("siglaEstado").value.toUpperCase();
    var data = document.getElementById("data").value;
    var casos = Number(document.getElementById("casos").value);
    var obitos = Number(document.getElementById("obitos").value);

    var novoRegistro = new Registro(estado, data, casos, obitos);
    registros.push(novoRegistro);

}

function mostrarRanking(evento) {
    evento.preventDefault();

    var corpoTabela = document.getElementById("corpoTabela");
    corpoTabela.innerHTML = "";

    for (var i = 0; i < registros.length; i++) {
        calcularPercentual(registros[i]);

        corpoTabela.innerHTML +=
            "<tr>" +
            "<td>" + registros[i].Estado + "</td>" +
            "<td>" + registros[i].Data + "</td>" +
            "<td>" + registros[i]["Número de Casos"] + "</td>" +
            "<td>" + registros[i]["Número de Óbitos"] + "</td>" +
            "<td>" + parseFloat(registros[i].Percentual.toFixed(2)) + "</td>" +
            "</tr>";
    }
}

document.getElementById("formregistro").addEventListener("submit", adicionarregistro);
document.getElementById("linkRanking").addEventListener("click", mostrarRanking);
