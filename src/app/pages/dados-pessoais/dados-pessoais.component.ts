import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from 'src/models/paciente.model';
import { PacienteService } from 'src/app/service/paciente/paciente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent implements OnInit, AfterViewInit {

  private paciente: Paciente;
  private dominio: string = null;
  private disableDominio: boolean = false;
  public hasError: boolean = false;
  private temDeficiencia: boolean = false;
  private dominios: string[] = ['gmail.com', 'hotmail.com', 'outlook.com'];

  form: FormGroup;

  @Input() stepper: MatStepper;
  totalStepsCount: number;

  constructor(
    private pacienteService: PacienteService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.paciente = this.pacienteService.getPacienteFromLocalStore();
    this.temDeficiencia = !!this.paciente.deficiencia

    this.form = this._formBuilder.group({
      nome: [this.paciente.nome, Validators.required],
      dtNascimento: [this.paciente.dtNascimento, Validators.required],
      email: [this.paciente.email, Validators.compose([
        Validators.required, Validators.email
      ])],
      sexo: [this.paciente.sexo, Validators.required],
      rg: [this.paciente.rg, Validators.required],
      orgaoExpedidor: [this.paciente.orgExpedidorRg, Validators.required],
      dtEmissao: [this.paciente.emissaoRg, Validators.required],
      temDeficiencia: [!!this.paciente.deficiencia, Validators.nullValidator],
      deficiencia: [this.paciente.deficiencia, Validators.nullValidator]
    });
  }

  nextPage() {
    this.hasError = !this.validarCampos(this.paciente);
    let emailPaciente = this.paciente.email;
    if (!emailPaciente.includes("@")) {
      this.paciente.email = `${this.paciente.email}${this.dominio}`;
    }

    if (this.paciente.pacienteId) {
      this.pacienteService.updatePaciente(this.paciente).subscribe(result => {
        localStorage.setItem("paciente", JSON.stringify(this.paciente));
        this.goForward(this.stepper);
      });
    } else {
      this.pacienteService.savePaciente(this.paciente).subscribe(result => {
        this.paciente = result;
        localStorage.setItem("paciente", JSON.stringify(this.paciente));
        if (result) {
          this.goForward(this.stepper);
        }
      });
    }
  }

  concatDominio(dominio: string) {
    if (!this.form.get('email').value.includes("@")) {
      this.form.get('email').setValue(`${this.form.get('email').value}@${dominio}`)
    }
  }

  showError(field: string) {
    return this.form.get(field).invalid && !this.form.get(field).untouched;
  }

  validateEmail() {
    if (this.form.get('email').value.includes("@")) {
      this.disableDominio = true;
    } else {
      this.disableDominio = false;
    }
  }

  validarCampos(paciente: Paciente): boolean {
    if (this.paciente.nome == null) {
      return false
    }
    return true;
  }

  ngAfterViewInit() {
    this.totalStepsCount = this.stepper._steps.length;
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

}

