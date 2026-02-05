import { colors } from "../util/Colors";
import { Conta } from "./Conta";

export class ContaCorrente extends Conta {

  // Atributois específicos de Conta Corrente
  private _limite: number;

  // Construtor com a chamada para a Super Classe
  constructor(
    numero: number,
    agencia: number,
    titular: string,
    tipo: number,
    saldo: number,
    limite: number) {

    super(numero, agencia, titular, tipo, saldo)
    this._limite = limite;
  }

  // Método sacar Sobrescrito
  public sacar(valor: number): boolean {
    if (valor <= 0) {
      console.log(
        colors.fg.red,
        "O valor deve ser positivo",
        colors.reset);
      return false;
    }
    if (valor > (this.saldo + this._limite)) {
      console.log(
        colors.fg.red,
        "Saldo Insuficiente!",
        colors.reset);
      return false;
    }

    this.saldo -= valor;
    return true;
  }

  // Métodos GET e SET específicos da Classe ContaCorrente
  public get limite(): number {
    return this._limite;
  }

  public set limite(value: number) {
    this._limite = value;
  }


  // Método visualizar sobrescrito (Polimorfismo)
  public visualizar(): void {
    super.visualizar();
    console.log(`Limite da conta: R$ ${this._limite.toFixed(2)}`);
  }

}