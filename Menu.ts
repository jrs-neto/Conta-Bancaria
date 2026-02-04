import { colors } from "./src/util/Colors";
import { Conta } from "./src/model/Conta";
import { Input } from "./src/util/Input";

export function main() {

  let opcao: number;

  // Instanciar Objetos da Classe Conta

  const c1 = new Conta(1, 1234, "Sofia", 1, 100000.0);

  c1.visualizar();

  // Testes do Método Sacar
  console.log("Sacar 100,00: ", c1.sacar(100.0));
  console.log("Sacar 200000.0: ", c1.sacar(200000.0));
  console.log("Sacar 0.00: ", c1.sacar(0.0));

  // Testes do Método Depositar
  console.log("Depositar -10.00: ");
  c1.depositar(-10.0);

  console.log("Depositar 500.00: ");
  c1.depositar(500.0);

  c1.visualizar();

  // console.log("O titular da Conta é: ", c1.titular);
  // console.log("O Saldo da Conta é: ", c1.saldo);

  while (true) {
    console.log(colors.bg.black, colors.fg.yellow, "*******************************************************");
    console.log("                                                       ");
    console.log("             BANCO DO BRAZIL COM Z                     ");
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
    console.log("           0 - Sair                                    ");
    console.log("                                                       ");
    console.log("*******************************************************");
    console.log("                                                       ");

    console.log("Entre com a opcao desejada: ");
    opcao = Input.questionInt("");

    if (opcao === 0) {
      console.log(colors.fg.greenstrong, "\nBanco do Brazil com Z - O seu Futuro começa aqui!");
      sobre();
      console.log(colors.reset, "");
      process.exit(0);
    }

    switch (opcao) {
      case 1:
        console.log(colors.fg.whitestrong, "\n\nCriar conta\n\n", colors.reset);
        keyPress()
        break;
      case 2:
        console.log(colors.fg.whitestrong, "\n\nListar todas as contas\n\n", colors.reset);
        keyPress()
        break;
      case 3:
        console.log(colors.fg.whitestrong, "\n\nConsultar dados da Conta - por número\n\n", colors.reset);
        keyPress()
        break;
      case 4:
        console.log(colors.fg.whitestrong, "\n\nAtualizar dados da Conta\n\n", colors.reset);
        keyPress()
        break;
      case 5:
        console.log(colors.fg.whitestrong, "\n\nApagar uma Conta\n\n", colors.reset);
        keyPress()
        break;
      case 6:
        console.log(colors.fg.whitestrong, "\n\nSaque\n\n", colors.reset);
        keyPress()
        break;
      case 7:
        console.log(colors.fg.whitestrong, "\n\nDepósito\n\n", colors.reset);
        keyPress()
        break;
      case 8:
        console.log(colors.fg.whitestrong, "\n\nTransferência entre Contas\n\n", colors.reset);
        keyPress()
        break;
      default:
        console.log(colors.fg.whitestrong, "Operação Inválida!", colors.reset);
        keyPress()
    }
  }
}

function sobre(): void {
  console.log("*******************************************************");
  console.log("Programa desenvolvido por: José Rodrigues.");
  console.log("Github: https://github.com/jrs-neto");
  console.log("LinkedIn: https://www.linkedin.com/in/jrodrigues-neto/");
  console.log("*******************************************************");
}

function keyPress(): void {
  console.log(colors.reset, "");
  console.log("\nPressione enter para continuar...");
  Input.prompt();
}

main();
