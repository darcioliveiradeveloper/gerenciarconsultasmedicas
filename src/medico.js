
const fs = require("fs");
const validacao = require("./validacao");
const path = "./src/medicos.json";

function carregar() { return JSON.parse(fs.readFileSync(path, "utf8") || "[]"); }
function salvar(dados) { fs.writeFileSync(path, JSON.stringify(dados, null, 2)); }

function adicionar(rl, callback) {
  const medicos = carregar();
  rl.question("Nome do médico: ", (nome) => {
    const resultadoNome = validacao.validarNome(nome);
    if (!resultadoNome.valido) { validacao.mostrarErro(resultadoNome.mensagem); return callback(); }
    rl.question("Especialidade: ", (especialidade) => {
      const novo = { id: medicos.length + 1, nome, especialidade };
      validacao.mostrarDados("Novo Médico", novo);
      validacao.confirmarAcao(rl, "Deseja confirmar o cadastro do médico?", (ok) => {
        if (ok) { medicos.push(novo); salvar(medicos); console.log("✅ Médico cadastrado!"); }
        callback();
      });
    });
  });
}

function atualizar(rl, callback) {
  const medicos = carregar();
  rl.question("ID do médico: ", (id) => {
    const medico = medicos.find(m => m.id == id);
    if (!medico) { validacao.mostrarErro("Médico não encontrado."); return callback(); }
    validacao.mostrarDados("Dados atuais do Médico", medico);
    rl.question("Novo nome: ", (nome) => {
      rl.question("Nova especialidade: ", (especialidade) => {
        const novosDados = { id, nome, especialidade };
        console.log("\n📋 Comparação:");
        validacao.mostrarDados("Antigo", medico);
        validacao.mostrarDados("Novo", novosDados);
        validacao.confirmarAcao(rl, "Deseja confirmar a atualização?", (ok) => {
          if (ok) { medico.nome = nome; medico.especialidade = especialidade; salvar(medicos); console.log("✅ Médico atualizado!"); }
          callback();
        });
      });
    });
  });
}

function remover(rl, callback) {
  let medicos = carregar();
  rl.question("ID do médico: ", (id) => {
    const medico = medicos.find(m => m.id == id);
    if (!medico) { validacao.mostrarErro("Médico não encontrado."); return callback(); }
    validacao.mostrarDados("Médico a excluir", medico);
    validacao.confirmarAcao(rl, "Deseja confirmar a exclusão?", (ok) => {
      if (ok) { medicos = medicos.filter(m => m.id != id); salvar(medicos); console.log("🗑️ Médico removido!"); }
      callback();
    });
  });
}

module.exports = { adicionar, atualizar, remover };
