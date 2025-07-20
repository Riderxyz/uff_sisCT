import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MapaDeVagas } from '../interfaces_crud/mapa_vagas.interface';
import { CadastroNacionalService } from './cadastro-nacional.service';
import { EnvironmentService } from './environment.service';
import { UtilService } from './util.service';


@Injectable({
  providedIn: 'root'
})
export class MapaDeVagasService {
  readonly utilSrv: UtilService = inject(UtilService);
  readonly cadastroNacionalService: CadastroNacionalService = inject(CadastroNacionalService);
  private apiUrl: string;

  // Store list of vagas
  public listMapaVagas: MapaDeVagas[] = [];

  // BehaviorSubject for current vaga
  private vagaSubject = new BehaviorSubject<MapaDeVagas>({
    id: 0,
    stDisponibilidade: '',
    dsIdentificacaoAcolhido: '',
    nuCpf: 0,
    dtNascimento: '',
    dtIngresso: '',
    dtSaida: '',
    stPublico: '',
    stGratuidade: '',
    stFinanciamento: '',
    stAtivo: '1',
    dtUltimaAtualizacao: new Date().toISOString(),
    cadastroNacionalId: 0
  });

  vagaAtual: MapaDeVagas = this.vagaSubject.getValue();

  // Observable to expose the vaga instance
  public vaga$ = this.vagaSubject.asObservable();

  // BehaviorSubject for list of vagas
  private vagasSubject = new BehaviorSubject<MapaDeVagas[]>([]);
  public vagas$ = this.vagasSubject.asObservable();

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService

  ) {
    this.apiUrl = `${this.environmentService.apiUrl}/mapa-de-vagas`;

    // Keep vagaAtual synchronized with vagaSubject
    this.vagaSubject.subscribe(vaga => {
      this.vagaAtual = vaga;
    });
  }

  // Método para adicionar vagas em lote
  adicionarVagasEmLote(qtdVagas: number): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const cadastroNacionalId = this.cadastroNacionalService.cadastroAtual.id;

      if (!cadastroNacionalId || qtdVagas <= 0) {
        this.utilSrv.showError('Erro', 'ID do cadastro nacional ou quantidade de vagas inválida.');
        resolve(false);
        return;
      }

      // Verificar quantas vagas já existem para este cadastro nacional
      this.getVagasByCadastroNacional(cadastroNacionalId).subscribe({
        next: (vagasExistentes) => {
          const vagasAtuais = vagasExistentes.length;
          const vagasParaAdicionar = qtdVagas - vagasAtuais;

          if (vagasParaAdicionar <= 0) {
            this.utilSrv.showInfo('Informação', `Já existem ${vagasAtuais} vagas cadastradas. Não é necessário adicionar mais.`);
            resolve(true);
            return;
          }

          // Criar array de promessas para adicionar as vagas
          const promises: Promise<boolean>[] = [];

          for (let i = 0; i < vagasParaAdicionar; i++) {
            const novaVaga = this.criarVagaPadrao();
            promises.push(this.updateMapaVagas(novaVaga));
          }

          // Executar todas as promessas
          Promise.all(promises)
            .then((results) => {
              const sucesso = results.every(result => result === true);
              if (sucesso) {
                this.utilSrv.showSuccess('Sucesso', `${vagasParaAdicionar} vagas adicionadas com sucesso.`);
                // Recarregar a lista de vagas
                this.loadVagasByCadastroNacional(cadastroNacionalId);
              } else {
                this.utilSrv.showWarn('Atenção', 'Algumas vagas não puderam ser adicionadas.');
              }
              resolve(sucesso);
            })
            .catch((error) => {
              console.error('Erro ao adicionar vagas em lote:', error);
              this.utilSrv.showError('Erro', 'Falha ao adicionar vagas em lote.');
              resolve(false);
            });
        },
        error: (error) => {
          console.error('Erro ao verificar vagas existentes:', error);
          this.utilSrv.showError('Erro', 'Falha ao verificar vagas existentes.');
          resolve(false);
        }
      });
    });
  }

  private criarVagaPadrao(): MapaDeVagas {
    return {
      id: 0,
      stDisponibilidade: '1',
      dsIdentificacaoAcolhido: 'Vaga disponível',
      nuCpf: 0,
      dtNascimento: '',
      dtIngresso: '',
      dtSaida: '',
      stPublico: '0',
      stGratuidade: '0',
      stFinanciamento: '0',
      stAtivo: '1',
      cadastroNacionalId: this.cadastroNacionalService.cadastroAtual.id || 0,
      dtUltimaAtualizacao: new Date().toISOString()
    };
  }



  getCurrentVaga(): MapaDeVagas {
    return this.vagaSubject.getValue();
  }

  updateVaga(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.vagaAtual.dtUltimaAtualizacao = new Date().toISOString();
      this.vagaAtual.stAtivo = '1';
      const { id, ...vagaSemId } = this.vagaAtual;

      try {
        const url = this.vagaAtual.id !== 0
          ? `${this.utilSrv.getApiBaseUrl('mapa-de-vagas')}/${this.vagaAtual.id}`
          : this.utilSrv.getApiBaseUrl('mapa-de-vagas');

        const request = this.vagaAtual.id !== 0
          ? this.http.put<MapaDeVagas>(url, this.vagaAtual)
          : this.http.post<MapaDeVagas>(url, vagaSemId);

        request.subscribe({
          next: (vaga) => {
            this.vagaSubject.next(vaga);
            console.log('Vaga atualizada:', vaga);
            resolve(true);
          },
          error: (error) => {
            this.utilSrv.showError('Erro ao atualizar vaga', 'Por favor, tente novamente mais tarde.');
            console.error('Erro ao atualizar vaga:', error);
            resolve(false);
          }
        });
      } catch (error) {
        this.utilSrv.showError('Erro ao atualizar vaga', 'Por favor, tente novamente mais tarde.');
        console.error('Erro ao atualizar vaga:', error);
        resolve(false);
      }
    });
  }

  resetVaga(): void {
    this.vagaSubject.next({
      id: 0,
      stDisponibilidade: '',
      dsIdentificacaoAcolhido: '',
      nuCpf: 0,
      dtNascimento: '',
      dtIngresso: '',
      dtSaida: '',
      stPublico: '',
      stGratuidade: '',
      stFinanciamento: '',
      stAtivo: '1',
      dtUltimaAtualizacao: new Date().toISOString(),
      cadastroNacionalId: 0
    });
  }

  getAll(): Observable<MapaDeVagas[]> {
    const url = this.utilSrv.getApiBaseUrl('mapa-de-vagas');
    return this.http.get<MapaDeVagas[]>(url)
      .pipe(
        catchError(this.handleError<MapaDeVagas[]>('getAll', []))
      );
  }

  getById(id: number): Observable<MapaDeVagas> {
    const url = `${this.utilSrv.getApiBaseUrl('mapa-de-vagas')}/${id}`;
    return this.http.get<MapaDeVagas>(url)
      .pipe(
        catchError(this.handleError<MapaDeVagas>(`getById id=${id}`))
      );
  }

  create(vaga: MapaDeVagas): Observable<MapaDeVagas> {
    const url = this.utilSrv.getApiBaseUrl('mapa-de-vagas');
    return this.http.post<MapaDeVagas>(url, vaga)
      .pipe(
        catchError(this.handleError<MapaDeVagas>('create'))
      );
  }

  update(vaga: MapaDeVagas): Observable<MapaDeVagas> {
    const url = `${this.utilSrv.getApiBaseUrl('mapa-de-vagas')}/${vaga.id}`;
    return this.http.put<MapaDeVagas>(url, vaga)
      .pipe(
        catchError(this.handleError<MapaDeVagas>('update'))
      );
  }

  delete(id: number): Observable<any> {
    const url = `${this.utilSrv.getApiBaseUrl('mapa-de-vagas')}/${id}`;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError<any>('delete'))
      );
  }


  desativarVaga(id: number): boolean {
    // const vaga = this.obterVagaPorId(id);
    // if (!vaga) return false;
    // this.adicionarVaga(this.criarVagaPadrao());
    // this.atualizarVaga(id, {
    //   stAtivo: 'N',
    //   dtUltimaAtualizacao: new Date().toISOString()
    // });
    return true;
  }

  getVagasByCadastroNacional(cadastroNacionalId: number): Observable<MapaDeVagas[]> {
    cadastroNacionalId = 318;
    const url = `${this.utilSrv.getApiBaseUrl('cadastro-nacional')}/${cadastroNacionalId}/mapa-de-vagas`;

    // Cria um observable que atualiza as listas internas
    return new Observable<MapaDeVagas[]>(observer => {
      this.http.get<MapaDeVagas[]>(url)
        .pipe(
          catchError(this.handleError<MapaDeVagas[]>(`getVagasByCadastroNacional id=${cadastroNacionalId}`, []))
        )
        .subscribe({
          next: (vagas) => {
            // Atualiza as listas internas
            this.listMapaVagas = vagas;
            this.vagasSubject.next(vagas);

            // Emite o resultado para o subscriber original
            observer.next(vagas);
            observer.complete();
          },
          error: (error) => {
            console.error('Erro ao obter vagas:', error);
            observer.error(error);
          }
        });
    });
  }

  loadVagasByCadastroNacional(cadastroNacionalId: number): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (!cadastroNacionalId) {
        resolve(false);
        return;
      }

      this.getVagasByCadastroNacional(cadastroNacionalId)
        .subscribe({
          next: (vagas) => {
            // A lista já foi atualizada pelo getVagasByCadastroNacional
            console.log('Vagas carregadas:', vagas);
            resolve(true);
          },
          error: (error) => {
            this.utilSrv.showError('Erro ao carregar vagas', 'Por favor, tente novamente mais tarde.');
            console.error('Erro ao carregar vagas:', error);
            resolve(false);
          }
        });
    });
  }
  updateMapaVagas(vaga: MapaDeVagas): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (!vaga) {
        resolve(false);
        return;
      }

      const urlBase = this.utilSrv.getApiBaseUrl('cadastro-nacional');
      const getUrl = `${urlBase}/mapa-de-vagas/${vaga.cadastroNacionalId}`;

      // Primeiro verifica se a vaga existe
      this.http.get<MapaDeVagas>(getUrl).subscribe({
        next: (existingVaga) => {
          // Se existe, faz PUT para atualizar
          const updateUrl = `${urlBase}/mapa-de-vagas/${vaga.id}`;
          this.http.put<MapaDeVagas>(updateUrl, vaga).subscribe({
            next: (updatedVaga) => {
              // Remove o antigo e adiciona o novo (mesmo ID)
              this.listMapaVagas = this.listMapaVagas.filter(v => v.id !== vaga.id);
              this.listMapaVagas.push(updatedVaga);
              this.vagasSubject.next([...this.listMapaVagas]);

              this.utilSrv.showSuccess('Sucesso', 'Mapa de vagas atualizado com sucesso.');
              resolve(true);
            },
            error: (error) => {
              console.error('Erro ao atualizar mapa de vagas:', error);
              this.utilSrv.showError('Erro ao atualizar mapa de vagas', 'Por favor, tente novamente mais tarde.');
              resolve(false);
            }
          });
        },
        error: (getError) => {
          if (getError.status === 404) {
            // Se não existe, faz POST para criar
            const insertUrl = `${this.utilSrv.getApiBaseUrl()}/mapa-de-vagas`;
            // Remove o id antes de enviar para criar
            const { id, ...vagaSemId } = vaga;
            this.http.post<MapaDeVagas>(insertUrl, vagaSemId).subscribe({
              next: (newVaga) => {
                // Remove se por algum motivo já existia e adiciona o novo
                this.listMapaVagas = this.listMapaVagas.filter(v => v.id !== newVaga.id);
                this.listMapaVagas.push(newVaga);
                this.vagasSubject.next([...this.listMapaVagas]);

                this.utilSrv.showSuccess('Sucesso', 'Mapa de vagas criado com sucesso.');
                resolve(true);
              },
              error: (postError) => {
                console.error('Erro ao criar mapa de vagas:', postError);
                this.utilSrv.showError('Erro ao criar mapa de vagas', 'Por favor, tente novamente mais tarde.');
                resolve(false);
              }
            });
          } else {
            console.error('Erro ao verificar mapa de vagas:', getError);
            this.utilSrv.showError('Erro ao verificar mapa de vagas', 'Por favor, tente novamente mais tarde.');
            resolve(false);
          }
        }
      });
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.utilSrv.showError(`${operation} falhou`, 'Por favor, tente novamente mais tarde.');
      console.error(`${operation} error:`, error);
      return new Observable<T>(observer => {
        if (result !== undefined) {
          observer.next(result);
        }
        observer.complete();
      });
    };
  }
}