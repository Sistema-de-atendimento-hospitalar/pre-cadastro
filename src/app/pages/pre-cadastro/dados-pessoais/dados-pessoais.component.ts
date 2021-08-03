import { Component, Input, OnInit } from '@angular/core';
import { Paciente } from 'src/models/pre-cadastro/paciente.model';
import { PacienteService } from 'src/app/service/pre-cadastro/paciente/paciente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { HttpErrorResponse } from '@angular/common/http';
import { GenericComponent } from 'src/app/shared/generic.component';
@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent extends GenericComponent implements OnInit {

  private paciente: Paciente;
  private dominio: string = null;
  private temDeficiencia: boolean = false;
  public dominios: string[] = ['gmail.com', 'hotmail.com', 'outlook.com'];
  public estado = null;

  @Input() stepper: MatStepper;
  totalStepsCount: number;

  constructor(
    private pacienteService: PacienteService,
    private _formBuilder: FormBuilder
  ) {
    super()
  }

  ngOnInit(): void {
    this.paciente = this.pacienteService.getPacienteFromLocalStore();
    this.temDeficiencia = !!this.paciente.deficiencia

    this.form = this._formBuilder.group({
      nome: [this.paciente.nome, Validators.required],
      dtNascimento: [this.paciente.dtNascimento, Validators.compose([
        Validators.required, Validators.pattern(/^([1-2]{1})([0-9]{3})\-([0-9]{2})\-([0-9]{2})/)
      ])],
      email: [this.paciente.email, Validators.compose([
        Validators.required, Validators.email
      ])],
      sexo: [this.paciente.sexo, Validators.required],
      rg: [this.paciente.rg, Validators.required],
      orgExpedidorRg: [this.paciente.orgExpedidorRg, Validators.required],
      estadoExpedidor: [this.paciente.estadoExpedidor, Validators.required],
      dtEmissaoRg: [this.paciente.dtEmissaoRg, Validators.required],
      temDeficiencia: [!!this.paciente.deficiencia, Validators.nullValidator],
      deficiencia: [this.paciente.deficiencia, Validators.nullValidator]
    });

    this.estado = { value: this.paciente.estadoExpedidor };
  }

  converterToModel(form: FormGroup, model: Paciente) {
    let namesForm = Object.keys(form.controls);
    let namesPaciente = Object.keys(model);

    namesPaciente.forEach(nameModel => {
      namesForm.forEach(nameForm => {
        if (nameForm === nameModel) {
          model[nameForm] = form.get(nameForm).value
        }
      });
    });

    return model;
  }

  nextPage() {
    this.paciente = this.converterToModel(this.form, this.paciente);
    localStorage.setItem("selectedIndex", (this.stepper.selectedIndex + 1).toString());
    this.erros = null;
    localStorage.setItem("paciente", JSON.stringify(this.paciente));

    if (this.paciente.pacienteId) {
      this.pacienteService.updatePaciente(this.paciente).subscribe(result => {
        this.goForward(this.stepper);
      }, (errorResponse: HttpErrorResponse) => {
        this.catchError(errorResponse);
      });
    } else {
      this.pacienteService.savePaciente(this.paciente).subscribe(result => {
        this.goForward(this.stepper);
      }, (errorResponse: HttpErrorResponse) => {
        this.catchError(errorResponse);
      });
    }
  }

  concatDominio(dominio: string) {
    if (!this.form.get('email').value.includes("@")) {
      this.form.get('email').setValue(`${this.form.get('email').value}@${dominio}`)
    }
  }

}

