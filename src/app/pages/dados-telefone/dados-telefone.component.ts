import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.paciente = this.pacienteService.getPacienteFromLocalStore();
    if (!!this.paciente.telefones && this.paciente.telefones.length > 0) {
      this.paciente.telefones.map(telefone => this.telefones.push(telefone));
    } else {
      this.telefones.push(new Telefone());
    }
  }

  nextPage() {
    console.log(this.telefones);

    if (this.paciente.pacienteId) {
      this.paciente.telefones = this.telefones;
      localStorage.setItem("paciente", JSON.stringify(this.paciente));
      this.router.navigate(['/passo4']);
    } else{
      this.pacienteService.saveTelefone(this.telefones, this.paciente).subscribe(
        result => {
          if (result) {
            this.router.navigate(['/passo4']);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this._snackBar.open(errorResponse.error.message, "Error");
        }
      );
    }
  }

  openDialog() {
    let config = new MatDialogConfig()
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

}
