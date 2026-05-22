const fs = require("fs");
const validacao = require("./validacao");
const pathConsultas = "./src/consultas.json";
const pathMedicos = "./src/medicos.json";
const pathPacientes = "./src/pacientes.json";

function carregar(path) {
  try {
    return JSON.parse(fs.readFileSync(path, "utf8") || "[]");
  } catch {
    return [];
  }
}

function salvar(dados) {
  fs.writeFileSync(pathConsultas, JSON.stringify(dados, null, 2));
}

function adicionar(rl, callback) {
  const consultas = carregar(pathConsultas);
  const medicos = carregar(pathMedicos);
  const pacientes = carregar(pathPacientes);

  function perguntarData() {
    rl.question("Data da consulta (dd/mm/aaaa): ", (data) => {
      const resultadoData = validacao.validarData(data);
      if (!resultadoData.valido) {
        validacao.mostrarErro(resultadoData.mensagem);
        return perguntarData(); // repete até ser válido
      }

      rl.question("ID do médico: ", (idMedico) => {
        const medico = medicos.find(m => m.id == idMedico);
        if (!medico) {
          validacao.mostrarErro("Médico não encontrado.");
          return callback();
        }
        console.log(`Médico selecionado: ${medico.id} - ${medico.nome}`);

        rl.question("ID do paciente: ", (idPaciente) => {
          const paciente = pacientes.find(p => p.id == idPaciente);
          if (!paciente) {
            validacao.mostrarErro("Paciente não encontrado.");
            return callback();
          }
          console.log(`Paciente selecionado: ${paciente.id} - ${paciente.nome}`);

          rl.question("Descrição: ", (descricao) => {
            const existe = consultas.find(c => c.idMedico == idMedico && c.data == data);
            if (existe) {
              validacao.mostrarErro("Já existe consulta para este médico nesta data!");
              return callback();
            }

            const nova = {
              id: consultas.length + 1,
              data,
              idMedico,
              nomeMedico: medico.nome,
              idPaciente,
              nomePaciente: paciente.nome,
              descricao
            };

            validacao.mostrarDados("Nova Consulta", nova);

            validacao.confirmarAcao(rl, "Deseja confirmar o cadastro da consulta?", (ok) => {
              if (ok) {
                consultas.push(nova);
                salvar(consultas);
                console.log("✅ Consulta cadastrada!");
              }
              callback();
            });
          });
        });
      });
    });
  }

  perguntarData();
}

function listar(callback) {
  const consultas = carregar(pathConsultas);
  console.log("\n=== Lista de Consultas ===");
  if (consultas.length === 0) {
    console.log("Nenhuma consulta cadastrada.");
  } else {
    consultas.forEach(c => {
      console.log(`ID: ${c.id} | Data: ${c.data} | Médico: ${c.idMedico} - ${c.nomeMedico} | Paciente: ${c.idPaciente} - ${c.nomePaciente} | Descrição: ${c.descricao}`);
    });
  }
  if (callback) callback();
}

function atualizar(rl, callback) {
  const consultas = carregar(pathConsultas);
  const medicos = carregar(pathMedicos);
  const pacientes = carregar(pathPacientes);

  rl.question("ID da consulta: ", (id) => {
    const consulta = consultas.find(c => c.id == id);
    if (!consulta) {
      validacao.mostrarErro("Consulta não encontrada.");
      return callback();
    }

    validacao.mostrarDados("Dados atuais da Consulta", consulta);

    function perguntarData() {
      rl.question(`Nova data (${consulta.data}): `, (data) => {
        const novaData = data.trim() === "" ? consulta.data : data;

        const resultadoData = validacao.validarData(novaData);
        if (!resultadoData.valido) {
          validacao.mostrarErro(resultadoData.mensagem);
          return perguntarData(); // repete até ser válido
        }

        rl.question(`Novo ID do médico (${consulta.idMedico}): `, (idMedico) => {
          const novoMedico = idMedico.trim() === "" ? consulta.idMedico : idMedico;
          const medico = medicos.find(m => m.id == novoMedico);
          if (!medico) {
            validacao.mostrarErro("Médico não encontrado.");
            return callback();
          }

          rl.question(`Novo ID do paciente (${consulta.idPaciente}): `, (idPaciente) => {
            const novoPaciente = idPaciente.trim() === "" ? consulta.idPaciente : idPaciente;
            const paciente = pacientes.find(p => p.id == novoPaciente);
            if (!paciente) {
              validacao.mostrarErro("Paciente não encontrado.");
              return callback();
            }

            rl.question(`Nova descrição (${consulta.descricao}): `, (descricao) => {
              const novaDescricao = descricao.trim() === "" ? consulta.descricao : descricao;

              const novosDados = {
                id,
                data: novaData,
                idMedico: novoMedico,
                nomeMedico: medico.nome,
                idPaciente: novoPaciente,
                nomePaciente: paciente.nome,
                descricao: novaDescricao
              };

              console.log("\n📋 Comparação:");
              validacao.mostrarDados("Antiga", consulta);
              validacao.mostrarDados("Nova", novosDados);

              validacao.confirmarAcao(rl, "Deseja confirmar a atualização da consulta?", (ok) => {
                if (ok) {
                  consulta.data = novaData;
                  consulta.idMedico = novoMedico;
                  consulta.nomeMedico = medico.nome;
                  consulta.idPaciente = novoPaciente;
                  consulta.nomePaciente = paciente.nome;
                  consulta.descricao = novaDescricao;
                  salvar(consultas);
                  console.log("✅ Consulta atualizada!");
                }
                callback();
              });
            });
          });
        });
      });
    }

    perguntarData();
  });
}

function remover(rl, callback) {
  let consultas = carregar(pathConsultas);
  rl.question("ID da consulta: ", (id) => {
    const consulta = consultas.find(c => c.id == id);
    if (!consulta) {
      validacao.mostrarErro("Consulta não encontrada.");
      return callback();
    }

    validacao.mostrarDados("Consulta a excluir", consulta);

    validacao.confirmarAcao(rl, "Deseja confirmar a exclusão da consulta?", (ok) => {
      if (ok) {
        consultas = consultas.filter(c => c.id != id);
        salvar(consultas);
        console.log("🗑️ Consulta removida!");
      }
      callback();
    });
  });
}

module.exports = { adicionar, listar, atualizar, remover };
