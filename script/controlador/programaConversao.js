import { Dom } from "../dom/ElementoConversaoDom.js";
import { ValidadorDeDados } from "../entrada/validadorDeDados.js";
import { ConverterMoeda } from "../servicos/conversorMoeda.js";
import { NOMES_MOEDAS } from "../servicos/nomeMoeda.js";
import { HistoricoMoeda } from "../servicos/historico.js";

export class programaConversao {
  constructor() {
    this.dom = new Dom();
    this.historico = new HistoricoMoeda();
  }

  inicializar() {
    this.atualizarNomesMoedas();
    this.dom.aoClicarEmConverter(() => this.executarConversao());
    this.dom.aoClicarEmInverter(() => this.inverterMoedas());
    this.dom.aoMudarOrigemMoedaOrigem(() => this.atualizarNomesMoedas());
    this.dom.aoMudarDestinoMoeda(() => this.atualizarNomesMoedas());
  }

  executarConversao() {
    try {
      const dados = this.dom.getDados();
      const entrada = new ValidadorDeDados(dados);
      this.converterMoeda = new ConverterMoeda(entrada.getDadosValidados());
      const resultado = this.converterMoeda.converter();
      const taxa = this.converterMoeda.obterTaxa();
      this.dom.mostrarResultado(resultado, dados.origem, dados.destino, taxa);
      this.historico.adicionarHistorico({ ...dados, resultado, taxa });
      this.dom.mostrarHistorico(this.historico.exibirLista());
    } catch (erro) {
      this.dom.mostrarErro(erro.message);
    }
  }

  atualizarNomesMoedas() {
    const dados = this.dom.getDados();
    this.dom.mostrarNomeMoedaOrigem(NOMES_MOEDAS[dados.origem]);
    this.dom.mostrarNomeMoedaDestino(NOMES_MOEDAS[dados.destino]);
  }

  inverterMoedas() {
    this.dom.inverterMoedas();
    this.executarConversao();
    this.atualizarNomesMoedas();
  }
}
