var express = require("express");
var router = express.Router();

var partidaController = require("../controllers/partidaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    partidaController.cadastrarPartida(req, res);
})

router.post("/coletar", function (req, res) {
    partidaController.coletarDados(req, res);
});

router.post("/coletarGrafico", function (req, res) {
    partidaController.coletarDadosGrafico(req, res);
});

module.exports = router;