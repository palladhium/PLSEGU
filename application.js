const express = require("express");
const bodyParser = require("body-parser");
const { request } = require("express");

const application = express();

// Tratar as requisicoes com retorno em json
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: false }));

require("./module/gerenciador-autenticacao-module/gerenciador-autenticacao-controller/gerenciador-autenticacao-controller")(application);
require("./module/gerenciador-autenticacao-module/gerenciador-autenticacao-controller/gerenciador-autenticacao-session-controller")(application);

// Rota de teste
application.get("/", (request, response) => {
    response.send("Conectado com Sucesso!");
})

application.listen(4000);