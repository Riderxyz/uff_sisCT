import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MapaDeVagas } from '../interfaces_crud/mapa_vagas.interface';
import { EnvironmentService } from './environment.service';
import { UtilService } from './util.service';


@Injectable({
  providedIn: 'root'
})
export class MapaDeVagasService {
  readonly utilSrv: UtilService = inject(UtilService);
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
    const url = `${this.utilSrv.getApiBaseUrl('cadastro-nacional')}/${cadastroNacionalId}/mapa-de-vagas`;
    return this.http.get<MapaDeVagas[]>(url)
      .pipe(
        catchError(this.handleError<MapaDeVagas[]>(`getVagasByCadastroNacional id=${cadastroNacionalId}`, []))
      );
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
            this.listMapaVagas = vagas;
            this.vagasSubject.next(vagas);
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
      const getUrl = `${urlBase}/mapa-de-vagas/${vaga.id}`;

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
              this.handleError('Erro ao atualizar mapa de vagas', error);
              resolve(false);
            }
          });
        },
        error: (getError) => {
          if (getError.status === 404) {
            // Se não existe, faz POST para criar
            const insertUrl = `${urlBase}/mapa-de-vagas`;
            this.http.post<MapaDeVagas>(insertUrl, vaga).subscribe({
              next: (newVaga) => {
                // Remove se por algum motivo já existia e adiciona o novo
                this.listMapaVagas = this.listMapaVagas.filter(v => v.id !== newVaga.id);
                this.listMapaVagas.push(newVaga);
                this.vagasSubject.next([...this.listMapaVagas]);

                this.utilSrv.showSuccess('Sucesso', 'Mapa de vagas criado com sucesso.');
                resolve(true);
              },
              error: (postError) => {
                this.handleError('Erro ao criar mapa de vagas', postError);
                resolve(false);
              }
            });
          } else {
            this.handleError('Erro ao verificar mapa de vagas', getError);
            resolve(false);
          }
        }
      });
    });
  }

  private handleError(message: string, error: any): void {
    this.utilSrv.showError(message, 'Por favor, tente novamente mais tarde.');
    console.error(`${message}:`, error);
  }
}