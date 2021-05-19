import { Component, Inject, OnInit } from '@angular/core';
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
  indice: number;
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<DadosEnderecoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.endereco = new Endereco();
    this.indice = this.data.indice;
    this.form = this.data.form;
  }

  save(): void {
    this.endereco.cep = this.form.get(this.converteToControlName('cep', this.indice)).value;
    this.endereco.estado = this.form.get(this.converteToControlName('estado', this.indice)).value
    this.endereco.cidade = this.form.get(this.converteToControlName('cidade', this.indice)).value
    this.endereco.logradouro = this.form.get(this.converteToControlName('logradouro', this.indice)).value
    this.endereco.bairro = this.form.get(this.converteToControlName('bairro', this.indice)).value
    this.endereco.numImovel = this.form.get(this.converteToControlName('numero', this.indice)).value
    this.endereco.dsComplemento = this.form.get(this.converteToControlName('complemento', this.indice)).value

    this.dialogRef.close(this.endereco);
  }

  converteToControlName(field, indice) {
    if (indice === 0) {
      return field;
    }
    return `${field}-${indice}`;
  }

}
