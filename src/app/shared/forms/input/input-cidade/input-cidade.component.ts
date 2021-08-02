import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericComponent } from 'src/app/shared/generic.component';

@Component({
  selector: 'input-cidade',
  templateUrl: './input-cidade.component.html',
  styleUrls: ['./input-cidade.component.scss']
})
export class InputCidadeComponent extends GenericComponent implements OnInit {

  @Input() cidade: string;
  @Input() form:FormGroup;
  @Input() indice: number;
  @Input() disabled: boolean;

  constructor() {
    super()
   }

  ngOnInit(): void {
  }

}
