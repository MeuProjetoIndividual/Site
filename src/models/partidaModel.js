var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarPartida(qtdAcerto, qtdErro, fkUsuario) {
    console.log("ACESSEI A PARTIDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarPartida():", qtdAcerto, qtdErro, fkUsuario);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO Partida (dia, qtdAcerto, qtdErro, fkUsuario) VALUES (current_date(), ${qtdAcerto}, ${qtdErro}, ${fkUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function coletarDados(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function coletarDados(): ", idUsuario)
    var instrucaoSql = `
        SELECT count(idPartida) as qtd_partida, sum(qtdAcerto) as soma_acerto, sum(qtdErro) as soma_erro FROM Partida WHERE fkUsuario = ${idUsuario} and dia = current_date();
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function coletarDadosGrafico() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function coletarDadosGrafico(): ")
    var instrucaoSql = `
        SELECT sum(qtdAcerto) as soma_acerto, nome as usuario from Partida
        join Usuario on fkUsuario = idUsuario
        where dia = current_date() group by fkUsuario order by sum(qtdAcerto) desc limit 3;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarPartida,
    coletarDados,
    coletarDadosGrafico
};