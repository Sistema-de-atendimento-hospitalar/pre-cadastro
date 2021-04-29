import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'input-cidade',
  templateUrl: './input-cidade.component.html',
  styleUrls: ['./input-cidade.component.scss']
})
export class InputCidadeComponent implements OnInit {

  @Input() cidade: string;

  constructor() { }

  ngOnInit(): void {
  }

}
