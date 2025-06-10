import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RlContato } from '../interface/contato.interface';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private contatos: RlContato[] = [];
  private contatosSubject = new BehaviorSubject<RlContato[]>([]);

  constructor() {
    // Inicializa com dados de exemplo para teste
    this.gerarContatosExemplo();
  }

  getContatos(): Observable<RlContato[]> {
    return this.contatosSubject.asObservable();
  }

  adicionarContato(contato: RlContato): void {
    // Gera um novo ID incremental
    const maxId = this.contatos.length > 0 
      ? Math.max(...this.contatos.map(c => c.PK_RLCONTATO))
      : 0;
    
    contato.PK_RLCONTATO = maxId + 1;
    contato.DT_ATUALIZACAO = new Date().toISOString();
    
    this.contatos.push(contato);
    this.contatosSubject.next([...this.contatos]);
  }

  atualizarContato(contato: RlContato): void {
    const index = this.contatos.findIndex(c => c.PK_RLCONTATO === contato.PK_RLCONTATO);
    if (index !== -1) {
      contato.DT_ATUALIZACAO = new Date().toISOString();
      this.contatos[index] = { ...contato };
      this.contatosSubject.next([...this.contatos]);
    }
  }

  desativarContato(id: number): void {
    const index = this.contatos.findIndex(c => c.PK_RLCONTATO === id);
    if (index !== -1) {
      this.contatos[index].ST_CONTATO_ATIVO = 'N';
      this.contatos[index].DT_ATUALIZACAO = new Date().toISOString();
      this.contatosSubject.next([...this.contatos]);
    }
  }

  private gerarContatosExemplo(): void {
    const tiposContato = [1, 2]; // 1 - Telefone, 2 - Email
    const statusAtivo = ['S', 'N'];
    
    // Gera 45 contatos de exemplo
    for (let i = 1; i <= 45; i++) {
      const tipoContato = tiposContato[Math.floor(Math.random() * tiposContato.length)];
      let coContato: string;
      
      if (tipoContato === 1) { // Telefone
        const ddd = Math.floor(Math.random() * 90) + 10;
        const parte1 = Math.floor(Math.random() * 90000) + 10000;
        const parte2 = Math.floor(Math.random() * 9000) + 1000;
        coContato = `(${ddd}) ${parte1}-${parte2}`;
      } else { // Email
        const dominios = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'empresa.com.br'];
        const dominio = dominios[Math.floor(Math.random() * dominios.length)];
        coContato = `contato${i}@${dominio}`;
      }
      
      // Decide qual campo de associação preencher (apenas um, os outros são nulos)
      let pkCadastroNacional = null;
      let pkRepresentanteLegal = null;
      let pkRepresentanteTecnico = null;
      
      const tipoAssociacao = Math.floor(Math.random() * 3);
      if (tipoAssociacao === 0) {
        pkCadastroNacional = Math.floor(Math.random() * 100000) + 1;
      } else if (tipoAssociacao === 1) {
        pkRepresentanteLegal = Math.floor(Math.random() * 100000) + 1;
      } else {
        pkRepresentanteTecnico = Math.floor(Math.random() * 100000) + 1;
      }
      
      this.contatos.push({
        PK_RLCONTATO: i,
        CO_CONTATO: coContato,
        PK_TIPO_CONTATO: tipoContato,
        ST_CONTATO_ATIVO: statusAtivo[Math.floor(Math.random() * statusAtivo.length)],
        DT_ATUALIZACAO: new Date().toISOString(),
        PK_CADASTRO_NACIONAL: pkCadastroNacional,
        PK_REPRESENTANTE_LEGAL: pkRepresentanteLegal,
        PK_REPRESENTANTE_TECNICO: pkRepresentanteTecnico
      });
    }
    
    this.contatosSubject.next([...this.contatos]);
  }
}