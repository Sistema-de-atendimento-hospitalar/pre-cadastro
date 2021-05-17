import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-cidade',
  templateUrl: './input-cidade.component.html',
  styleUrls: ['./input-cidade.component.scss']
})
export class InputCidadeComponent implements OnInit {

  @Input() cidade: string;
  @Input() form:FormGroup;
  @Input() indice: number;

  constructor() { }

  ngOnInit(): void {
  }

  converteToControlName(field, indice) {
    return `${field}-${indice}`;
  }

  showError(field: string) {
    return this.form.get(field).invalid && !this.form.get(field).untouched;
  }

}
