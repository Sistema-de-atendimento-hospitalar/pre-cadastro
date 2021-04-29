import { Component, Input, OnInit } from '@angular/core';

interface Estado {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'input-estado',
  templateUrl: './input-estado.component.html',
  styleUrls: ['./input-estado.component.scss']
})
export class InputEstadoComponent implements OnInit {

  estados: Estado[] = [
    { value: "AC", viewValue: "Acre" },
    { value: "AL", viewValue: "Alagoas" },
    { value: "AP", viewValue: "Amapá" },
    { value: "AM", viewValue: "Amazonas" },
    { value: "BA", viewValue: "Bahia" },
    { value: "CE", viewValue: "Ceará" },
    { value: "DF", viewValue: "Distrito Federal" },
    { value: "ES", viewValue: "Espírito Santo" },
    { value: "GO", viewValue: "Goiás" },
    { value: "MA", viewValue: "Maranhão" },
    { value: "MT", viewValue: "Mato Grosso" },
    { value: "MS", viewValue: "Mato Grosso do Sul" },
    { value: "MG", viewValue: "Minas Gerais" },
    { value: "PA", viewValue: "Pará" },
    { value: "PB", viewValue: "Paraíba" },
    { value: "PR", viewValue: "Paraná" },
    { value: "PE", viewValue: "Pernambuco" },
    { value: "PI", viewValue: "Piauí" },
    { value: "RJ", viewValue: "Rio de Janeiro" },
    { value: "RN", viewValue: "Rio Grande do Norte" },
    { value: "RS", viewValue: "Rio Grande do Sul" },
    { value: "RO", viewValue: "Rondônia" },
    { value: "RR", viewValue: "Roraima" },
    { value: "SC", viewValue: "Santa Catarina" },
    { value: "SP", viewValue: "São Paulo" },
    { value: "SE", viewValue: "Sergipe" },
    { value: "TO", viewValue: "Tocantins" }
  ]

  @Input() estado: string;

  constructor() { }

  ngOnInit(): void {
    console.log(`estado ${this.estado}`)
  }

}
