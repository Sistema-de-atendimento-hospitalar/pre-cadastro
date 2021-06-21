import { Component, Input, OnInit } from '@angular/core';
import { Paciente } from 'src/models/paciente.model';
import { PacienteService } from 'src/app/service/paciente/paciente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent implements OnInit {

  private paciente: Paciente;
  private dominio: string = null;
  private temDeficiencia: boolean = false;
  public dominios: string[] = ['gmail.com', 'hotmail.com', 'outlook.com'];

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
      orgExpedidorRg: [this.paciente.orgExpedidorRg, Validators.required],
      emissaoRg: [this.paciente.emissaoRg, Validators.required],
      temDeficiencia: [!!this.paciente.deficiencia, Validators.nullValidator],
      deficiencia: [this.paciente.deficiencia, Validators.nullValidator]
    });
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
  
    if (this.paciente.pacienteId) {
      this.pacienteService.updatePaciente(this.paciente).subscribe(result => {
        localStorage.setItem("paciente", JSON.stringify(result));
        this.goForward(this.stepper);
      });
    } else {
      this.pacienteService.savePaciente(this.paciente).subscribe(result => {
        localStorage.setItem("paciente", JSON.stringify(result));
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

  goForward(stepper: MatStepper) {
    stepper.next();
  }

}

