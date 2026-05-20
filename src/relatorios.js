const fs = require("fs");
const pathMedicos = "./src/medicos.json";
const pathPacientes = "./src/pacientes.json";
const pathConsultas = "./src/consultas.json";

function carregar(path) {
  try {
    return JSON.parse(fs.readFileSync(path, "utf8") || "[]");
  } catch {
    return [];
  }
}

function menuRelatorios(rl, callback) {
  console.log("\n=== Menu Relatórios ===");
  console.log("1 - Total de Médicos");
  console.log("2 - Total de Pacientes");
  console.log("3 - Total de Consultas");
  console.log("4 - Consultas por Médico");
  console.log("5 - Consultas por Paciente");
  console.log("6 - Consultas por Período");
  console.log("7 - Especialidades mais atendidas");
  console.log("0 - Voltar");

  rl.question("Escolha uma opção: ", (opcao) => {
    switch (opcao) {
      case "1": relatorioMedicos(callback); break;
      case "2": relatorioPacientes(callback); break;
      case "3": relatorioConsultas(callback); break;
      case "4": relatorioConsultasPorMedico(rl, callback); break;
      case "5": relatorioConsultasPorPaciente(rl, callback); break;
      case "6": relatorioConsultasPorPeriodo(rl, callback); break;
      case "7": relatorioEspecialidades(callback); break;
      case "0": callback(); break;
      default:
        console.log("❌ Opção inválida. Tente novamente.");
        menuRelatorios(rl, callback);
    }
  });
}

function relatorioMedicos(callback) {
  const medicos = carregar(pathMedicos);
  console.log(`\n📊 Total de Médicos: ${medicos.length}`);
  if (callback) callback();
}

function relatorioPacientes(callback) {
  const pacientes = carregar(pathPacientes);
  console.log(`\n📊 Total de Pacientes: ${pacientes.length}`);
  if (callback) callback();
}

function relatorioConsultas(callback) {
  const consultas = carregar(pathConsultas);
  console.log(`\n📊 Total de Consultas: ${consultas.length}`);
  if (callback) callback();
}

function relatorioConsultasPorMedico(rl, callback) {
  const consultas = carregar(pathConsultas);
  rl.question("ID do médico: ", (idMedico) => {
    const filtradas = consultas.filter(c => c.idMedico == idMedico);
    console.log(`\n📊 Consultas do Médico ${idMedico}: ${filtradas.length}`);
    filtradas.forEach(c => console.log(`ID: ${c.id} | Data: ${c.data} | Paciente: ${c.idPaciente} | Descrição: ${c.descricao}`));
    callback();
  });
}

function relatorioConsultasPorPaciente(rl, callback) {
  const consultas = carregar(pathConsultas);
  rl.question("ID do paciente: ", (idPaciente) => {
    const filtradas = consultas.filter(c => c.idPaciente == idPaciente);
    console.log(`\n📊 Consultas do Paciente ${idPaciente}: ${filtradas.length}`);
    filtradas.forEach(c => console.log(`ID: ${c.id} | Data: ${c.data} | Médico: ${c.idMedico} | Descrição: ${c.descricao}`));
    callback();
  });
}

function relatorioConsultasPorPeriodo(rl, callback) {
  const consultas = carregar(pathConsultas);
  rl.question("Data inicial (dd/mm/aaaa): ", (dataInicial) => {
    rl.question("Data final (dd/mm/aaaa): ", (dataFinal) => {
      const inicio = new Date(dataInicial.split("/").reverse().join("-"));
      const fim = new Date(dataFinal.split("/").reverse().join("-"));

      const filtradas = consultas.filter(c => {
        const dataConsulta = new Date(c.data.split("/").reverse().join("-"));
        return dataConsulta >= inicio && dataConsulta <= fim;
      });

      console.log(`\n📊 Consultas entre ${dataInicial} e ${dataFinal}: ${filtradas.length}`);
      filtradas.forEach(c => console.log(`ID: ${c.id} | Data: ${c.data} | Médico: ${c.idMedico} | Paciente: ${c.idPaciente} | Descrição: ${c.descricao}`));
      callback();
    });
  });
}

function relatorioEspecialidades(callback) {
  const consultas = carregar(pathConsultas);
  const medicos = carregar(pathMedicos);

  const contagem = {};
  consultas.forEach(c => {
    const medico = medicos.find(m => m.id == c.idMedico);
    if (medico) {
      contagem[medico.especialidade] = (contagem[medico.especialidade] || 0) + 1;
    }
  });

  console.log("\n📊 Especialidades mais atendidas:");
  if (Object.keys(contagem).length === 0) {
    console.log("Nenhuma consulta registrada.");
  } else {
    Object.entries(contagem).forEach(([esp, qtd]) => {
      console.log(`${esp}: ${qtd} consultas`);
    });
  }
  if (callback) callback();
}

module.exports = { menuRelatorios };

// Para usar este módulo, importe e chame menuRelatorios(rl, callback) no menu principal do seu aplicativo.
