// src/app/pages/sis-ct-cadastro/components/section1/area-de-atuacao/area-de-atuacao.component.ts

import { Component, OnInit } from '@angular/core';
import { CadastroNacionalService } from '../../../../../services/cadastro-nacional.service';
import { StatusService } from '../../../../../services/status.service';

interface AreaDeAtuacaoOption {
  value: number;
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
    { value: 1, label: 'Comunidade Terapêutica' },
    { value: 2, label: 'Entidade de Cuidado' },
    { value: 3, label: 'Outra Área de Atuação' }
  ];

  // Selected option
  selectedOption: AreaDeAtuacaoOption | null = null;
  selectedOptionValue = 2;

  // Current section name
  sectionName = 'area_atuacao';

  constructor(public cadastroService: CadastroNacionalService, private statusService: StatusService) {
    //debugger
  }

  ngOnInit(): void {
    // Get current value from service if available
    const currentCadastro = this.cadastroService.getCurrentCadastro();
    this.selectedOption = this.opcoes[this.cadastroService.cadastroSubject.getValue().ST_AREA_ATUACAO!];
    if (currentCadastro && currentCadastro.ST_AREA_ATUACAO) {
      this.selectedOption = this.opcoes.find(opt => opt.value === currentCadastro.ST_AREA_ATUACAO) || null;
    }
    // Subscribe to changes in the cadastro
    this.cadastroService.cadastro$.subscribe(cadastro => {
      if (cadastro && cadastro.ST_AREA_ATUACAO) {
        this.selectedOption = this.opcoes.find(opt => opt.value === cadastro.ST_AREA_ATUACAO) || null;
      }
    });
    this.statusService.update({
      secao: 1,
      campo: 'ST_AREA_ATUACAO',
      situacao: this.selectedOption ? true : false,
      nome: 'Informe a Área de Atuação',
      descricao: ''
    })
  }

  onSelectChange(): void {
    if (this.selectedOption) {
      // Update the cadastro nacional with the selected area de atuacao

      console.log(this.selectedOption.value, 'selected option value', this.selectedOptionValue);
      this.cadastroService.updateCadastro({
        ST_AREA_ATUACAO: this.selectedOptionValue - 1
      });
    }
    this.statusService.update({
      secao: 1,
      campo: 'ST_AREA_ATUACAO',
      situacao: this.selectedOption ? true : false,
      nome: 'Informe a Área de Atuação',
      descricao: ''
    })
  }
}
