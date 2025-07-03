// src/app/pages/sis-ct-cadastro/components/section1/area-de-atuacao/area-de-atuacao.component.ts

import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CadastroNacionalService } from '../../../../../services/cadastro-nacional.service';
import { StatusService } from '../../../../../services/status.service';

interface AreaDeAtuacaoOption {
  value: string;
  label: string;
  isSelected: boolean;
}

@Component({
  selector: 'app-area-de-atuacao',
  templateUrl: './area-de-atuacao.component.html',
  styleUrls: ['./area-de-atuacao.component.scss'],
})
export class AreaDeAtuacaoComponent implements OnInit {
  // Options for the radio buttons

  opcoes: AreaDeAtuacaoOption[] = [
    { value: '1', label: 'Comunidade Terapêutica', isSelected: false },
    { value: '2', label: 'Entidade de Cuidado', isSelected: false },
    { value: '3', label: 'Outra Área de Atuação', isSelected: false },
  ];

  // Selected option
  selectedOption: AreaDeAtuacaoOption | null = null;
  selectedOptionValue = 2;

  // Current section name
  sectionName = 'area_atuacao';

  constructor(
    public cadastroService: CadastroNacionalService,
    private statusService: StatusService
  ) {
    //debugger
  }

  ngOnInit(): void {
    // Get current value from service if available
    const currentCadastro = this.cadastroService.getCurrentCadastro();
    this.selectedOption =
      this.opcoes[
        this.cadastroService.cadastroSubject.getValue().ST_AREA_ATUACAO!
      ];
    if (currentCadastro && currentCadastro.ST_AREA_ATUACAO) {
      this.selectedOption =
        this.opcoes.find(
          (opt) => Number(opt.value) === currentCadastro.ST_AREA_ATUACAO
        ) || null;
    }
    // Subscribe to changes in the cadastro
    this.cadastroService.cadastro$.subscribe((cadastro) => {
      if (cadastro && cadastro.ST_AREA_ATUACAO) {
        this.selectedOption =
          this.opcoes.find(
            (opt) => Number(opt.value) == cadastro.ST_AREA_ATUACAO
          ) || null;
      }
    });
    this.statusService.update({
      secao: 1,
      campo: 'ST_AREA_ATUACAO',
      situacao: this.selectedOption ? true : false,
      nome: 'Informe a Área de Atuação',
      descricao: '',
    });
  }

  onCheckboxChange(item: any, event: MatCheckboxChange) {
    console.log(item, event);

    if (event.checked) {
      if (event.source.value === '3') {
        this.opcoes[0].isSelected = false;
        this.opcoes[1].isSelected = false;
        this.cadastroService.areasAtuacoes = [];
      }

      this.cadastroService.areasAtuacoes.push(item.value);
    } else {
      const index = this.cadastroService.areasAtuacoes.indexOf(item.value);
      if (index > -1) {
        this.cadastroService.areasAtuacoes.splice(index, 1);
      }
    }
  }
}
