import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { PacienteService } from 'src/app/service/pre-cadastro/paciente/paciente.service';
import { GenericComponent } from 'src/app/shared/generic.component';
import { ModalTelefoneComponent } from 'src/app/shared/modal/modal-telefone/modal-telefone.component';
import { Paciente } from 'src/models/pre-cadastro/paciente.model';
import { Telefone } from 'src/models/pre-cadastro/telefone.model';

@Component({
  selector: 'app-dados-telefone',
  templateUrl: './dados-telefone.component.html',
  styleUrls: ['./dados-telefone.component.scss']
})
export class DadosTelefoneComponent extends GenericComponent implements OnInit {

  telefones: Telefone[] = [];
  private paciente: Paciente;
  form: FormGroup;
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
    if (!!this.paciente.telefones && this.paciente.telefones.length > 0) {
      this.paciente.telefones.map(telefone => this.telefones.push(telefone));
    } else {
      this.telefones.push(new Telefone());
    }
    this.loadTelefones(this.telefones);
  }

  loadTelefones(telefones: Telefone[]) {
    if (telefones.length === 1) {
      this.buildForm();
    } else {
      this.buildForm();

      telefones.forEach((telefone, indice) => {
        if (indice === 0) {
          return false;
        }
        this.form.addControl(`numDdd-${indice}`, new FormControl(telefone.numDdd, Validators.required))
        this.form.addControl(`numTelefone-${indice}`, new FormControl(telefone.numTelefone, Validators.required))
        this.form.addControl(`tipoTelefone-${indice}`, new FormControl(telefone.tipoTelefone, Validators.required))
      })
    }
  }

  private buildForm() {
    this.form = this._formBuilder.group({
      numDdd: [this.telefones[0].numDdd, Validators.required],
      numTelefone: [this.telefones[0].numTelefone, Validators.required],
      tipoTelefone: [this.telefones[0].tipoTelefone, Validators.required]
    });
  }

  nextPage() {
    this.telefones = this.converterToModel(this.form, this.telefones);
    localStorage.setItem("selectedIndex", (this.stepper.selectedIndex + 1).toString());

    if (this.paciente.pacienteId) {
      this.paciente.telefones = this.telefones;
      this.pacienteService.updateTelefone(this.telefones, this.paciente).subscribe(result => {
        localStorage.setItem("paciente", JSON.stringify(this.paciente));
        this.goForward(this.stepper);
      });
    } else{
      this.pacienteService.saveTelefone(this.telefones, this.paciente).subscribe(
        result => {
          if (result) {
            this.goForward(this.stepper);
          }
        }
      );
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
      indice: this.telefones.length
    }

    this.form.addControl(`numDdd-${config.data.indice}`, new FormControl(null, Validators.required))
    this.form.addControl(`numTelefone-${config.data.indice}`, new FormControl(null, Validators.required))
    this.form.addControl(`tipoTelefone-${config.data.indice}`, new FormControl(null, Validators.required))
    
    const dialogRef = this.dialog.open(ModalTelefoneComponent, config);

    dialogRef.afterClosed().subscribe((result: Telefone) => {
      if (!result.numDdd) {
        this._snackBar.open("Preencha os dados corretamente", "Alerta");
      } else {
        this.telefones.push(result)
      }
    });
  }

}
