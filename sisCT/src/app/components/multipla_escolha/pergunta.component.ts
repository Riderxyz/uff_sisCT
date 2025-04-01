import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pergunta, Resposta } from './pergunta.model';

@Component({
  selector: 'app-pergunta',
  standalone: false,
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.scss']
})

export class PerguntaComponent {
  @Input() perguntas: Pergunta[] = [];
  @Input() perguntaId: string | null = null;
  @Output() respostaSelecionada = new EventEmitter<{ perguntaId: string, respostaId: number, selecionado: boolean }>();

  perguntaAtual: Pergunta | null = null;

  ngOnChanges() {
    if (this.perguntaId && this.perguntas) {
      this.perguntaAtual = this.perguntas.find(p => p.id === this.perguntaId) || null;
    }
  }

  onRespostaSelecionada(resposta: Resposta, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    resposta.selecionado = checkbox.checked;

    this.respostaSelecionada.emit({
      perguntaId: this.perguntaId!,
      respostaId: resposta.id,
      selecionado: resposta.selecionado
    });
  }

  get classeDirecao() {
    return this.perguntaAtual?.direcao === 'H' ? 'horizontal' : 'vertical';
  }
}
