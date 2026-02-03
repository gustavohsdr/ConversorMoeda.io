export class HistoricoMoeda {
  #historico;
  constructor() {
    this.#historico = [];
  }

  adicionarHistorico(dado) {
    this.#historico.push(dado);
  }

  exibirLista() {
    return this.#historico;
  }
}
