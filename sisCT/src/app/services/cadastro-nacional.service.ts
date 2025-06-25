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

  // BehaviorSubject to store and share the current cadastro nacional
  public cadastroSubject = new BehaviorSubject<CadastroNacional>({
    PK_CADASTRO_NACIONAL: undefined,
    DS_OUTRO_CONSELHO_MUNICIPAL: '',
    DS_INSCRICAO_CONSELHO_ESTADUAL: '',
    DT_VALIDADE_LICENSA: undefined,
    NO_FANTASIA: '',
    NO_RAZAO_SOCIAL: '',
    NU_CNPJ: '',
    DS_ATIVIDADE_FILIAL: '',
    CO_CNAE_PRINCIPAL: '',
    CO_CNAE_SECUNDARIO: '',
    VL_RECEITA_BRUTA: 0,
    CO_OUTRAS_FONTES: 0,
    DS_OUTRAS_RECEITAS: '',
    DS_OUTROS: '',
    NU_PRAZO_PROJETO: 0,
    DT_INICIO_CEBAS: undefined,
    DT_TERMINO_CEBAS: undefined,
    NU_ANO_PROTOCOLO_CEBAS: 0,
    NU_PROTOCOLO_CEBAS: '',
    NU_CAPACIDADE_TOTAL: 0,
    NU_CAPACIDADE_FEMININO: 0,
    NU_CAPACIDADE_MAES: 0,
    NU_CAPACIDADE_MASCULINO: 0,
    NU_CAPACIDADE_IDOSOS: 0,
    DS_ARTICULACAO_POLITICA: '',
    DS_ACOES_REALIZADAS: '',
    DS_TEMAS_TRABALHADOS: '',
    DS_PERIDIOCIDADE_ATIVIDADE: '',
    DS_12_PASSOS: '',
    DS_DEPENDENTES_QUIMICOS: '',
    DS_GRUPOS_APOIO: '',
    DS_OUTRA_METODOLOGIA: '',
    DS_SERVICOS_PSICOSSOCIAL: '',
    DS_PROFISSIONAIS_PSICOSSOCIAL: '',
    DS_ACOES_RESSOCIALIZACAO: '',
    DS_PARCERIAS_RESSOCIALIZACAO: '',
    DT_ACORDO: undefined,
    ST_ACEITE: 0,
    ST_AREA_ATUACAO: 0,
    ST_AREA_CERTIFICAVEL: 0,
    ST_POSSUI_FINANCIAMENTO_ESTADUAL: 0,
    ST_POSSUI_FINANCIAMENTO_ESTADO: 0,
    ST_POSSUI_FINANCIAMENTO_MUNICIPIO: 0,
    ST_POSSUI_LICENCA_SANITARIA: 0,
    ST_POSSUI_CEBAS: 0,
    ST_POSSUI_REQ_CEBAS_DEPAD: 0,
    ST_CUMPRE_CONAD: 0,
    ST_POSSUI_INSCR_MUNICIPAL: 0,
    ST_POSSUI_INSCR_ESTADUAL: 0,
    ST_POSSUI_RECONHECIMENTO_PUBLICO: 0,
    ST_FORMA_ACESSO: 0,
    ST_ESPACO_COLETIVO: 0,
    ST_ESPACO_INDIVIDUAL: 0,
    ST_PARTICIPACAO_PREVENCAO: 0,
    ST_DOZE_PASSOS: 0,
    ST_APOIO_DOZE_PASSOS: 0,
    ST_ATENDIMENTO_PSICOSSOCIAL: 0,
    ST_RESSOCIALIZACAO: 0,
    ST_PARCERIA_RESSOCIALIZACAO: 0,
    ST_ATIVO: 1,
    DT_ULTIMA_ATUALIZACAO: undefined
  });


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
    this.cadastroSubject.next({
      ST_AREA_ATUACAO: 0,
      NO_FANTASIA: '',
      NU_CNPJ: '',
      ST_ATIVO: 1
    });
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
    const url = `${this.apiUrl}/${cadastroNacional.PK_CADASTRO_NACIONAL}`;
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
