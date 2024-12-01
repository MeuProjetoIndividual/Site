var partidaModel = require("../models/partidaModel");

function cadastrarPartida(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var acertos = req.body.acertoServer;
    var erros = req.body.erroServer;
    var usuario = req.body.usuarioServer;

    // Faça as validações dos valores
    if (acertos == undefined) {
        res.status(400).send("Seu acertos está undefined!");
    } else if (erros == undefined) {
        res.status(400).send("Seu erros está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        partidaModel.cadastrarPartida(acertos, erros, usuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function coletarDados(req, res) {
    var idUsuario = req.body.usuarioServer;

    if (idUsuario == undefined) {
        res.status(400).send("Seu id de usuário está undefined!");
    } else {

        partidaModel.coletarDados(idUsuario)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            qtdPartida: resultadoAutenticar[0].qtd_partida,
                            somaAcerto: resultadoAutenticar[0].soma_acerto,
                            somaErro: resultadoAutenticar[0].soma_erro,
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("nenhuma partida realizada");
                    } 
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao pegar os dados! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function coletarDadosGrafico(req, res) {
        partidaModel.coletarDadosGrafico()
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    console.log(resultadoAutenticar);

                    const top3 = []
                    for(var posicao = 0; posicao < resultadoAutenticar.length; posicao++){
                        top3[posicao] = resultadoAutenticar[posicao]
                        if(top3[posicao] == undefined){
                            top3[posicao] = 0
                        }
                        else{
                            top3[posicao] = resultadoAutenticar[posicao].soma_acerto
                        }
                    }
                    res.json({
                        somaAcerto0: top3[0],
                        usuario0: resultadoAutenticar[0].usuario,
                        somaAcerto1: top3[1],
                        usuario1: resultadoAutenticar[1].usuario,
                        somaAcerto2: top3[2],
                        usuario2: resultadoAutenticar[2].usuario,
                    });
                    if (resultadoAutenticar.length == 0) {
                        res.status(403).send("nenhuma partida realizada");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao pegar os dados! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

module.exports = {
    cadastrarPartida,
    coletarDados,
    coletarDadosGrafico
}