import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { RepresentanteLegalInterface } from '../../../../../interface/representanteLegal.interface';
import { CadastroStep1Id } from '../../../../../interface/subSection.interface';
import { RepresentanteLegalService } from '../../../../../services/representante-legal.service';
import { QuestionService } from '../../../../../services/question.service';
import { UtilService } from '../../../../../services/util.service';
@Component({
  selector: 'app-representate-legal-matriz',
  templateUrl: './representate-legal-matriz.component.html',
  styleUrl: './representate-legal-matriz.component.scss',
})
export class RepresentateLegalMatrizComponent implements AfterViewInit, OnInit {
  readonly questionSrv: QuestionService = inject(QuestionService);
  readonly utilSrv: UtilService = inject(UtilService);
  formModel: RepresentanteLegalInterface = {
    nome: '',
    anoDeTerminoDeMandato: '',
    seuPapelnaMatriz: '',
    cpf: '',
    dataDeNascimento: '',
    escolaridade: '',
    cursoProfissao: '',
    telefone: '',
    email: '',
  };
  isLoadingAdress = false;
  minimumYear = new Date().getFullYear();
  
  constructor(private representanteService: RepresentanteLegalService) {}

  ngOnInit(): void {
    // Subscribe to representante legal changes
    this.representanteService.representante$.subscribe(representante => {
      // Update the form model with the representante legal values
      if (representante.nome) this.formModel.nome = representante.nome;
      if (representante.cpf) this.formModel.cpf = representante.cpf;
      if (representante.email) this.formModel.email = representante.email;
      if (representante.telefone) this.formModel.telefone = representante.telefone;
      if (representante.seuPapelnaMatriz) this.formModel.seuPapelnaMatriz = representante.seuPapelnaMatriz;
      if (representante.escolaridade) this.formModel.escolaridade = representante.escolaridade;
      if (representante.anoDeTerminoDeMandato) this.formModel.anoDeTerminoDeMandato = representante.anoDeTerminoDeMandato;
      if (representante.dataDeNascimento) this.formModel.dataDeNascimento = representante.dataDeNascimento;
      if (representante.cursoProfissao) this.formModel.cursoProfissao = representante.cursoProfissao;
      
      // Update the question service model
      this.questionSrv.matriz.seccao1.dados.representanteLegal = this.formModel;
    });
  }
  
  ngAfterViewInit(): void {
    console.log(this.minimumYear);

    this.formModel = this.questionSrv.matriz.seccao1.dados.representanteLegal;
    
    // Update the representante legal service with form values
    if (this.formModel) {
      this.representanteService.updateRepresentante(this.formModel);
    }
  }

  onFieldChange(isItCep?: boolean) {
    if (isItCep) {
      //this.getEndereco();
    } else {
      // Update the question service model
      this.questionSrv.matriz.seccao1.dados.representanteLegal = this.formModel;
      this.questionSrv.onMatrizDatachange(CadastroStep1Id.RepresentanteLegal);
      
      // Update the representante legal service
      this.representanteService.updateRepresentante(this.formModel);
    }
  }
}
