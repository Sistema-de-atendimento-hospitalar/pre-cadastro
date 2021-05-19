import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  indice: number;
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<DadosTelefoneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.telefone = new Telefone();
    this.indice = this.data.indice;
    this.form = this.data.form;
  }

  save(): void {
    this.telefone.numDdd = this.form.get(this.converteToControlName('numDdd', this.indice)).value;
    this.telefone.numTelefone = this.form.get(this.converteToControlName('numTelefone', this.indice)).value;
    this.telefone.tipoTelefone = this.form.get(this.converteToControlName('tipoTelefone', this.indice)).value;

    this.dialogRef.close(this.telefone);
  }

  converteToControlName(field, indice) {
    if (indice === 0) {
      return field;
    }
    return `${field}-${indice}`;
  }

}
