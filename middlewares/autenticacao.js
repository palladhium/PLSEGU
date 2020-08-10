const jsonwebtoken = require("jsonwebtoken");
const secretHASH = require("../configuration/configuration");

const { response } = require("express");

module.exports = (request, response, next) => {

    const autenticacaoHeaders = request.headers.authorization;

    if(!autenticacaoHeaders) {
        return response.status(401).send( {ERROR: "O Token não foi infomado!" } );
    }

    const partes = autenticacaoHeaders.split(" ");

    if(!partes.length === 2) {
        return response.status(401).send( { ERROR: "Erro no Token!" } );
    }

    const [ scheme, token ] = partes;

    if(!/^Bearer$/i.test(scheme)) {
        return response.status(401).send( { ERROR: "Formato inválido do Token !" } );
    }

    jsonwebtoken.verify(token, secretHASH.secretHASH, (error, decoded) => {
        if(error) {
            return response.status(401).send( { ERROR: "Token inválido!" } );
        }
        request.usuarioID = decoded.id;
        return next();
    });

};