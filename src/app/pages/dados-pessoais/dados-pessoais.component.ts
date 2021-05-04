import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from 'src/models/paciente.model';
import { PacienteService } from 'src/app/service/paciente/paciente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
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
  private dominios:string[] = ['gmail.com', 'hotmail.com', 'outlook.com'];

  constructor(private router: Router, private pacienteService: PacienteService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.paciente = this.pacienteService.getPacienteFromLocalStore();
  }

  nextPage() {
    this.hasError = !this.validarCampos(this.paciente);
    let emailPaciente = this.paciente.email;
    if (!emailPaciente.includes("@")) {
      this.paciente.email = `${this.paciente.email}${this.dominio}`;
    }

    if (this.paciente.pacienteId) {
      localStorage.setItem("paciente", JSON.stringify(this.paciente));
      this.router.navigate(['/passo2']);
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

  concatDominio(dominio:string){
    if(!this.paciente.email.includes("@")){
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

