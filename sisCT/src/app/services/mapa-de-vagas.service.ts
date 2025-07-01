import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MapaDeVagas } from '../interfaces_crud/mapa_vagas.interface';


@Injectable({
  providedIn: 'root'
})
export class MapaDeVagasService {
  private vagas: MapaDeVagas[] = [];
  private vagasSubject = new BehaviorSubject<MapaDeVagas[]>([]);
  public vagas$ = this.vagasSubject.asObservable();
  public idVagaAtual = -1;

  constructor() { }



  // Novo método para ajustar quantidade de vagas
  ajustarQuantidadeVagas(quantidadeDesejada: number): void {
    const quantidadeAtual = this.vagas.length;
    const diferenca = quantidadeDesejada - quantidadeAtual;

    if (diferenca > 0) {
      this.adicionarVagasEmLote(diferenca);
    }
  }

  // Adiciona múltiplas vagas de uma vez (com notificação única)
  private adicionarVagasEmLote(quantidade: number): void {
    // const novasVagas: MapaDeVagas[] = [];

    for (let i = 0; i < quantidade; i++) {
      // novasVagas.push(this.criarVagaPadrao());
      this.vagas.push(this.criarVagaPadrao());
    }

    // this.vagas.push(...novasVagas);
    this.atualizarObservable();
  }

  // Cria uma vaga com valores padrão
  private criarVagaPadrao(): MapaDeVagas {
    let result = {
      stDisponibilidade: -1,
      dsIdentificacaoAcolhido: '',
      nuCpf: null,
      dtNascimento: '',
      dtIngresso: '',
      dtSaida: null,
      stPublico: -1,
      stGratuidade: -1,
      stFinanciamento: -1,
      stAtivo: 1,
      pkCadastroNacional: 0,
      pkMapaDeVagas: this.gerarIdUnico(),
      dtUltimaAtualizacao: ''
    };
    return result;
  }

  // CREATE
  adicionarVaga(novaVaga: MapaDeVagas): void {
    const vagaCompleta: MapaDeVagas = {
      ...novaVaga,
      pkMapaDeVagas: this.gerarIdUnico(),
      dtUltimaAtualizacao: new Date().toISOString()
    };
    this.vagas.push(vagaCompleta);
    this.atualizarObservable();
  }

  // READ (todos)
  obterTodasVagas(): MapaDeVagas[] {
    return [...this.vagas];
  }

  // READ (por ID)
  obterVagaPorId(id: number): MapaDeVagas | undefined {
    return this.vagas.find(v => v.pkMapaDeVagas === id);
  }

  // UPDATE
  atualizarVaga(id: number, dadosAtualizados: Partial<MapaDeVagas>): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const index = this.vagas.findIndex(v => v.pkMapaDeVagas === id);

        if (index === -1) {
          resolve(false);
          return;
        }

        this.vagas[index] = {
          ...this.vagas[index],
          ...dadosAtualizados,
          dtUltimaAtualizacao: new Date().toISOString(),
          pkMapaDeVagas: id
        };

        this.atualizarObservable();
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  // DELETE
  removerVaga(id: number): boolean {
    const initialLength = this.vagas.length;
    this.vagas = this.vagas.filter(v => v.pkMapaDeVagas !== id);

    if (this.vagas.length !== initialLength) {
      this.atualizarObservable();
      return true;
    }
    return false;
  }

  private atualizarObservable(): void {
    this.vagasSubject.next([...this.vagas]);
  }

  private gerarIdUnico(): number {
    if (!this.vagas || this.vagas.length === 0) {
      console.log('Retornando 1 porque a lista está vazia');
      return 1;
    }

    const maxId = this.vagas.reduce((max, vaga) => {
      const id = vaga.pkMapaDeVagas ?? 0;
      return id > max ? id : max;
    }, 0);

    console.log('IDs encontrados:', this.vagas.map(v => v.pkMapaDeVagas));
    console.log('Max ID encontrado:', maxId);

    return maxId + 1;
  }


  desativarVaga(id: number): boolean {
    const vaga = this.obterVagaPorId(id);
    if (!vaga) return false;
    this.adicionarVaga(this.criarVagaPadrao());
     this.atualizarVaga(id, {
      stAtivo: 0,
      dtUltimaAtualizacao: new Date().toISOString()
    });
    return true;
  }
}