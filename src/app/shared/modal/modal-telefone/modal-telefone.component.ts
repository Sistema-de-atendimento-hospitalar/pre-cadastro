import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DadosTelefoneComponent } from 'src/app/pages/dados-telefone/dados-telefone.component';
import { Telefone } from 'src/models/telefone.model';

@Component({
  selector: 'app-modal-telefone',
  templateUrl: './modal-telefone.component.html',
  styleUrls: ['./modal-telefone.component.scss']
})
export class ModalTelefoneComponent implements OnInit {

  telefone: Telefone;

  constructor(public dialogRef: MatDialogRef<DadosTelefoneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Telefone) { }

  ngOnInit(): void {
    this.telefone = new Telefone();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
