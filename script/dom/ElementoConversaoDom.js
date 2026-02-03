export class Dom {
  #valorMoeda;
  #origemMoeda;
  #destinoMoeda;
  #botaoConverter;
  #botaoInverter;
  #nomeMoedaOrigem;
  #nomeMoedaDestino;
  #historico;
  #resultado;
  #resultadoValor;
  #resultadoTaxa;

  constructor() {
    this.#valorMoeda = document.getElementById("valor");
    this.#origemMoeda = document.getElementById("origem");
    this.#destinoMoeda = document.getElementById("destino");
    this.#botaoConverter = document.getElementById("converter");
    this.#botaoInverter = document.getElementById("inverter");
    this.#nomeMoedaOrigem = document.getElementById("nomeMoedaOrigem");
    this.#nomeMoedaDestino = document.getElementById("nomeMoedaDestino");
    this.#historico = document.getElementById("historico");
    this.#resultado = document.getElementById("resultado");
    this.#resultadoValor = document.getElementById("resultadoValor");
    this.#resultadoTaxa = document.getElementById("resultadoTaxa");
  }

  getDados() {
    return {
      valor: this.#valorMoeda.value,
      origem: this.#origemMoeda.value,
      destino: this.#destinoMoeda.value,
    };
  }

  aoClicarEmConverter(callback) {
    this.#botaoConverter.addEventListener("click", callback);
  }

  aoClicarEmInverter(callback) {
    this.#botaoInverter.addEventListener("click", callback);
  }

  aoMudarOrigemMoedaOrigem(callback) {
    this.#origemMoeda.addEventListener("change", callback);
  }

  aoMudarDestinoMoeda(callback) {
    this.#destinoMoeda.addEventListener("change", callback);
  }

  inverterMoedas() {
    const temp = this.#origemMoeda.value;
    this.#origemMoeda.value = this.#destinoMoeda.value;
    this.#destinoMoeda.value = temp;
  }

  mostrarResultado(resultado, origem, destino, taxa) {
    const simbolosMoedas = {
      USD: "US$",
      BRL: "R$",
      ARG: "$",
    };

    const valorFormatado = parseFloat(resultado).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const simboloDestino = simbolosMoedas[destino] || destino;
    this.#resultadoValor.textContent = `${simboloDestino} ${valorFormatado}`;
    this.#resultadoTaxa.textContent = `1 ${origem} = ${taxa} ${destino}`;

    this.#resultado.classList.add("ativo");
  }

  mostrarErro(mensagem) {
    const notificacao = document.getElementById("notificacao");

    this.#resultado.classList.remove("ativo");
    notificacao.textContent = mensagem;
    notificacao.classList.add("notificacao--ativa");

    setTimeout(() => {
      notificacao.classList.remove("notificacao--ativa");
    }, 4000);
  }

  mostrarNomeMoedaDestino(nome) {
    this.#nomeMoedaDestino.textContent = nome;
  }

  mostrarNomeMoedaOrigem(nome) {
    this.#nomeMoedaOrigem.textContent = nome;
  }

  mostrarHistorico(listaHistorico) {
    const mensagemVazia = document.getElementById("mensagemVazia");

    if (listaHistorico.length === 0) {
      this.#historico.innerHTML = "";
      mensagemVazia.style.display = "flex";
      return;
    }

    mensagemVazia.style.display = "none";
    this.#historico.innerHTML = listaHistorico
      .map((item) => {
        const valorFormatado = parseFloat(item.valor).toFixed(2);
        const resultadoFormatado = parseFloat(item.resultado).toFixed(2);
        return `<div class="historico-item">
            <div class="historico-item__header">
              <span class="historico-item__valor-entrada">R$${valorFormatado}</span>
              <span class="material-symbols-outlined historico-item__arrow-pequeno">swap_horiz</span>
              <span class="historico-item__valor-saida">$${resultadoFormatado}</span>
            </div>
            <div class="historico-item__body">
              <span class="historico-item__moedas">${item.origem} → ${item.destino}</span>
            </div>
            <div class="historico-item__footer">
              <span class="historico-item__taxa">Taxa: ${item.taxa}</span>
            </div>
          </div>`;
      })
      .join("");
  }
}
