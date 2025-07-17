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
    const url = `${this.utilSrv.getApiBaseUrl('respostas')}/${resposta.id}`;
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
        const perguntasEnviadas = [...new Set(respostasExistentes.map(r => r.perguntaId = perguntaId))];
        let respostasParaDeletar = [];

        for (let index = 0; index < respostasExistentes.length; index++) {
          const element = respostasExistentes[index];
          if (element.perguntaId == perguntaId) {
            this.delete(element.id!).subscribe();
          }
        }
        respostas.forEach(resposta => {
          const r: RespostaInterface = {
            perguntaId: perguntaId,
            cadastroNacionalId: 161, //cadastroId,
            ativo: 'S',
            codigoResposta: resposta.co_resposta ? '1' : '0',
            dataUltimaAtualizacao: new Date()
          };
          this.create(r).subscribe();
        });
        //        });
      });
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

   montarRespostas(respostasArray:any[], textoPergunta: string): Promise<RespostaLocalInterface[]> {
    return new Promise((resolve, reject) => {
      try {
        const rlocal: RespostaLocalInterface[] = [];

        for (let index = 0; index < respostasArray.length; index++) {
          const resposta = respostasArray[index];
          const r: RespostaLocalInterface = {
            id: 0,
            co_resposta: resposta.trim(), // Usando trim() para evitar espaços extras
            texto_pergunta: textoPergunta,
            chave_pergunta: textoPergunta
          };
          rlocal.push(r);
        }

        resolve(rlocal); // Resolve com o array preenchido
      } catch (error) {
        reject(error); // Trata possíveis erros
      }
    });
  }
}