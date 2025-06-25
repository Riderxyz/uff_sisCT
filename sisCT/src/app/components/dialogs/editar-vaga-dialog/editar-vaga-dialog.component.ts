import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MapaDeVagasService } from '../../../services/mapa-de-vagas.service';
import { UtilService } from '../../../services/util.service';
@Component({
  selector: 'app-editar-vaga-dialog',
  templateUrl: './editar-vaga-dialog.component.html',
  styleUrl: './editar-vaga-dialog.component.scss'
})
export class AdicionarVagaDialogComponent {

  mapa: any;

  private dialogRef: MatDialogRef<AdicionarVagaDialogComponent> = inject(MatDialogRef)
  constructor(public vagasService: MapaDeVagasService, public utilSrv: UtilService) {

  }
  ngOnInit(): void {
    // Inscreve-se no observable para obter os dados
    this.vagasService.vagas$.subscribe(vagas => {
      // Encontra a vaga com o ID atual
      this.mapa = vagas.find(v => v.pkMapaDeVagas === this.vagasService.idVagaAtual) || null;
    });
  }

  getDiasAcolhimento() {
    return this.mapa.dtSaida && this.mapa.dtIngresso ? Math.ceil((new Date(this.mapa.dtSaida).getTime() - new Date(this.mapa.dtIngresso).getTime()) / (1000 * 3600 * 24)) : 0;
  }

  onSubmit(form: NgForm) {
    this.dialogRef.close(this.mapa);
    try {
      this.mapa.stDisponibilidade = Number(this.mapa.stDisponibilidade);
    } catch (error) {
      this.mapa.stDisponibilidade = -1;
    }


    this.vagasService.atualizarVaga(this.mapa.pkMapaDeVagas, this.mapa)
      .then((success) => {
        if (success) {
          console.log('Vaga atualizada com sucesso');
          // Adicione qualquer ação adicional após sucesso aqui
        } else {
          console.error('Falha na atualização: Vaga não encontrada');
          // Tratamento específico para quando a vaga não existe
          this.utilSrv.showError('Vaga não encontrada. Atualização não realizada.');
        }
      })
      .catch((error) => {
        console.error('Erro na atualização:', error);
        // Tratamento genérico de erros
        this.utilSrv.showError(`Erro ao atualizar vaga: ${error.message || 'Erro desconhecido'}`);
      });
  }

  // Método auxiliar para exibir erros (usando MatSnackBar como exemplo)


  onCancel() {
    this.dialogRef.close(null);
  }

}


