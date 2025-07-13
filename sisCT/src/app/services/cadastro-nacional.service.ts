// src/app/services/cadastro-nacional.service.ts

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CadastroNacional } from '../interfaces_crud/cadastro-nacional.interface';
import { EnvironmentService } from './environment.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class CadastroNacionalService {
  readonly utilSrv: UtilService = inject(UtilService);
  private apiUrl: string;

  public areasAtuacoes: any[] = []; // Array para armazenar itens selecionados

  // BehaviorSubject to store and share the current cadastro nacional
  public cadastroSubject = new BehaviorSubject<CadastroNacional>({
    "id": 0,
    "dsOutroConselhoMunicipal": "",
    "dsInscricaoConselhoEstadual": "",
    "dsEmailInstitucional": "",
    "dtValidadeLicensa": "",
    "noFantasia": "",
    "noRazaoSocial": "",
    "nuCnpj": "",
    "nuCpfOwner": "",
    "dsAtividadeFilial": "",
    "coCnaePrincipal": "",
    "coCnaeSecundario": "",
    "vlReceitaBruta": 0,
    "coOutrasFontes": 0,
    "dsOutrasReceitas": "",
    "dsOutros": "",
    "nuPrazoProjeto": 0,
    "dtInicioCebas": "",
    "dtTerminoCebas": "",
    "nuAnoProtocoloCebas": 0,
    "nuProtocoloCebas": "",
    "nuCapacidadeTotal": 0,
    "nuCapacidadeFeminino": 0,
    "nuCapacidadeMaes": 0,
    "nuCapacidadeMasculino": 0,
    "nuCapacidadeIdosos": 0,
    "dsArticulacaoPolitica": "",
    "dsAcoesRealizadas": "",
    "dsTemasTrabalhados": "",
    "dsPeridiocidadeAtividade": "",
    "ds12Passos": "",
    "dsDependentesQuimicos": "",
    "dsGruposApoio": "",
    "dsOutraMetodologia": "",
    "dsServicosPsicossocial": "",
    "dsProfissionaisPsicossocial": "",
    "dsAcoesRessocializacao": "",
    "dsParceriasRessocializacao": "",
    "dtAcordo": "",
    "stAceite": "",
    "stAreaAtuacao": "",
    "stAreaCertificavel": "",
    "stPossuiFinanciamentoEstadual": "",
    "stPossuiFinanciamentoEstado": "",
    "stPossuiFinanciamentoMunicipio": "",
    "stPossuiLicencaSanitaria": "",
    "stPossuiCebas": "",
    "stPossuiReqCebasDepad": "",
    "stCumpreConad": "",
    "stPossuiInscrMunicipal": "",
    "stPossuiInscrEstadual": "",
    "stPossuiReconhecimentoPublico": "",
    // "stArticulacaoPublica": "",
    "stPeriodicidadeCapacitacao": "",
    "stCapacidadeAtendimento": "",
    // "stEcCapacidadeAtendimento": "",
    "stFormaAcesso": "",
    "stEstruturaFisica": "",
    "stEspacoColetivo": "",
    // "stPossuiQuadroTecnico": "",
    "stEspacoIndividual": "",
    // "stEspacoEntidade": "",
    "stPeriodicidadePrevencao": "",
    "stParticipacaoPrevencao": "",
    "stDozePassos": "",
    "stApoioDozePassos": "",
    "stAtendimentoPsicossocial": "",
    "stRessocializacao": "",
    "stParceriaRessocializacao": "",
    "stStatusCadastro": "",
    "stAtivo": "",
    "dtUltimaAtualizacao": ""
  });
  cadastroAtual: CadastroNacional = this.cadastroSubject.getValue();

  // Observable to expose the cadastro instance
  public cadastro$ = this.cadastroSubject.asObservable();

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {
    this.apiUrl = `${this.environmentService.apiUrl}/cadastro-nacional`;

    // Keep cadastroAtual synchronized with cadastroSubject
    this.cadastroSubject.subscribe(cadastro => {
      this.cadastroAtual = cadastro;
    });
  }

  // Get the current cadastro instance
  getCurrentCadastro(): CadastroNacional {
    return this.cadastroSubject.getValue();
  }

  // Update the current cadastro instance
  updateCadastro(): Promise<boolean> {
    const { id, ...cadastroSemId } = this.cadastroAtual;
    const url = this.cadastroAtual.id !== 0
      ? `${this.utilSrv.getApiBaseUrl('cadastro-nacional')}/${this.cadastroAtual.id}`
      : this.utilSrv.getApiBaseUrl('cadastro-nacional');

    return new Promise<boolean>((resolve) => {
      const request = this.cadastroAtual.id !== 0
        ? this.http.put<CadastroNacional>(url, this.cadastroAtual)
        : this.http.post<CadastroNacional>(url, cadastroSemId);

      request.subscribe({
        next: (cadastro) => {
          this.cadastroSubject.next(cadastro);
          console.log('Cadastro atualizado:', cadastro);
          resolve(true);
        },
        error: (error) => {
          this.utilSrv.showError('Erro ao atualizar cadastro', 'Por favor, tente novamente mais tarde.');
          console.error('Erro ao atualizar cadastro:', error);
          resolve(false);
        }
      });
    });
  }
  // Reset the cadastro instance to default values
  resetCadastro(): void {
    const resetValues: Partial<CadastroNacional> = {
      stAreaAtuacao: '0',
      noFantasia: '',
      nuCnpj: '',
      stAtivo: '1',
      dtUltimaAtualizacao: new Date().toISOString()
    };
    this.cadastroSubject.next({ ...this.cadastroSubject.getValue(), ...resetValues });
  }

  getAll(): Observable<CadastroNacional[]> {
    return this.http.get<CadastroNacional[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<CadastroNacional[]>('getAll', []))
      );
  }

  getById(id: number): Observable<CadastroNacional> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<CadastroNacional>(url)
      .pipe(
        catchError(this.handleError<CadastroNacional>(`getById id=${id}`))
      );
  }

  create(cadastroNacional: CadastroNacional): Observable<CadastroNacional> {
    return this.http.post<CadastroNacional>(this.apiUrl, cadastroNacional)
      .pipe(
        catchError(this.handleError<CadastroNacional>('create'))
      );
  }

  update(cadastroNacional: CadastroNacional): Observable<CadastroNacional> {
    const url = `${this.apiUrl}/${cadastroNacional.id}`;
    return this.http.put<CadastroNacional>(url, cadastroNacional)
      .pipe(
        catchError(this.handleError<CadastroNacional>('update'))
      );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError<any>('delete'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}