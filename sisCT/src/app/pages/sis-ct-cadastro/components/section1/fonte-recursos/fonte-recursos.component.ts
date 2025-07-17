import { AfterViewInit, Component, inject } from '@angular/core';
import { FonteRecursosInterface } from '../../../../../interface/fonteRecursos.interfaces';
import { RespostaLocalInterface } from '../../../../../interfaces_crud/resposta.interface';
import { CadastroNacionalService } from '../../../../../services/cadastro-nacional.service';
import { QuestionService } from '../../../../../services/question.service';
import { RespostaService } from '../../../../../services/resposta.service';
import { StatusService } from '../../../../../services/status.service';
import { UtilService } from '../../../../../services/util.service';


@Component({
  selector: 'app-fonte-recursos',
  templateUrl: './fonte-recursos.component.html',
  styleUrl: './fonte-recursos.component.scss',
})
export class FonteRecursosComponent implements AfterViewInit {
  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);
  readonly respostaService: RespostaService = inject(RespostaService);
  formModel: FonteRecursosInterface = {
    receitaBruta: null,
    recursosPublicos: {
      uniao: { possui: false, modalidades: [] },
      estadual: { possui: false, modalidades: [] },
      municipal: { possui: false, modalidades: [] },
    },
    outrasFontes: {
      doacoesFinanceirasTerceiros: false,
      parceriasPrivadas: false,
      receitasProprias: [],
      outros: '',
    },
  };



  selectedModalidades = 2;
  selectReceitasProprias = 2;

  niveisFonte: RespostaLocalInterface[] = [this.respostaService.criarRespostaVazia(0, 'RECURSO_PUBLICO', 'Possui financiamento com a União'), this.respostaService.criarRespostaVazia(1, 'RECURSO_PUBLICO', 'Possui financiamento com o Estado'), this.respostaService.criarRespostaVazia(2, 'RECURSO_PUBLICO', 'Possui financiamento com o município')];
  niveisMultiplos: number[] = [-1, -1, -1, -1, -1, -1, -1];
  modalidades = [
    { id: 1, nome: 'Contrato' },
    { id: 2, nome: 'Termo de Fomento' },
    { id: 3, nome: 'Termo de Colaboração' },
    { id: 4, nome: 'Outros' },
    { id: 5, nome: 'Emendas Parlamentares' },
    { id: 6, nome: 'Parcerias' },
    { id: 7, nome: 'Editais de seleção' }
  ];
  receitasProprias = [
    { label: 'Mensalidades por parte dos acolhidos/famílias', value: '0' },
    { label: 'Campanhas de arrecadação', value: '1' },
    { label: 'Doações dos associados', value: '2' },
    { label: 'Venda de produtos', value: '3' },
    { label: 'Outros', value: '4' },
  ];
  constructor(
    public cadastroService: CadastroNacionalService,
    private statusService: StatusService
  ) { }


  ngOnInit(): void {
    // Get current value from service
    const currentCadastro = this.cadastroService.getCurrentCadastro();
    const currentAreaAtuacao = currentCadastro?.stAreaAtuacao;

  }

  ngAfterViewInit(): void { }

  onFieldChange() {
    this.respostaService.updateResposta(this.niveisFonte, 161); // this.cadastroService.cadastroAtual.id);
  }
  onSelectionChange(event: any) {
    console.log('Valores selecionados:', event.value); // Array de IDs
    // ou
    console.log('Opções selecionadas:', event.source.selected); // Array de MatOption
  }

  // getModalidadesSelecionadas(nivelId: string) {
  //   const idsSelecionados = this.niveisMultiplos[Number(nivelId)] || [];
  //   return this.modalidades.filter(m => idsSelecionados.includes(m.id));
  // }
  onSelectClosed() {
    Object.keys(this.niveisMultiplos).forEach(nivelId => {
      const selecionados = this.niveisMultiplos[Number(nivelId)];
      console.log(`Nível ${nivelId}:`, selecionados);

      // Para obter os nomes das modalidades selecionadas:
      // const modalidadesSelecionadas = this.getModalidadesSelecionadas(nivelId);
      // console.log('Modalidades:', modalidadesSelecionadas.map(m => m.nome));
    });
  }
}
