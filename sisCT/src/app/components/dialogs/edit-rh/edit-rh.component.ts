import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursoHumano } from '../../../interfaces_crud/recursos-humanos.interface';
import { RecursosHumanosService } from '../../../services/recursos-humanos.service';
import { UtilService } from '../../../services/util.service';



@Component({
  selector: 'app-edit-rh',
  templateUrl: './edit-rh.component.html',
  styleUrl: './edit-rh.component.scss'
})
export class EditRHComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  loading = false;
  rh: RecursoHumano = {} as RecursoHumano;

  vinculos = [
    { label: 'CLT', value: 0 },
    { label: 'PJ', value: 1 },
    { label: 'Estagiário', value: 2 },
    { label: 'Temporário', value: 3 }
  ];

  formacoes = [
    { label: 'Ensino Fundamental', value: 0 },
    { label: 'Ensino Médio', value: 1 },
    { label: 'Técnico', value: 2 },
    { label: 'Superior Incompleto', value: 3 },
    { label: 'Superior Completo', value: 4 },
    { label: 'Pós-graduação', value: 5 },
    { label: 'Mestrado', value: 6 },
    { label: 'Doutorado', value: 7 }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    private rhService: RecursosHumanosService, // Assuming you have a service for RecursoHumano 
    private dialogRef: MatDialogRef<EditRHComponent> = inject(MatDialogRef)

  ) { }

  ngOnInit(): void {
    this.initForm();

    const id = this.rhService.idAtual;
    if (id != -1) {
      this.isEditMode = true;
      this.rhService.obterPorId(id).subscribe(
        (recurso: RecursoHumano | undefined) => {
          this.rh = recurso as RecursoHumano;
          // this.form.patchValue({
          //   dsNome: recurso!.dsNome,
          //   nuCpf: recurso!.nuCpf,
          //   dtNascimento: recurso!.dtNascimento,
          //   dsTelefone: recurso!.dsTelefone,
          //   dsEmail: recurso!.dsEmail,    
          //   dsCargo: recurso!.dsCargo,
          //   tpFormacaoAcademica: recurso!.tpFormacaoAcademica,
          //   nuCargaHoraria: recurso!.nuCargaHoraria,
          //   tpVinculo: recurso!.tpVinculo
          // });
        },
        (error) => {
          console.error('Erro ao carregar recurso humano:', error);
          this.utilService.showError('Erro ao carregar recurso humano. Tente novamente mais tarde.');
        }
      );
    } else {
      this.rhService.sairModoEdicao();
      this.rh = {} as RecursoHumano;
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      dsNome: ['', Validators.required],
      nuCpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      dtNascimento: ['', Validators.required],
      dsTelefone: [''],
      dsEmail: ['', [Validators.required, Validators.email]],
      dsCargo: [''],
      tpFormacaoAcademica: [''],
      nuCargaHoraria: [''],
      tpVinculo: ['']
    });
  }

  loadRecursoHumano(id: Number): void {

    // Replace with actual API call
    const mockData = {
      dsNome: '',
      nuCpf: '',
      dtNascimento: '',
      dsTelefone: '',
      dsEmail: '',
      dsCargo: '',
      tpFormacaoAcademica: '',
      nuCargaHoraria: '',
      tpVinculo: ''
    };

    this.form.patchValue(mockData);



  }

  onSubmit(): void {
    const formValue = this.form.value;
    if (this.isEditMode) {

    } else {
      this.rhService.criar(this.rh);
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onFieldChange(): void {
    // if (this.form.dirty) {
    this.utilService.showSnackbar('Você tem alterações não salvas. Deseja continuar?');
    //  }
  }

}
