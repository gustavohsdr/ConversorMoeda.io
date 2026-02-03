import { TAXAS } from "./taxaMoeda.js";
export class ConverterMoeda {
  #valor;
  #origem;
  #destino;
  constructor({ valor, origem, destino }) {
    this.#valor = valor;
    this.#origem = origem;
    this.#destino = destino;
  }

  converter() {
    const valor = this.#valor;
    const origem = this.#origem;
    const destino = this.#destino;

    if (origem === destino) {
      return valor;
    }
    return (valor * TAXAS[origem]) / TAXAS[destino];
  }

  obterTaxa() {
    const origem = this.#origem;
    const destino = this.#destino;

    if (origem === destino) {
      return 1;
    }
    return (TAXAS[origem] / TAXAS[destino]).toFixed(4);
  }
}

const dadosConversao = {
  valor: 8.0,
  origem: "BRL",
  destino: "USD",
};

const novoConversor = new ConverterMoeda(dadosConversao);
console.log(novoConversor.converter());
