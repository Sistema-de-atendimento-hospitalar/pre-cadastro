import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { PacienteService } from 'src/app/service/paciente/paciente.service';
import { ModalTelefoneComponent } from 'src/app/shared/modal/modal-telefone/modal-telefone.component';
import { Paciente } from 'src/models/paciente.model';
import { Telefone } from 'src/models/telefone.model';

@Component({
  selector: 'app-dados-telefone',
  templateUrl: './dados-telefone.component.html',
  styleUrls: ['./dados-telefone.component.scss']
})
export class DadosTelefoneComponent implements OnInit {

  telefones: Telefone[] = [];
  private paciente: Paciente;
  form: FormGroup;
  @Input() stepper: MatStepper;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private pacienteService: PacienteService,
    private _formBuilder: FormBuilder) { }

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
    if (telefones.length == 1) {
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
    let valid = this.telefones.every(telefone => {
      return !!telefone.numTelefone
    });

    if (!valid) {
      this._snackBar.open("Preencha todos os telefones corretamente", "Alerta");
      return false;
    }

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

  openDialog(form: FormGroup) {
    let config = new MatDialogConfig()
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
        console.log(result)
        this.telefones.push(result)
      }
    });
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

}
