const express = require("express");
const router = express.Router();
const { application, request, response } = require("express");
const middleware = require("../../../middlewares/autenticacao");
router.use(middleware);

router.get("/", (request, response) => {
    console.log(request);
    response.send( {Mensagem: "Acesso Realizado com Sucesso!", UsuarioID: request.usuarioID} );
});

module.exports = application => application.use("/session", router);