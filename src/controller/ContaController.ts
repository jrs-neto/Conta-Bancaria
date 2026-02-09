import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../util/Colors";

export class ContaController implements ContaRepository {

  private listaContas = new Array<Conta>();

  public numero: number = 0;

  // Métodos do CRUD
  procurarPorNumero(numero: number): void {
    const buscaConta = this.buscarNoArray(numero);

    if (buscaConta !== null)
      buscaConta.visualizar();
    else
      console.log(colors.fg.red, "\nConta não Encontrada!", colors.reset);
  }

  listarTodas(): void {
    for (let conta of this.listaContas) {
      conta.visualizar();
    }
  }

  procurarPorTitular(titular: string): void {

    // Filtragem dos dados
    const buscaPorTitular = this.listaContas.filter(conta =>
      conta.titular.toLocaleUpperCase().includes(titular.toLocaleUpperCase())
    );

    // Listagem dos dados filtrados
    if (buscaPorTitular.length > 0) {
      buscaPorTitular.forEach(conta => conta.visualizar())
    } else {
      console.log(colors.fg.red, `\nNenhuma Conta foi encontrada!`, colors.reset);
    }
  }

  cadastrar(conta: Conta): void {
    this.listaContas.push(conta);
    console.log(colors.fg.green,
      `\nA Conta número ${conta.numero} foi cadastrada com sucesso!`, colors.reset);
  }

  atualizar(conta: Conta): void {
    const buscaConta = this.buscarNoArray(conta.numero);

    if (buscaConta !== null) {
      this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
      console.log(colors.fg.green, `\nA Conta número ${conta.numero} foi atualizada com Sucesso!`, colors.reset);
    } else {
      console.log(colors.fg.red, "\nConta não Encontrada!", colors.reset);
    }
  }

  deletar(numero: number): void {
    const buscaConta = this.buscarNoArray(numero);

    if (buscaConta !== null) {
      this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
      console.log(colors.fg.green, `\nA Conta número ${numero} foi deletada com Sucesso!`, colors.reset);
    } else {
      console.log(colors.fg.red, "\nConta não Encontrada!", colors.reset);
    }
  }

  // Métodos Bancários
  sacar(numero: number, valor: number): void {
    const buscaConta = this.buscarNoArray(numero);

    if (buscaConta !== null) {
      if (buscaConta.sacar(valor) === true)
        console.log(colors.fg.green, `\nO Saque no valor de ${valor}na conta ${numero} foi realizado com Sucesso!`, colors.reset);
    } else
      console.log(colors.fg.red, "\nConta não Encontrada!", colors.reset);
  }

  depositar(numero: number, valor: number): void {
    const buscaConta = this.buscarNoArray(numero);

    if (buscaConta !== null) {
      buscaConta.depositar(valor)
      console.log(colors.fg.green, `\nO Depósito no valor de ${valor} na conta ${numero} foi realizado com Sucesso!`, colors.reset);
    } else
      console.log(colors.fg.red, "\nConta não Encontrada!", colors.reset);
  }

  transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
    const buscaContaOrigem = this.buscarNoArray(numeroOrigem);
    const buscaContaDestino = this.buscarNoArray(numeroDestino);

    if (buscaContaOrigem !== null && buscaContaDestino !== null) {
      if (buscaContaOrigem.sacar(valor) === true) {
        buscaContaDestino.depositar(valor);
        console.log(colors.fg.green, `\nA transferência no valor de ${valor} da Conta número ${numeroOrigem} para a conta ${numeroDestino} realizado com Sucesso!`, colors.reset);
      }

    } else
      console.log(colors.fg.red, "\nA Conta de origem e/ou destino não foram Encontrada!", colors.reset);
  }

  // Métodos Auxiliares

  public gerarNumero(): number {
    return ++this.numero;
  }

  public buscarNoArray(numero: number): Conta | null {
    for (let conta of this.listaContas) {
      if (conta.numero === numero)
        return conta
    }

    return null;
  }
}