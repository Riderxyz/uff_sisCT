import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursoHumano } from '../../../interfaces_crud/recursos-humanos.interface';
import { UtilService } from '../../../services/util.service';
import { RecursosHumanosService } from '../../../services/recursos-humanos.service';



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

  ) { }

  ngOnInit(): void {
    this.initForm();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.loadRecursoHumano(id);
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
    if (this.form.invalid) {
      this.utilService.showError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const formValue = this.form.value;

    // const recursoHumano RecursoHumano = {

    // };

    if (this.isEditMode) {

    } else {

    }
  }

  onCancel(): void {
    this.router.navigate(['/recursos-humanos']);
  }


}
