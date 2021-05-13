import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from 'src/models/paciente.model';
import { PacienteService } from 'src/app/service/paciente/paciente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent implements OnInit {

  private paciente: Paciente;
  private dominio: string = null;
  private disableDominio: boolean = false;
  public hasError: boolean = false;
  private temDeficiencia: boolean = false;
  private dominios: string[] = ['gmail.com', 'hotmail.com', 'outlook.com'];

  form: FormGroup;

  constructor(
    private router: Router,
    private pacienteService: PacienteService,
    private _snackBar: MatSnackBar,
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
      deficiencia: [this.paciente.deficiencia, Validators.nullValidator]
    });
  }

  nextPage() {

    console.log(this.form)

    this.hasError = !this.validarCampos(this.paciente);
    let emailPaciente = this.paciente.email;
    if (!emailPaciente.includes("@")) {
      this.paciente.email = `${this.paciente.email}${this.dominio}`;
    }

    if (this.paciente.pacienteId) {
      this.pacienteService.updatePaciente(this.paciente).subscribe(result => {
        localStorage.setItem("paciente", JSON.stringify(this.paciente));
        this.router.navigate(['/passo2']);
      });
    } else {
      this.pacienteService.savePaciente(this.paciente).subscribe(result => {
        this.paciente = result;
        localStorage.setItem("paciente", JSON.stringify(this.paciente));
        if (result) {
          this.router.navigate(['/passo2']);
        }
      }, (errorResponse: HttpErrorResponse) => {
        this._snackBar.open(errorResponse.error.message, "Error");
        console.log(errorResponse);
      });
    }
  }

  concatDominio(dominio: string) {
    if (!this.paciente.email.includes("@")) {
      this.paciente.email = `${this.paciente.email}@${dominio}`
    }
  }

  validateEmail() {
    let emailPaciente = this.paciente.email;
    if (emailPaciente.includes("@")) {
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

}

