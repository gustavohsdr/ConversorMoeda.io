import { TAXAS } from "../servicos/taxaMoeda.js";
export class ValidadorDeDados {
  #valor;
  #origem;
  #destino;

  constructor(dados) {
    const valor = parseFloat(dados.valor.replace(",", "."));
    if (isNaN(valor)) {
      throw new Error("Não é um número");
    }
    if (valor <= 0) {
      throw new Error("Valor é menor que 0");
    }

    const origem = dados.origem.trim().toUpperCase();
    const destino = dados.destino.trim().toUpperCase();

    if (!(origem in TAXAS)) {
      throw new Error("Origem não encontrada");
    }

    if (!(destino in TAXAS)) {
      throw new Error("Destino não encontrado");
    }

    this.#valor = valor;
    this.#origem = origem;
    this.#destino = destino;
  }

  getDadosValidados() {
    return {
      valor: this.#valor,
      origem: this.#origem,
      destino: this.#destino,
    };
  }
}
