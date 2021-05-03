import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PacienteService } from 'src/app/service/paciente/paciente.service';
import { ModalEnderecoComponent } from 'src/app/shared/modal/modal-endereco/modal-endereco.component';
import { Endereco } from 'src/models/endereco.model';
import { Paciente } from 'src/models/paciente.model';
@Component({
  selector: 'app-dados-endereco',
  templateUrl: './dados-endereco.component.html',
  styleUrls: ['./dados-endereco.component.scss'],
})
export class DadosEnderecoComponent implements OnInit {

  enderecos: Endereco[] = [];
  private paciente: Paciente;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.enderecos.push(new Endereco());
    this.paciente = this.pacienteService.getPacienteFromLocalStore();
  }

  nextPage() {

    console.log(this.enderecos);

    let valid = this.enderecos.every(endereco => {
      return !!endereco.cep
    });

    if (!valid) {
      this._snackBar.open("Preencha todos os endereços corretamente", "Alerta");
      return false;
    }

    this.pacienteService.saveEndereco(this.enderecos, this.paciente).subscribe(
      result => { 
        if (result) {
          this.router.navigate(['/passo3']);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this._snackBar.open(errorResponse.error.message, "Error");
      }
    );
  }

  openDialog() {
    let config = new MatDialogConfig()
    const dialogRef = this.dialog.open(ModalEnderecoComponent, config);

    dialogRef.afterClosed().subscribe((result: Endereco) => {
      if (!result.cep) {
        this._snackBar.open("Preencha os dados corretamente", "Alerta");
      } else {
        this.enderecos.push(result)
      }
    });
  }

}
