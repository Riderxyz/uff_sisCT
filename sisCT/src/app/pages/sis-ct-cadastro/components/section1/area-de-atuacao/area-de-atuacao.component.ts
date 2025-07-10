import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CadastroNacionalService } from '../../../../../services/cadastro-nacional.service';
import { StatusService } from '../../../../../services/status.service';

interface AreaDeAtuacaoOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-area-de-atuacao',
  templateUrl: './area-de-atuacao.component.html',
  styleUrls: ['./area-de-atuacao.component.scss']
})
export class AreaDeAtuacaoComponent implements OnInit {
  // Options for the radio buttons
  opcoes: AreaDeAtuacaoOption[] = [
    { value: '1', label: 'Comunidade Terapêutica' },
    { value: '2', label: 'Entidade de Cuidado' },
    { value: '3', label: 'Outra Área de Atuação' }
  ];

  // Selected option
  selectedOption: AreaDeAtuacaoOption | null = null;
  selectedOptionValue = 2;

  // Current section name
  sectionName = 'area_atuacao';

  constructor(
    public cadastroService: CadastroNacionalService,
    private statusService: StatusService
  ) { }

  ngOnInit(): void {
    // Get current value from service
    const currentCadastro = this.cadastroService.getCurrentCadastro();
    const currentAreaAtuacao = currentCadastro?.stAreaAtuacao;

    if (currentAreaAtuacao) {
      this.selectedOption = this.opcoes.find(opt => opt.value === currentAreaAtuacao) || null;
    }

    // Subscribe to changes in the cadastro
    this.cadastroService.cadastro$.subscribe(cadastro => {
      if (cadastro?.stAreaAtuacao) {
        this.selectedOption = this.opcoes.find(opt => opt.value === cadastro.stAreaAtuacao) || null;
      }
    });

    this.updateStatusService();
  }

  onCheckboxChange(item: any, event: MatCheckboxChange) {
    if (event.checked) {
      this.cadastroService.areasAtuacoes.push(item.value);
      this.selectedOption = item;
      this.onSelectChange();
    } else {
      const index = this.cadastroService.areasAtuacoes.indexOf(item.value);
      if (index > -1) {
        this.cadastroService.areasAtuacoes.splice(index, 1);
      }
    }
  }

  onSelectChange(): void {
    if (this.selectedOption) {
      // Update the cadastro nacional with the selected area de atuacao
      this.cadastroService.updateCadastro({
        stAreaAtuacao: this.selectedOption.value
      });
    }
    this.updateStatusService();
  }

  private updateStatusService(): void {
    this.statusService.update({
      secao: 1,
      campo: 'stAreaAtuacao',
      situacao: !!this.selectedOption,
      nome: 'Informe a Área de Atuação',
      descricao: ''
    });
  }
}