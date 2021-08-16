import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutorizationService } from 'src/app/service/pre-cadastro/autorization/autorization.service';
import { PacienteService } from 'src/app/service/pre-cadastro/paciente/paciente.service';
import { GenericComponent } from 'src/app/shared/generic.component';
import { Paciente } from 'src/models/pre-cadastro/paciente.model';
import { TokenRequest } from 'src/models/pre-cadastro/TokenRequest.model';
import { ValidarTokenRequest } from 'src/models/pre-cadastro/ValidarTokenRequest.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-autorization',
  templateUrl: './autorization.component.html',
  styleUrls: ['./autorization.component.scss']
})
export class AutorizationComponent extends GenericComponent implements OnInit {

  public emailHash;
  public paciente: Paciente;
  public selectedOption: boolean;
  private tokenRequest: TokenRequest;
  private validarTokenRequest: ValidarTokenRequest;
  private isDev = !environment.production

  constructor(
    private autorizationService: AutorizationService,
    private pacienteService: PacienteService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) { 
    super()
  }

  ngOnInit(): void {
    this.emailHash = localStorage.getItem("verifyEmailToken");
    this.paciente = this.pacienteService.getPacienteFromLocalStore();
    this.tokenRequest = new TokenRequest();
    this.tokenRequest.cpf = this.paciente.cpf;
    this.tokenRequest.email = this.emailHash;

    this.validarTokenRequest = new ValidarTokenRequest();
    this.validarTokenRequest.email = this.emailHash

    this.form = this._formBuilder.group({
      token: [null, Validators.required],
    });
  }

  createToken(key) {
    if (!this.selectedOption) {
      this.autorizationService.createToken(this.tokenRequest).subscribe(result => {
        this.selectedOption = true;
      });
    }
  }

  validToken() {

    this.validarTokenRequest.token = this.form.get('token').value;

    if (this.isDev) {
      this.loadPaciente()
    } else {
      this.autorizationService.validToken(this.validarTokenRequest).subscribe(result => {
        this.loadPaciente()
      }, (errorResponse: HttpErrorResponse) => {
        if (errorResponse.error) {
          this.erros = {
            "token": errorResponse.error.detail
          }
        }
      });
    }
  }

  loadPaciente() {
    this.pacienteService.getPacienteFromCpf(this.tokenRequest.cpf).subscribe(result => {
      this.paciente = result;

      if (result) {
        localStorage.setItem("paciente", JSON.stringify(this.paciente));
      }

      this.router.navigate(['/step']);
    });
  }

}
