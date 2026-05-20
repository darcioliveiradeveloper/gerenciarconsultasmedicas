const readline = require("readline");
const medico = require("./src/medico");
const paciente = require("./src/paciente");
const consulta = require("./src/consulta");
const relatorios = require("./src/relatorios");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// === MENU PRINCIPAL ===
function menuPrincipal() {
  console.log("\n=== Sistema de Gerenciamento de Consultas ===");
  console.log("1 - Médicos");
  console.log("2 - Pacientes");
  console.log("3 - Consultas");
  console.log("4 - Relatórios");
  console.log("0 - Sair");

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case "1": menuMedico(); break;
      case "2": menuPaciente(); break;
      case "3": menuConsulta(); break;
      case "4": relatorios.menuRelatorios(rl, menuPrincipal); break;
      case "0": rl.close(); break;
      default:
        console.log("❌ Opção inválida. Tente novamente.");
        menuPrincipal();
    }
  });
}

// === SUBMENU MÉDICO ===
function menuMedico() {
  console.log("\n=== Menu Médico ===");
  console.log("1 - Cadastrar Médico");
  console.log("2 - Listar Médicos");
  console.log("3 - Atualizar Médico");
  console.log("4 - Excluir Médico");
  console.log("0 - Voltar");

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case "1": medico.adicionar(rl, menuMedico); break;
      case "2": medico.listar(menuMedico); break;
      case "3": medico.atualizar(rl, menuMedico); break;
      case "4": medico.remover(rl, menuMedico); break;
      case "0": menuPrincipal(); break;
      default:
        console.log("❌ Opção inválida. Tente novamente.");
        menuMedico();
    }
  });
}

// === SUBMENU PACIENTE ===
function menuPaciente() {
  console.log("\n=== Menu Paciente ===");
  console.log("1 - Cadastrar Paciente");
  console.log("2 - Listar Pacientes");
  console.log("3 - Atualizar Paciente");
  console.log("4 - Excluir Paciente");
  console.log("0 - Voltar");

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case "1": paciente.adicionar(rl, menuPaciente); break;
      case "2": paciente.listar(menuPaciente); break;
      case "3": paciente.atualizar(rl, menuPaciente); break;
      case "4": paciente.remover(rl, menuPaciente); break;
      case "0": menuPrincipal(); break;
      default:
        console.log("❌ Opção inválida. Tente novamente.");
        menuPaciente();
    }
  });
}

// === SUBMENU CONSULTA ===
function menuConsulta() {
  console.log("\n=== Menu Consulta ===");
  console.log("1 - Cadastrar Consulta");
  console.log("2 - Listar Consultas");
  console.log("3 - Atualizar Consulta");
  console.log("4 - Excluir Consulta");
  console.log("0 - Voltar");

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case "1": consulta.adicionar(rl, menuConsulta); break;
      case "2": consulta.listar(menuConsulta); break;
      case "3": consulta.atualizar(rl, menuConsulta); break;
      case "4": consulta.remover(rl, menuConsulta); break;
      case "0": menuPrincipal(); break;
      default:
        console.log("❌ Opção inválida. Tente novamente.");
        menuConsulta();
    }
  });
}

// === INÍCIO DO SISTEMA ===
menuPrincipal();

// === TRATAMENTO DE SAÍDA ===