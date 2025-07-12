// src/app/services/cadastro-nacional.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CadastroNacional } from '../interfaces_crud/cadastro-nacional.interface';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class CadastroNacionalService {
  private apiUrl: string;

  public areasAtuacoes: any[] = []; // Array para armazenar itens selecionados

  // BehaviorSubject to store and share the current cadastro nacional
  public cadastroSubject = new BehaviorSubject<CadastroNacional>({
    id: 0,
    dsOutroConselhoMunicipal: '',
    dsInscricaoConselhoEstadual: '',
    dsEmailInstitucional: 'Email',
    dtValidadeLicensa: '2025-01-01',
    noFantasia: 'Nome Fantasia teste',
    noRazaoSocial: 'Teste',
    nuCnpj: '324234',
    nuCpfOwner: '',
    dsAtividadeFilial: '',
    coCnaePrincipal: '111',
    coCnaeSecundario: '2222',
    vlReceitaBruta: 0,
    coOutrasFontes: 0,
    dsOutrasReceitas: '',
    dsOutros: '',
    nuPrazoProjeto: 0,
    dtInicioCebas: '',
    dtTerminoCebas: '',
    nuAnoProtocoloCebas: 0,
    nuProtocoloCebas: '',
    nuCapacidadeTotal: 0,
    nuCapacidadeFeminino: 0,
    nuCapacidadeMaes: 0,
    nuCapacidadeMasculino: 0,
    nuCapacidadeIdosos: 0,
    dsArticulacaoPolitica: '',
    dsAcoesRealizadas: '',
    dsTemasTrabalhados: '',
    dsPeridiocidadeAtividade: '',
    ds12Passos: '',
    dsDependentesQuimicos: '',
    dsGruposApoio: '',
    dsOutraMetodologia: '',
    dsServicosPsicossocial: '',
    dsProfissionaisPsicossocial: '',
    dsAcoesRessocializacao: '',
    dsParceriasRessocializacao: '',
    dtAcordo: '',
    stAceite: '0',
    stAreaAtuacao: '0',
    stAreaCertificavel: '0',
    stPossuiFinanciamentoEstadual: '0',
    stPossuiFinanciamentoEstado: '0',
    stPossuiFinanciamentoMunicipio: '0',
    stPossuiLicencaSanitaria: '',
    stPossuiCebas: '0',
    stPossuiReqCebasDepad: '0',
    stCumpreConad: '0',
    stPossuiInscrMunicipal: '0',
    stPossuiInscrEstadual: '0',
    stPossuiReconhecimentoPublico: '0',
    stPeriodicidadeCapacitacao: '0',
    stCapacidadeAtendimento: '0',
    stFormaAcesso: '0',
    stEstruturaFisica: '0',
    stEspacoColetivo: '0',
    stEspacoIndividual: '0',
    stPeriodicidadePrevencao: '0',
    stParticipacaoPrevencao: '0',
    stDozePassos: '0',
    stApoioDozePassos: '0',
    stAtendimentoPsicossocial: '0',
    stRessocializacao: '0',
    stParceriaRessocializacao: '0',
    stStatusCadastro: '0',
    stAtivo: '1',
    dtUltimaAtualizacao: new Date().toISOString()
  });

  cadastroAtual: CadastroNacional = this.cadastroSubject.getValue();

  // Observable to expose the cadastro instance
  public cadastro$ = this.cadastroSubject.asObservable();

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {
    this.apiUrl = `${this.environmentService.apiUrl}/cadastro-nacional`;
  }

  // Get the current cadastro instance
  getCurrentCadastro(): CadastroNacional {
    return this.cadastroSubject.getValue();
  }

  // Update the current cadastro instance
  updateCadastro(cadastro: Partial<CadastroNacional>): void {
    const current = this.cadastroSubject.getValue();
    this.cadastroSubject.next({ ...current, ...cadastro });
    console.log('Cadastro atualizado:', this.cadastroSubject.getValue());
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