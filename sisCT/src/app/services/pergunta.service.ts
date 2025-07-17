import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pergunta } from '../interfaces_crud/pergunta.interface';
import { EnvironmentService } from './environment.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class PerguntaService {
  readonly utilSrv: UtilService = inject(UtilService);
  private apiUrl: string;

  private perguntasIniciais: string[] = [
    'RECURSO_PUBLICO',
    'MODALIDADE_FINACIAMENTO_UNIAO',
    'MODALIDADE_FINACIAMENTO_ESTADUAL',
    'MODALIDADE_FINACIAMENTO_MUNICIPAL',
    'OUTRAS_FONTES_RECURSOS',
    'RECEITAS_PROPRIAS'
  ];

  private perguntaSubject = new BehaviorSubject<Pergunta>({
    id: undefined,
    descricaoPergunta: '',
    ativo: 'S',
    ultimaAtualizacao: new Date().toISOString()
  });

  perguntaAtual: Pergunta = this.perguntaSubject.getValue();
  public pergunta$ = this.perguntaSubject.asObservable();

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {
    this.apiUrl = `${this.environmentService.apiUrl}/perguntas`;

    // Keep perguntaAtual synchronized with perguntaSubject
    this.perguntaSubject.subscribe(pergunta => {
      this.perguntaAtual = pergunta;
    });
    this.inicializarPerguntas();
  }

  getCurrentPergunta(): Pergunta {
    return this.perguntaSubject.getValue();
  }

  updatePergunta(): void {
    this.perguntaAtual.ativo = this.perguntaAtual.ativo === 'S' ? 'S' : 'N';
    this.perguntaAtual.ultimaAtualizacao = new Date().toISOString();

    const { id, ...perguntaSemId } = this.perguntaAtual;
    try {
      if (this.perguntaAtual.id === undefined || this.perguntaAtual.id === 0) {
        this.http.post<Pergunta>(this.utilSrv.getApiBaseUrl('perguntas'), perguntaSemId)
          .subscribe(pergunta => {
            this.perguntaSubject.next(pergunta);
            console.log('Pergunta criada:', pergunta);
          })
      } else {
        const url = `${this.utilSrv.getApiBaseUrl('perguntas')}/${this.perguntaAtual.id}`;
        this.http.put<Pergunta>(url, perguntaSemId)
          .subscribe(pergunta => {
            this.perguntaSubject.next(pergunta);
            console.log('Pergunta atualizada:', pergunta);
          })
      }
    } catch (error) {
      this.utilSrv.showError('Erro ao atualizar pergunta', 'Por favor, tente novamente mais tarde.');
      console.error('Erro ao atualizar pergunta:', error);
    }
  }

  resetPergunta(): void {
    this.perguntaSubject.next({
      id: undefined,
      descricaoPergunta: '',
      ativo: 'S',
      ultimaAtualizacao: new Date().toISOString()
    });
  }

  getAll(): Observable<Pergunta[]> {
    return this.http.get<Pergunta[]>(this.utilSrv.getApiBaseUrl('perguntas'))
      .pipe(
        catchError(this.handleError<Pergunta[]>('getAll', []))
      );
  }

  getById(id: number): Observable<Pergunta> {
    const url = `${this.utilSrv.getApiBaseUrl('perguntas')}/${id}`;
    return this.http.get<Pergunta>(url)
      .pipe(
        catchError(this.handleError<Pergunta>(`getById id=${id}`))
      );
  }

  getByTag(tag: string): Observable<Pergunta[]> {
    const url = `${this.utilSrv.getApiBaseUrl('perguntas')}/tag/${tag}`;
    return this.http.get<Pergunta[]>(url)
      .pipe(
        catchError(this.handleError<Pergunta[]>(`getByTag tag=${tag}`, []))
      );
  }

  create(pergunta: any): Observable<Pergunta> {
    return this.http.post<Pergunta>(this.utilSrv.getApiBaseUrl('perguntas'), pergunta)
      .pipe(
        catchError(this.handleError<Pergunta>('create'))
      );
  }

  update(pergunta: Pergunta): Observable<Pergunta> {
    const url = `${this.utilSrv.getApiBaseUrl('perguntas')}/${pergunta.id}`;
    return this.http.put<Pergunta>(url, pergunta)
      .pipe(
        catchError(this.handleError<Pergunta>('update'))
      );
  }

  delete(id: number): Observable<any> {
    const url = `${this.utilSrv.getApiBaseUrl('perguntas')}/${id}`;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError<any>('delete'))
      );
  }

  inicializarPerguntas(): void {
    this.getAll().subscribe(perguntasExistentes => {
      this.perguntasIniciais.forEach(descricaoPergunta => {
        const perguntaExiste = perguntasExistentes.some(p =>
          p.descricaoPergunta?.toLowerCase() === descricaoPergunta.toLowerCase()
        );

        if (!perguntaExiste) {
          const novaPergunta =
          {
            "id": 0,
            "descricaoPergunta": descricaoPergunta,
            "ativo": "S",
            "ultimaAtualizacao": new Date().toISOString()
          }

          this.create(novaPergunta).subscribe(
            resultado => console.log('Pergunta criada:', resultado),
            erro => console.error('Erro ao criar pergunta:', erro)
          );
        }
      });
    });
  }

  verificarPerguntaExiste(pergunta: string): string {
    return this.perguntasIniciais.some(p => p.toLowerCase() === pergunta.toLowerCase()) ? pergunta : '';
  }

  getIdByDescricao(descricao: string): Observable<number> {
    return this.getAll().pipe(
      map(pe => {
        console.log('Perguntas encontradas:', pe);
        console.log('Buscando por:', descricao);
        let result = 0;
        for (let index = 0; index < pe.length; index++) {
          const pergunta: any = pe[index];
          console.log(`ID: ${pergunta.id}, Descrição: ${pergunta.DS_PERGUNTA}`);
          if (pergunta.descricaoPergunta?.toLowerCase().trim() === descricao.toLowerCase().trim()) {
            if (result == 0) {
              result = pergunta.id || 0;
              break;
            }
          }
        };
        return result;
      }));
  };



  private gerarTag(descricao: string): string {
    return descricao.substring(0, 10).toUpperCase().replace(/[^A-Z0-9]/g, '');
  }

  limparTudo(): void {
    // Primeiro excluir todas as respostas
    this.http.get<any[]>(this.utilSrv.getApiBaseUrl('respostas')).subscribe(respostas => {
      respostas.forEach(resposta => {
        this.http.delete(`${this.utilSrv.getApiBaseUrl('respostas')}/${resposta.PK_RL_RESPOSTA}`).subscribe();
      });

      // Depois excluir todas as perguntas
      this.getAll().subscribe(perguntas => {
        perguntas.forEach(pergunta => {
          if (pergunta.id) {
            this.delete(pergunta.id).subscribe();
          }
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