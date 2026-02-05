import { colors } from "../util/Colors";
import { Conta } from "./Conta";

export class ContaPoupanca extends Conta {

  // Atributois específicos de Conta Poupanca
  private _aniversario: number;

  // Construtor com a chamada para a Super Classe
  constructor(
    numero: number,
    agencia: number,
    titular: string,
    tipo: number,
    saldo: number,
    aniversario: number) {

    super(numero, agencia, titular, tipo, saldo)
    this._aniversario = aniversario;
  }

  public get aniversario() {
    return this._aniversario;
  }
  public set aniversario(aniversario: number) {
    this._aniversario = aniversario;
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
    if (valor > this.saldo) {
      console.log(
        colors.fg.red,
        "Saldo Insuficiente!",
        colors.reset);
      return false;
    }

    this.saldo -= valor;
    return true;
  }

  // Método visualizar sobrescrito (Polimorfismo)
  public visualizar(): void {
    super.visualizar();
    console.log(`Dia do aniversário: ${this._aniversario}`);
  }

}