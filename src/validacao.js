
function mostrarErro(mensagem) {
    console.log("\n⚠️ Erro: " + mensagem + "\n");
  }
  
  function confirmarAcao(rl, mensagem, callback) {
    console.log("\n📋 " + mensagem);
    rl.question("Confirmar ação? (s/n): ", (resp) => {
      if (resp.toLowerCase() === "s") {
        callback(true);
      } else {
        console.log("❌ Ação cancelada.");
        callback(false);
      }
    });
  }
  
  function mostrarDados(tipo, objeto) {
    console.log("\n=== " + tipo + " ===");
    for (const chave in objeto) {
      console.log(`${chave}: ${objeto[chave]}`);
    }
  }
  
  function validarData(data) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(data)) {
      return { valido: false, mensagem: "Data inválida! Use o formato dd/mm/aaaa." };
    }
    const [dia, mes, ano] = data.split("/").map(Number);
    const dateObj = new Date(ano, mes - 1, dia);
    const valido = (
      dateObj.getFullYear() === ano &&
      dateObj.getMonth() === mes - 1 &&
      dateObj.getDate() === dia
    );
    return valido ? { valido: true } : { valido: false, mensagem: "Data inexistente!" };
  }
  
  function validarNome(nome) {
    if (!nome || nome.trim().length < 3) {
      return { valido: false, mensagem: "Nome inválido! Deve ter pelo menos 3 caracteres." };
    }
    return { valido: true };
  }
  
  function validarMesAno(mesAno) {
    const regex = /^\d{2}\/\d{4}$/;
    if (!regex.test(mesAno)) {
      return { valido: false, mensagem: "Formato inválido! Use mm/aaaa." };
    }
    const [mes, ano] = mesAno.split("/").map(Number);
    if (mes < 1 || mes > 12 || ano < 1900) {
      return { valido: false, mensagem: "Mês/ano inválido!" };
    }
    return { valido: true };
  }
  
  module.exports = { validarData, validarNome, validarMesAno, mostrarErro, confirmarAcao, mostrarDados };
