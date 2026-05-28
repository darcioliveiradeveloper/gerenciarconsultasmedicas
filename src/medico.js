const fs = require("fs");
const validacao = require("./validacao");
const path = "./src/medicos.json";

function carregar() {
  try { return JSON.parse(fs.readFileSync(path, "utf8") || "[]"); }
  catch { return []; }
}
function salvar(dados) { fs.writeFileSync(path, JSON.stringify(dados, null, 2)); }

function listar(callback) {
  const medicos = carregar();
  console.log("\n=== Lista de Médicos ===");
  if (medicos.length === 0) console.log("Nenhum médico cadastrado.");
  else medicos.forEach(m => console.log(`ID: ${m.id} | Nome: ${m.nome} | Especialidade: ${m.especialidade}`));
  if (callback) callback();
}

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
    rl.question(`Novo nome (${medico.nome}): `, (nome) => {
      const novoNome = nome.trim() === "" ? medico.nome : nome;
      rl.question(`Nova especialidade (${medico.especialidade}): `, (especialidade) => {
        const novaEspecialidade = especialidade.trim() === "" ? medico.especialidade : especialidade;
        const novosDados = { id, nome: novoNome, especialidade: novaEspecialidade };
        console.log("\n📋 Comparação:"); validacao.mostrarDados("Antigo", medico); validacao.mostrarDados("Novo", novosDados);
        validacao.confirmarAcao(rl, "Deseja confirmar a atualização?", (ok) => {
          if (ok) { medico.nome = novoNome; medico.especialidade = novaEspecialidade; salvar(medicos); console.log("✅ Médico atualizado!"); }
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

// === BUSCAS ===
function buscarPorId(rl, callback) {
  const medicos = carregar();
  rl.question("Digite o ID do médico: ", (id) => {
    const medico = medicos.find(m => m.id == id);
    medico ? validacao.mostrarDados("Médico encontrado", medico) : validacao.mostrarErro("Médico não encontrado.");
    callback();
  });
}
function buscarPorNome(rl, callback) {
  const medicos = carregar();
  rl.question("Digite o nome do médico: ", (nome) => {
    const encontrados = medicos.filter(m => m.nome.toLowerCase().includes(nome.toLowerCase()));
    encontrados.length ? encontrados.forEach(m => validacao.mostrarDados("Médico encontrado", m)) : validacao.mostrarErro("Nenhum médico encontrado.");
    callback();
  });
}
function buscarPorEspecialidade(rl, callback) {
  const medicos = carregar();
  rl.question("Digite a especialidade: ", (esp) => {
    const encontrados = medicos.filter(m => m.especialidade.toLowerCase().includes(esp.toLowerCase()));
    encontrados.length ? encontrados.forEach(m => validacao.mostrarDados("Médico encontrado", m)) : validacao.mostrarErro("Nenhum médico encontrado.");
    callback();
  });
}

module.exports = { adicionar, listar, atualizar, remover, buscarPorId, buscarPorNome, buscarPorEspecialidade };

// === FUNÇÕES DE BUSCA ===
