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
    const novasVagas: MapaDeVagas[] = [];

    for (let i = 0; i < quantidade; i++) {
      novasVagas.push(this.criarVagaPadrao());
    }

    this.vagas.push(...novasVagas);
    this.atualizarObservable();
  }

  // Cria uma vaga com valores padrão
  private criarVagaPadrao(): MapaDeVagas {
    return {
      stDisponibilidade: 1,
      dsIdentificacaoAcolhido: '',
      nuCpf: null,
      dtNascimento: '',
      dtIngresso: '',
      dtSaida: null,
      stPublico: 0,
      stGratuidade: -1,
      stFinanciamento: -1,
      stAtivo: 1,
      pkCadastroNacional: 0,
      pkMapaDeVagas: this.gerarIdUnico(),
      dtUltimaAtualizacao: ''
    };
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
  atualizarVaga(id: number, dadosAtualizados: Partial<MapaDeVagas>): boolean {
    const index = this.vagas.findIndex(v => v.pkMapaDeVagas === id);

    if (index === -1) return false;

    this.vagas[index] = {
      ...this.vagas[index],
      ...dadosAtualizados,
      dtUltimaAtualizacao: new Date().toISOString(),
      pkMapaDeVagas: id
    };

    this.atualizarObservable();
    return true;
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
    const idsExistentes = this.vagas
      .map(v => v.pkMapaDeVagas)
      .filter(id => id !== undefined) as number[];

    return idsExistentes.length > 0
      ? Math.max(...idsExistentes) + 1
      : 1;
  }

  desativarVaga(id: number): boolean {
    const vaga = this.obterVagaPorId(id);
    if (!vaga) return false;
    this.adicionarVaga(this.criarVagaPadrao());
    return this.atualizarVaga(id, {
      stAtivo: 0,
      dtUltimaAtualizacao: new Date().toISOString()
    });
  }
}