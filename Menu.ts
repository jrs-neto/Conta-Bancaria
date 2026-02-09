import { colors } from "./src/util/Colors";
import { Input } from "./src/util/Input";
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from "./src/model/ContaPoupanca";
import { ContaController } from "./src/controller/ContaController";
import leia = require("readline-sync");
import { formatarMoeda } from "./src/util/Currency";

// Criar um Objeto Global da Classe ContaController
const contas = new ContaController();

// Criar um array contendo os tipos de conta
const tipoContas = ['Conta Corrente', 'Conta Poupança'];

export function main() {

  let opcao: number;

  criarContasTeste();

  while (true) {
    console.log(colors.bg.black, colors.fg.yellow);
    console.log("*******************************************************");
    console.log("                                                       ");
    console.log("                       BANCO                           ");
    console.log("                                                       ");
    console.log("*******************************************************");
    console.log("                                                       ");
    console.log("           1 - Criar Conta                             ");
    console.log("           2 - Listar todas as Contas                  ");
    console.log("           3 - Buscar Conta por Número                 ");
    console.log("           4 - Atualizar Dados da Conta                ");
    console.log("           5 - Apagar Conta                            ");
    console.log("           6 - Sacar                                   ");
    console.log("           7 - Depositar                               ");
    console.log("           8 - Transferir valores entre contas         ");
    console.log("           9 - Buscar Conta por Nome do Titular        ");
    console.log("           0 - Sair                                    ");
    console.log("                                                       ");
    console.log("*******************************************************");
    console.log("                                                       ");

    console.log("Entre com a opção desejada: ");
    opcao = Input.questionInt("");

    if (opcao === 0) {
      console.log(colors.fg.greenstrong, "\nBanco - O seu Futuro começa aqui!");
      sobre();
      console.log(colors.reset, "");
      process.exit(0);
    }

    switch (opcao) {
      case 1:
        console.log(colors.fg.whitestrong, "\n\nCriar conta\n\n", colors.reset);
        criarConta();
        keyPress()
        break;
      case 2:
        console.log(colors.fg.whitestrong, "\n\nListar todas as contas\n\n", colors.reset);

        listarTodasContas();

        keyPress()
        break;
      case 3:
        console.log(colors.fg.whitestrong, "\n\nConsultar dados da Conta - por número\n\n", colors.reset);

        buscarContaPorNumero();

        keyPress()
        break;
      case 4:
        console.log(colors.fg.whitestrong, "\n\nAtualizar dados da Conta\n\n", colors.reset);

        atualizarConta();

        keyPress()
        break;
      case 5:
        console.log(colors.fg.whitestrong, "\n\nApagar uma Conta\n\n", colors.reset);

        deletarContaPorNumero();

        keyPress()
        break;
      case 6:
        console.log(colors.fg.whitestrong, "\n\nSaque\n\n", colors.reset);

        sacar();

        keyPress()
        break;
      case 7:
        console.log(colors.fg.whitestrong, "\n\nDepósito\n\n", colors.reset);

        depositar();

        keyPress()
        break;
      case 8:
        console.log(colors.fg.whitestrong, "\n\nTransferência entre Contas\n\n", colors.reset);

        transferir();

        keyPress()
        break;
      case 9:
        console.log(colors.fg.whitestrong, "\n\nProcurar Conta por Nome do Titular\n\n", colors.reset);

        procurarPorTitular();

        keyPress()
        break;
      default:
        console.log(colors.fg.whitestrong, "Operação Inválida!", colors.reset);
        keyPress()
    }
  }
}

/* Opção 1: Cria uma nova conta (Corrente ou Poupança)*/

function criarConta() {

  console.log("Digite o número da agência: ");
  const agencia = Input.questionInt("");

  console.log("Digite o nome do titular: ");
  const titular = Input.question("");

  console.log("Selecione o tipo da conta: ");
  const tipo = Input.keyInSelect(tipoContas, "", { cancel: false }) + 1;

  console.log("Digite o saldo da conta: ");
  const saldo = Input.questionFloat("");

  switch (tipo) {
    case 1: // Cria um objeto da classe Conta Corrente
      console.log("Digite o limite da conta: ");
      const limite = Input.questionFloat("");
      contas.cadastrar(new ContaCorrente(
        contas.gerarNumero(), agencia, titular, tipo, saldo, limite));
      break;

    case 2: // Cria um objeto da classe Conta Poupança
      console.log("Digite o dia do aniversário da conta: ");
      const aniversario = Input.questionInt("");
      contas.cadastrar(new ContaPoupanca(
        contas.gerarNumero(), agencia, titular, tipo, saldo, aniversario));
      break;
  }

}

/* Opção 2: Lista todas as contas cadastradas */
function listarTodasContas(): void {
  contas.listarTodas();
}
/* Opção 3: Busca uma conta pelo número */
function buscarContaPorNumero(): void {
  // Solicita o número da conta
  console.log("Digite o número da conta: ");
  const numero = Input.questionInt("");

  contas.procurarPorNumero(numero);
}

/* Opção 4: Atualizar os dados de uma Conta*/
function atualizarConta(): void {

  console.log("Digite o número da conta: ");
  const numero = Input.questionInt("");

  const conta = contas.buscarNoArray(numero);

  if (conta !== null) {

    // Guarda os valores atuais da conta
    let agencia: number = conta.agencia;
    let titular: string = conta.titular;
    const tipo: number = conta.tipo;
    let saldo: number = conta.saldo;

    // Atualização da Agência
    console.log(`\nAgência Atual: ${agencia}`);
    console.log("Digite o novo número da agência: ")
    console.log("Pressione ENTER para manter o valor atual");
    agencia = Input.questionInt("", { defaultInput: agencia });

    // Atualização do titular
    console.log(`\nTitular atual: ${titular}`);
    console.log("Digite o novo nome do titular")
    console.log("Pressione ENTER para manter o valor atual");
    titular = Input.question("", { defaultInput: titular });

    // Atualização do Saldo
    console.log(`\nSaldo Atual: ${formatarMoeda(saldo)}`);
    console.log("Digite o valor do novo saldo: ");
    console.log("Pressione ENTER para manter o valor atual");
    saldo = Input.questionFloat("", { defaultInput: saldo });

    // Atualização do Tipo
    switch (tipo) {
      case 1: { // Conta Corrente
        let limite: number = (conta as ContaCorrente).limite;

        // Atualização do Limite
        console.log(`\nLimite Atual: ${formatarMoeda(limite)}`);
        console.log("Digite o valor do novo limite")
        console.log("Pressione ENTER para manter o valor atual");
        limite = Input.questionFloat("", { defaultInput: limite });

        contas.atualizar(new ContaCorrente(
          numero, agencia, titular, tipo, saldo, limite));
        break;

      } case 2: { // Conta Poupança
        let aniversario: number = (conta as ContaPoupanca).aniversario;

        // Atualização do Aniversário
        console.log(`\nAniversário Atual: ${aniversario}`);
        console.log("Digite o novo dia do aniversário")
        console.log("Pressione ENTER para manter o valor atual");
        aniversario = Input.questionInt("", { defaultInput: aniversario });

        contas.atualizar(new ContaPoupanca(
          numero, agencia, titular, tipo, saldo, aniversario));
        break;
      }
    }

  } else {
    console.log(colors.fg.red, `A conta número ${numero} não foi encontrada!`, colors.reset);
  }

}



/* Opção 5: Deletar uma Conta pelo número */
function deletarContaPorNumero(): void {
  console.log("Digite o número da conta: ");
  const numero = Input.questionInt("");

  const conta = contas.buscarNoArray(numero);
  if (conta !== null) {
    console.log(colors.fg.whitestrong, `\nTem certeza que deseja deletar a conta número ${numero} [y/n]?`, colors.reset);
    const confirma = Input.keyInYNStrict("");
    if (confirma)
      contas.deletar(numero);
    else
      console.log(colors.fg.red, "\nOperação cancelada!", colors.reset);
  } else {
    console.log(colors.fg.red, `A conta número ${numero} não foi encontrada!`, colors.reset);
  }

}

function sacar(): void {

  console.log("Digite o número da conta: ");
  const numero = Input.questionInt("");

  const conta = contas.buscarNoArray(numero);

  if (conta !== null) {
    console.log("Digite o valor do saque: ");
    const valor = Input.questionFloat("");

    contas.sacar(numero, valor);
  } else {
    console.log(colors.fg.red, `A conta número ${numero} não foi encontrada!`, colors.reset);
  }
}

function depositar(): void {

  console.log("Digite o número da conta: ");
  const numero = Input.questionInt("");

  const conta = contas.buscarNoArray(numero);

  if (conta !== null) {
    console.log("Digite o valor do depósito: ");
    const valor = Input.questionFloat("");

    contas.depositar(numero, valor);
  } else {
    console.log(colors.fg.red, `A conta número ${numero} não foi encontrada!`, colors.reset);
  }
}

function transferir(): void {

  console.log("Digite o número da Conta de Origem: ");
  const numeroOrigem = Input.questionInt("");

  console.log("Digite o número da Conta de Destino: ");
  const numeroDestino = Input.questionInt("");

  const contaOrigem = contas.buscarNoArray(numeroOrigem);
  const contaDestino = contas.buscarNoArray(numeroDestino);

  if (contaOrigem === null) {
    console.log(colors.fg.red, `A Conta de Origem número ${numeroOrigem} não foi encontrada!`, colors.reset);


  } else if (contaDestino === null) {
    console.log(colors.fg.red, `A Conta de Destino número ${numeroOrigem} não foi encontrada!`, colors.reset);

  } else {
    console.log("Digite o valor da Transferência: ");
    const valor = Input.questionFloat("");
    contas.transferir(numeroOrigem, numeroDestino, valor);
  }
}

function procurarPorTitular(): void {
  console.log("Digite o Nome do Titular: ");
  const titular = Input.question("");

  contas.procurarPorTitular(titular);
}

/* Função com os dados da pessoa desenvolvedora */
function sobre(): void {
  console.log("*******************************************************");
  console.log("Programa desenvolvido por: José Rodrigues.");
  console.log("Github: https://github.com/jrs-neto");
  console.log("LinkedIn: https://www.linkedin.com/in/jrodrigues-neto/");
  console.log("*******************************************************");
}

/* Função de pausa entre as opções do menu */
function keyPress(): void {
  console.log(colors.reset, "\nPressione enter para continuar...");
  Input.prompt();
}

/* Testes para Testes */
function criarContasTeste(): void {

  // Instâncias da Classe ContaCorrente
  contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 1234, 'Amanda Magro', 1, 1000000.00, 100000.00));
  contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 4578, 'João da Silva', 1, 1000.00, 100.00));

  // Instâncias da Classe ContaPoupança
  contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5789, "Geana Almeida", 2, 10000, 10));
  contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5698, "Jean Lima", 2, 15000, 15));

}

main();