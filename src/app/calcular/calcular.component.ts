import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calcular',
  templateUrl: './calcular.component.html',
  styleUrls: ['./calcular.component.scss']
})
export class CalcularComponent {

  @Output() aoCalcular = new EventEmitter<any>();

  peso: number;
  altura: number;
  resultadoValor: string;
  resultadoTabela: string;
  resultadoTotal: string;

  calcular(){
    const calculoEmitir = {altura: this.altura, peso: this.peso};
    this.aoCalcular.emit(calculoEmitir);
    this.calculoResultados();
    this.limparCampos();
  }

  limparCampos() {
    this.peso = null;
    this.altura = null;
  }

  ResultadoToStr() {
    const resultadoStr: string = this.criarResultado(
      this.peso, this.altura).toFixed(2);

    return resultadoStr;
  }

  criarResultado(a: number, b: number) {
    const resultado: number = a / (b * b);

    return resultado;
  }

  tabela(x: number) {
    let textResult: string;
    if (x > 40) {
      textResult = "OBESIDADE GRAVE - III";
    }
    if (x > 30 && x < 40) {
      textResult = "OBESIDADE - II";
    }
    if (x > 25 && x < 30) {
      textResult = "SOBREPESO - I";
    }
    if (x > 18.5 && x < 25) {
      textResult = "PESO IDEAL";
    }
    if (x < 18.5) {
      textResult = "MAGREZA";
    }

    return textResult;
  }

  resultadoCompleto (a: string, b: string) {
    const novoResultado = `${a} - ${b}`;
    return novoResultado;
  }

  calculoResultados() {
    this.resultadoValor = this.ResultadoToStr();
    this.resultadoTabela = this.tabela(this.criarResultado(this.peso, this.altura));
    this.resultadoTotal = this.resultadoCompleto(this.resultadoValor, this.resultadoTabela);
  }
}
