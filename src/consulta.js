
const fs = require("fs");
const validacao = require("./validacao");
const path = "./src/consultas.json";

function carregar() { return JSON.parse(fs.readFileSync(path, "utf8") || "[]"); }
function salvar(dados) { fs.writeFileSync(path, JSON.stringify(dados, null, 2)); }

function adicionar(rl, callback) {
  const consultas = carregar();
  rl.question("Data da consulta (dd/mm/aaaa): ", (data) => {
    const resultadoData = validacao.validarData(data);
    if (!resultadoData.valido) { validacao.mostrarErro(resultadoData.mensagem); return callback(); }

    rl.question("ID do médico: ", (idMedico) => {
      rl.question("ID do paciente: ", (idPaciente) => {
        rl.question("Descrição: ", (descricao) => {
          const existe = consultas.find(c => c.idMedico == idMedico && c.data == data);
          if (existe) { validacao.mostrarErro("Já existe consulta para este médico nesta data!"); return callback(); }

          const nova = { id: consultas.length + 1, data, idMedico, idPaciente, descricao };
          validacao.mostrarDados("Nova Consulta", nova);

          validacao.confirmarAcao(rl, "Deseja confirmar o cadastro da consulta?", (ok) => {
            if (ok) { consultas.push(nova); salvar(consultas); console.log("✅ Consulta cadastrada!"); }
            callback();
          });
        });
      });
    });
  });
}

function listar(callback) {
  const consultas = carregar();
  if (consultas.length === 0) {
    validacao.mostrarErro("Nenhuma consulta cadastrada.");
  } else {
    consultas.forEach(c => validacao.mostrarDados("Consulta", c));
  }
  callback();
}

function atualizar(rl, callback) {
  const consultas = carregar();
  rl.question("ID da consulta: ", (id) => {
    const consulta = consultas.find(c => c.id == id);
    if (!consulta) { validacao.mostrarErro("Consulta não encontrada."); return callback(); }

    validacao.mostrarDados("Dados atuais da Consulta", consulta);

    rl.question("Nova data (dd/mm/aaaa): ", (data) => {
      const resultadoData = validacao.validarData(data);
      if (!resultadoData.valido) { validacao.mostrarErro(resultadoData.mensagem); return callback(); }

      rl.question("Novo ID do médico: ", (idMedico) => {
        rl.question("Novo ID do paciente: ", (idPaciente) => {
          rl.question("Nova descrição: ", (descricao) => {
            const novosDados = { id, data, idMedico, idPaciente, descricao };
            console.log("\n📋 Comparação:");
            validacao.mostrarDados("Antiga", consulta);
            validacao.mostrarDados("Nova", novosDados);

            validacao.confirmarAcao(rl, "Deseja confirmar a atualização da consulta?", (ok) => {
              if (ok) {
                consulta.data = data;
                consulta.idMedico = idMedico;
                consulta.idPaciente = idPaciente;
                consulta.descricao = descricao;
                salvar(consultas);
                console.log("✅ Consulta atualizada!");
              }
              callback();
            });
          });
        });
      });
    });
  });
}

function remover(rl, callback) {
  let consultas = carregar();
  rl.question("ID da consulta: ", (id) => {
    const consulta = consultas.find(c => c.id == id);
    if (!consulta) { validacao.mostrarErro("Consulta não encontrada."); return callback(); }

    validacao.mostrarDados("Consulta a excluir", consulta);

    validacao.confirmarAcao(rl, "Deseja confirmar a exclusão da consulta?", (ok) => {
      if (ok) { consultas = consultas.filter(c => c.id != id); salvar(consultas); console.log("🗑️ Consulta removida!"); }
      callback();
    });
  });
}

module.exports = { adicionar, listar, atualizar, remover };
