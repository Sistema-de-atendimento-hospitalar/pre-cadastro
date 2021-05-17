import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DadosEnderecoComponent } from 'src/app/pages/dados-endereco/dados-endereco.component';
import { Endereco } from 'src/models/endereco.model';
@Component({
  selector: 'app-modal-endereco',
  templateUrl: './modal-endereco.component.html',
  styleUrls: ['./modal-endereco.component.scss']
})
export class ModalEnderecoComponent implements OnInit {
  endereco: Endereco;

  constructor(public dialogRef: MatDialogRef<DadosEnderecoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Endereco) { }

  ngOnInit(): void {
    this.endereco = new Endereco();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
