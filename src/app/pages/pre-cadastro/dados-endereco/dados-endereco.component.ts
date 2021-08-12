import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { PacienteService } from 'src/app/service/pre-cadastro/paciente/paciente.service';
import { GenericComponent } from 'src/app/shared/generic.component';
import { ModalEnderecoComponent } from 'src/app/shared/modal/modal-endereco/modal-endereco.component';
import { Endereco } from 'src/models/pre-cadastro/endereco.model';
import { Paciente } from 'src/models/pre-cadastro/paciente.model';
@Component({
  selector: 'app-dados-endereco',
  templateUrl: './dados-endereco.component.html',
  styleUrls: ['./dados-endereco.component.scss'],
})
export class DadosEnderecoComponent extends GenericComponent implements OnInit {

  enderecos: Endereco[] = [];
  private paciente: Paciente;
  @Input() stepper: MatStepper;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private pacienteService: PacienteService,
    private _formBuilder: FormBuilder) { 
      super()
    }

  ngOnInit(): void {
    this.paciente = this.pacienteService.getPacienteFromLocalStore();
    if (!!this.paciente.enderecos && this.paciente.enderecos.length > 0) {
      this.paciente.enderecos.map(endereco => this.enderecos.push(endereco));
    } else {
      this.enderecos.push(new Endereco());
    }

    this.loadEnderecos(this.enderecos);

  }

  loadEnderecos(enderecos: Endereco[]) {
    if (enderecos.length === 1) {
      this.buildForm();
    } else {
      this.buildForm();

      enderecos.forEach((endereco, indice) => {
        if (indice === 0) {
          return false;
        }
        this.form.addControl(`cep-${indice}`, new FormControl(endereco.cep, Validators.required))
        this.form.addControl(`estado-${indice}`, new FormControl(endereco.estado, Validators.required))
        this.form.addControl(`cidade-${indice}`, new FormControl(endereco.cidade, Validators.required))
        this.form.addControl(`logradouro-${indice}`, new FormControl(endereco.logradouro, Validators.required))
        this.form.addControl(`bairro-${indice}`, new FormControl(endereco.bairro, Validators.required))
        this.form.addControl(`numImovel-${indice}`, new FormControl(endereco.numImovel, Validators.required))
        this.form.addControl(`dsComplemento-${indice}`, new FormControl(endereco.dsComplemento, Validators.nullValidator))
      })
    }
  }

  private buildForm() {
    this.form = this._formBuilder.group({
      cep: [this.enderecos[0].cep, Validators.required],
      estado: [this.enderecos[0].estado, Validators.required],
      cidade: [this.enderecos[0].cidade, Validators.required],
      logradouro: [this.enderecos[0].logradouro, Validators.required],
      bairro: [this.enderecos[0].bairro, Validators.required],
      numImovel: [this.enderecos[0].numImovel, Validators.required],
      dsComplemento: [this.enderecos[0].dsComplemento, Validators.nullValidator]
    });
  }

  nextPage() {
    this.enderecos = this.converterToModel(this.form, this.enderecos);
    localStorage.setItem("selectedIndex", (this.stepper.selectedIndex + 1).toString());

    if (this.form.touched) {
      if (this.paciente.pacienteId) {
        this.paciente.enderecos = this.enderecos;
        this.pacienteService.updateEndereco(this.enderecos, this.paciente).subscribe(result => {
          localStorage.setItem("paciente", JSON.stringify(this.paciente));
          this.goForward(this.stepper);
        });
      } else {
        this.pacienteService.saveEndereco(this.enderecos, this.paciente).subscribe(
          result => {
            if (result) {
              localStorage.setItem("paciente", JSON.stringify(this.paciente));
              this.goForward(this.stepper);
            }
          }
        );
      }
    } else {
      this.goForward(this.stepper);
    }
  }

  converterToModel(form: FormGroup, model) {
    let namesForm = Object.keys(form.controls);
    let namesModel = [];

    if (model instanceof Array) {
      namesModel = model.map(m => { return Object.keys(m) })
    } else {
      namesModel = Object.keys(model);
    }

    namesModel.forEach((nameModel, index) => {
      if (nameModel instanceof Array) {
        nameModel.forEach(input => {
          namesForm.forEach(nameForm => {
            if (input === nameForm) {
              model[index][input] = form.get(this.converteToControlName(input, index)).value
            }
          });
        });
      } else {
        namesForm.forEach(nameForm => {
          if (nameForm === nameModel) {
            model[nameForm] = form.get(nameForm).value
          }
        });
      }
    });
  
    return model;
  }

  openDialog(form: FormGroup) {

    const config = new MatDialogConfig()
    config.data = {
      form: form,
      indice: this.enderecos.length
    }

    this.form.addControl(`cep-${config.data.indice}`, new FormControl(null, Validators.required))
    this.form.addControl(`estado-${config.data.indice}`, new FormControl(null, Validators.required))
    this.form.addControl(`cidade-${config.data.indice}`, new FormControl(null, Validators.required))
    this.form.addControl(`logradouro-${config.data.indice}`, new FormControl(null, Validators.required))
    this.form.addControl(`bairro-${config.data.indice}`, new FormControl(null, Validators.required))
    this.form.addControl(`numImovel-${config.data.indice}`, new FormControl(null, Validators.required))
    this.form.addControl(`dsComplemento-${config.data.indice}`, new FormControl(null, Validators.nullValidator))

    const dialogRef = this.dialog.open(ModalEnderecoComponent, config);

    dialogRef.afterClosed().subscribe((result: Endereco) => {
      if (result) {
        if (!result.cep) {
          this._snackBar.open("Preencha os dados corretamente", "Alerta");
        } else {
          this.enderecos.push(result)
        }
      }
    });
  }

}
