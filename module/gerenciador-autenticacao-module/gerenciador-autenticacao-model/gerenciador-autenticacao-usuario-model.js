const mongoose = require("../../../connection/connection");
const bcryptjs = require("bcryptjs");

const UsuarioSchema = new mongoose.Schema({
    nome: { type: String, require: true },
    usuario: { type: String, require: true },
    email: { type: String, unique: true, lowercase: true, require: true },
    senha: { type: String, select: false, require: true },
    dataUltimaAlteracao: { type: Date, default: Date.now, require: false },
});

UsuarioSchema.pre("save",  async function(next) {
    const senhaHash = await bcryptjs.hash(this.senha, 10);
    this.senha = senhaHash;
    next();
    console.log(this);
});

const UsuarioModel = mongoose.model("UsuarioModel", UsuarioSchema);

module.exports = UsuarioModel;