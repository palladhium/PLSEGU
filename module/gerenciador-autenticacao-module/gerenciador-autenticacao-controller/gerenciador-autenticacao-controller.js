const express = require("express");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const secretHASH = require("../../../configuration/configuration");

const UsuarioModel = require("../gerenciador-autenticacao-model/gerenciador-autenticacao-usuario-model");
const { application, request, response } = require("express");

const router = express.Router();

// Persist
router.post("/registrar-usuario", async (request, response) => {
    const { email } = request.body;
    try {
        if(await UsuarioModel.findOne( {email} )) {
            console.log( UsuarioModel.findOne( {email} ));
            return response.status(400).send( { error: "Usuário já cadastrado na base de dados!" } );
        }
        const UsuarioModelResponse = await UsuarioModel.create(request.body);
        console.log(UsuarioModelResponse);
        return response.send( {
            usuarioRequest: UsuarioModelResponse,
            TokenAutentication: generationToken( { UsuarioModelResponse })
        } );
    } catch(error) {
        return response.status(400).send( { error: "Não foi possível persistir os dados!", message: error } );
    }
});

// Autenticacao
router.post("/autenticacao", async (request, response) => {
    const {email, senha} = request.body;
    const UsuarioModelResponse = await UsuarioModel.findOne( {email} ).select("+senha");
    if(!UsuarioModelResponse) {
        return response.status(400).send( {error: "Não foi possível recuperar o usuário na base de dados."} );
    }
    if(!await bcryptjs.compare(senha, UsuarioModelResponse.senha)) {
        return response.status(400).send( {Error: "Senha inválida!" } );
    }
    UsuarioModelResponse.senha = undefined;
    response.send(
        { 
            UsuarioModelResponse,
            TokenAutentication: generationToken( { id: UsuarioModelResponse.id } )
        });
});

// Gerador de Token
function generationToken(parametros = {}) {
    return jsonwebtoken.sign( {id: parametros.id }, secretHASH.secretHASH, {
        expiresIn: 84400, // Token valido por 24 Horas
    });
};

module.exports = application => application.use("/api", router);