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

  constructor() { }

  ngOnInit(): void {
  }
  showError(field: string) {
    return this.form.get(field).invalid && !this.form.get(field).untouched;
  }

}
