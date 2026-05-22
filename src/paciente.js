const fs = require("fs");
const validacao = require("./validacao");
const path = "./src/pacientes.json";

function carregar() {
  try {
    return JSON.parse(fs.readFileSync(path, "utf8") || "[]");
  } catch {
    return [];
  }
}

function salvar(dados) {
  fs.writeFileSync(path, JSON.stringify(dados, null, 2));
}

function listar(callback) {
  const pacientes = carregar();
  console.log("\n=== Lista de Pacientes ===");
  if (pacientes.length === 0) {
    console.log("Nenhum paciente cadastrado.");
  } else {
    pacientes.forEach(p => {
      console.log(`ID: ${p.id} | Nome: ${p.nome} | Data de Nascimento: ${p.dataNascimento}`);
    });
  }
  if (callback) callback();
}

function adicionar(rl, callback) {
  const pacientes = carregar();
  rl.question("Nome do paciente: ", (nome) => {
    const resultadoNome = validacao.validarNome(nome);
    if (!resultadoNome.valido) {
      validacao.mostrarErro(resultadoNome.mensagem);
      return callback();
    }

    function perguntarData() {
      rl.question("Data de nascimento (dd/mm/aaaa): ", (dataNascimento) => {
        const resultadoData = validacao.validarData(dataNascimento);
        if (!resultadoData.valido) {
          validacao.mostrarErro(resultadoData.mensagem);
          return perguntarData(); // volta a perguntar até ser válido
        }

        const novo = { id: pacientes.length + 1, nome, dataNascimento };
        validacao.mostrarDados("Novo Paciente", novo);

        validacao.confirmarAcao(rl, "Deseja confirmar o cadastro do paciente?", (ok) => {
          if (ok) {
            pacientes.push(novo);
            salvar(pacientes);
            console.log("✅ Paciente cadastrado!");
          }
          callback();
        });
      });
    }

    perguntarData();
  });
}

function atualizar(rl, callback) {
  const pacientes = carregar();
  rl.question("ID do paciente: ", (id) => {
    const paciente = pacientes.find(p => p.id == id);
    if (!paciente) {
      validacao.mostrarErro("Paciente não encontrado.");
      return callback();
    }

    validacao.mostrarDados("Dados atuais do Paciente", paciente);

    rl.question(`Novo nome (${paciente.nome}): `, (nome) => {
      const novoNome = nome.trim() === "" ? paciente.nome : nome;

      function perguntarData() {
        rl.question(`Nova data de nascimento (${paciente.dataNascimento}): `, (dataNascimento) => {
          const novaData = dataNascimento.trim() === "" ? paciente.dataNascimento : dataNascimento;

          const resultadoData = validacao.validarData(novaData);
          if (!resultadoData.valido) {
            validacao.mostrarErro(resultadoData.mensagem);
            return perguntarData(); // volta a perguntar até ser válido
          }

          const novosDados = { id, nome: novoNome, dataNascimento: novaData };
          console.log("\n📋 Comparação:");
          validacao.mostrarDados("Antigo", paciente);
          validacao.mostrarDados("Novo", novosDados);

          validacao.confirmarAcao(rl, "Deseja confirmar a atualização?", (ok) => {
            if (ok) {
              paciente.nome = novoNome;
              paciente.dataNascimento = novaData;
              salvar(pacientes);
              console.log("✅ Paciente atualizado!");
            }
            callback();
          });
        });
      }

      perguntarData();
    });
  });
}

function remover(rl, callback) {
  let pacientes = carregar();
  rl.question("ID do paciente: ", (id) => {
    const paciente = pacientes.find(p => p.id == id);
    if (!paciente) {
      validacao.mostrarErro("Paciente não encontrado.");
      return callback();
    }

    validacao.mostrarDados("Paciente a excluir", paciente);

    validacao.confirmarAcao(rl, "Deseja confirmar a exclusão?", (ok) => {
      if (ok) {
        pacientes = pacientes.filter(p => p.id != id);
        salvar(pacientes);
        console.log("🗑️ Paciente removido!");
      }
      callback();
    });
  });
}

module.exports = { adicionar, listar, atualizar, remover };

