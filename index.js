const readline = require("readline");
const medico = require("./src/medico");
const paciente = require("./src/paciente");
const consulta = require("./src/consulta");
const relatorios = require("./src/relatorios");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu() {
  console.log("\n=== Sistema de Gerenciamento de Consultas ===");
  console.log("1 - Adicionar Médico");
  console.log("2 - Adicionar Paciente");
  console.log("3 - Adicionar Consulta");
  console.log("4 - Listar Consultas");
  console.log("5 - Atualizar Médico");
  console.log("6 - Atualizar Paciente");
  console.log("7 - Atualizar Consulta");
  console.log("8 - Remover Médico");
  console.log("9 - Remover Paciente");
  console.log("10 - Remover Consulta");
  console.log("11 - Relatórios");
  console.log("0 - Sair");

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case "1": medico.adicionar(rl, menu); break;
      case "2": paciente.adicionar(rl, menu); break;
      case "3": consulta.adicionar(rl, menu); break;
      case "4": consulta.listar(menu); break;
      case "5": medico.atualizar(rl, menu); break;
      case "6": paciente.atualizar(rl, menu); break;
      case "7": consulta.atualizar(rl, menu); break;
      case "8": medico.remover(rl, menu); break;
      case "9": paciente.remover(rl, menu); break;
      case "10": consulta.remover(rl, menu); break;
      case "11": relatorios.menuRelatorios(rl, menu); break;
      case "0": rl.close(); break;
      default: menu();
    }
  });
}

menu();
