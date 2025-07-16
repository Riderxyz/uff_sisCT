import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RespostaInterface, RespostaLocalInterface } from '../interfaces_crud/resposta.interface';
import { PerguntaService } from './pergunta.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class RespostaService {
  readonly utilSrv: UtilService = inject(UtilService);
  readonly perguntaSrv: PerguntaService = inject(PerguntaService);

  constructor(private http: HttpClient) { }

  criarRespostaVazia(id: number, chave: string, textoPergunta: string): RespostaLocalInterface {
    return {
      id: id,
      co_resposta: '',
      texto_pergunta: textoPergunta,
      chave_pergunta: chave
    }
  }

  getAll(): Observable<RespostaInterface[]> {
    return this.http.get<RespostaInterface[]>(this.utilSrv.getApiBaseUrl('respostas'))
      .pipe(
        catchError(this.handleError<RespostaInterface[]>('getAll', []))
      );
  }

  getById(id: number): Observable<RespostaInterface> {
    const url = `${this.utilSrv.getApiBaseUrl('respostas')}/${id}`;
    return this.http.get<RespostaInterface>(url)
      .pipe(
        catchError(this.handleError<RespostaInterface>(`getById id=${id}`))
      );
  }

  getByCadastroNacional(cadastroNacionalId: number): Observable<RespostaInterface[]> {
    const url = `${this.utilSrv.getApiBaseUrl('respostas')}/cadastro/${cadastroNacionalId}`;
    return this.http.get<RespostaInterface[]>(url)
      .pipe(
        catchError(this.handleError<RespostaInterface[]>(`getByCadastroNacional id=${cadastroNacionalId}`, []))
      );
  }

  getByPergunta(perguntaId: number): Observable<RespostaInterface[]> {
    const url = `${this.utilSrv.getApiBaseUrl('respostas')}/pergunta/${perguntaId}`;
    return this.http.get<RespostaInterface[]>(url)
      .pipe(
        catchError(this.handleError<RespostaInterface[]>(`getByPergunta id=${perguntaId}`, []))
      );
  }

  create(resposta: RespostaInterface): Observable<RespostaInterface> {
    return this.http.post<RespostaInterface>(this.utilSrv.getApiBaseUrl('respostas'), resposta)
      .pipe(
        catchError(this.handleError<RespostaInterface>('create'))
      );
  }

  update(resposta: RespostaInterface): Observable<RespostaInterface> {
    const url = `${this.utilSrv.getApiBaseUrl('respostas')}/${resposta.PK_RL_RESPOSTA}`;
    return this.http.put<RespostaInterface>(url, resposta)
      .pipe(
        catchError(this.handleError<RespostaInterface>('update'))
      );
  }

  delete(id: number): Observable<any> {
    const url = `${this.utilSrv.getApiBaseUrl('respostas')}/${id}`;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError<any>('delete'))
      );
  }

  async updateResposta(respostas: RespostaLocalInterface[], cadastroId: number): Promise<void> {
    const url = `${this.utilSrv.getApiBaseUrl('respostas')}/cadastro-nacional/${cadastroId}`;
    let perguntaId = 0;
    await this.perguntaSrv.getIdByDescricao(respostas[0].chave_pergunta).subscribe(id => {
      perguntaId = id;

      this.http.get<RespostaInterface[]>(url).subscribe(respostasExistentes => {
        const perguntasEnviadas = [...new Set(respostasExistentes.map(r => r.PK_PERGUNTAS = perguntaId))];

        const respostasParaDeletar = respostasExistentes.filter(r =>
          perguntasEnviadas.includes(r.PK_RL_RESPOSTA!)
        );

        respostasParaDeletar.forEach(resposta => {
          if (resposta.PK_RL_RESPOSTA) {
            this.delete(resposta.PK_RL_RESPOSTA).subscribe();
          }
        });

        this.perguntaSrv.getIdByDescricao(respostas[0].chave_pergunta).subscribe(perguntaId => {
          respostas.forEach(resposta => {
            const r: RespostaInterface = {
              PK_PERGUNTAS: perguntaId,
              PK_CADASTRO_NACIONAL: cadastroId,
              ST_ATIVO: 1,
              CO_RESPOSTA: resposta.co_resposta || '',
              DT_ULTIMA_ATUALIZACAO: new Date()
            };
            this.create(r).subscribe();
          });
        });
      });
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}