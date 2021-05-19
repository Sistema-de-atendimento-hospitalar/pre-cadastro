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
    if (indice === 0) {
      return field;
    }
    return `${field}-${indice}`;
  }

  showError(field: string, indice) {
    if (indice != null) {
      field = this.converteToControlName(field, indice)
    }
    return this.form.get(field).invalid && !this.form.get(field).untouched;
  }

}
