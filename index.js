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
  console.log("4 - Busca");
  console.log("5 - Relatórios");
  console.log("0 - Sair");

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case "1": menuMedico(); break;
      case "2": menuPaciente(); break;
      case "3": menuConsulta(); break;
      case "4": menuBusca(); break;
      case "5": relatorios.menuRelatorios(rl, menuPrincipal); break;
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

// === SUBMENU BUSCA PRINCIPAL ===
function menuBusca() {
  console.log("\n=== Menu Busca ===");
  console.log("1 - Buscar Médico");
  console.log("2 - Buscar Paciente");
  console.log("3 - Buscar Consulta");
  console.log("0 - Voltar");

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case "1": menuBuscaMedico(); break;
      case "2": menuBuscaPaciente(); break;
      case "3": menuBuscaConsulta(); break;
      case "0": menuPrincipal(); break;
      default:
        console.log("❌ Opção inválida. Tente novamente.");
        menuBusca();
    }
  });
}

// === SUBMENU BUSCA MÉDICO ===
function menuBuscaMedico() {
  console.log("\n=== Busca Médico ===");
  console.log("1 - Buscar por ID");
  console.log("2 - Buscar por Nome");
  console.log("3 - Buscar por Especialidade");
  console.log("0 - Voltar");

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case "1": medico.buscarPorId(rl, menuBuscaMedico); break;
      case "2": medico.buscarPorNome(rl, menuBuscaMedico); break;
      case "3": medico.buscarPorEspecialidade(rl, menuBuscaMedico); break;
      case "0": menuBusca(); break;
      default:
        console.log("❌ Opção inválida. Tente novamente.");
        menuBuscaMedico();
    }
  });
}

// === SUBMENU BUSCA PACIENTE ===
function menuBuscaPaciente() {
  console.log("\n=== Busca Paciente ===");
  console.log("1 - Buscar por ID");
  console.log("2 - Buscar por Nome");
  console.log("3 - Buscar por Data de Nascimento");
  console.log("0 - Voltar");

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case "1": paciente.buscarPorId(rl, menuBuscaPaciente); break;
      case "2": paciente.buscarPorNome(rl, menuBuscaPaciente); break;
      case "3": paciente.buscarPorNascimento(rl, menuBuscaPaciente); break;
      case "0": menuBusca(); break;
      default:
        console.log("❌ Opção inválida. Tente novamente.");
        menuBuscaPaciente();
    }
  });
}

// === SUBMENU BUSCA CONSULTA ===
function menuBuscaConsulta() {
  console.log("\n=== Busca Consulta ===");
  console.log("1 - Buscar por ID da Consulta");
  console.log("2 - Buscar por Médico (ID)");
  console.log("3 - Buscar por Especialidade");
  console.log("4 - Buscar por Paciente ID");
  console.log("5 - Buscar por Paciente Nome");
  console.log("6 - Buscar por Data de Nascimento do Paciente");
  console.log("7 - Buscar por palavras na Descrição");
  console.log("0 - Voltar");

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case "1": consulta.buscarPorId(rl, menuBuscaConsulta); break;
      case "2": consulta.buscarPorMedico(rl, menuBuscaConsulta); break;
      case "3": consulta.buscarPorEspecialidade(rl, menuBuscaConsulta); break;
      case "4": consulta.buscarPorPacienteId(rl, menuBuscaConsulta); break;
      case "5": consulta.buscarPorPacienteNome(rl, menuBuscaConsulta); break;
      case "6": consulta.buscarPorPacienteNascimento(rl, menuBuscaConsulta); break;
      case "7": consulta.buscarPorDescricao(rl, menuBuscaConsulta); break;
      case "0": menuBusca(); break;
      default:
        console.log("❌ Opção inválida. Tente novamente.");
        menuBuscaConsulta();
    }
  });
}

// === INÍCIO DO SISTEMA ===
menuPrincipal();

// === TRATAMENTO DE SAÍDA ===
rl.on("close", () => {
  console.log("\nAté logo!");
  process.exit(0);
});


// === TRATAMENTO DE ERROS ===
process.on("uncaughtException", (err) => {
  console.error("Ocorreu um erro inesperado:", err);
  rl.close();
});

// === TRATAMENTO DE SINAL DE INTERRUPÇÃO (Ctrl+C) ===
process.on("SIGINT", () => {
  console.log("\nInterrupção detectada. Encerrando o sistema...");
  rl.close();
});

// === TRATAMENTO DE SINAL DE TERMINAÇÃO (kill) ===
process.on("SIGTERM", () => {
  console.log("\nSinal de término recebido. Encerrando o sistema...");
  rl.close();
});

// === TRATAMENTO DE SINAL DE DESLIGAMENTO (shutdown) ===
process.on("shutdown", () => {
  console.log("\nSinal de desligamento recebido. Encerrando o sistema...");
  rl.close();
});

// === TRATAMENTO DE SINAL DE REINÍCIO (restart) ===
process.on("restart", () => {
  console.log("\nSinal de reinício recebido. Reiniciando o sistema...");
  rl.close();
});

// === TRATAMENTO DE SINAL DE HIBERNAÇÃO (hibernate) ===
process.on("hibernate", () => {
  console.log("\nSinal de hibernação recebido. Hibernando o sistema...");
  rl.close();
});

// === TRATAMENTO DE SINAL DE DESPERTAR (wake) ===
process.on("wake", () => {
  console.log("\nSinal de despertar recebido. Despertando o sistema...");
  rl.close();
});

//