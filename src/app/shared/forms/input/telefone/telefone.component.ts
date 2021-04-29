import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'form-telefone',
  templateUrl: './telefone.component.html',
  styleUrls: ['./telefone.component.scss']
})
export class TelefoneComponent implements OnInit {

  telefones = [1];

  constructor() { }

  ngOnInit(): void {

  }

  addTelefone() {
    this.telefones.push(1);
  }

}
