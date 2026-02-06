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

  // Métodos GET e SET específicos da Classe Conta Poupanca
  public get aniversario() {
    return this._aniversario;
  }
  public set aniversario(aniversario: number) {
    this._aniversario = aniversario;
  }

  // Método visualizar sobrescrito (Polimorfismo)
  public visualizar(): void {
    super.visualizar();
    console.log(`Dia do aniversário: ${this._aniversario}`);
  }

}