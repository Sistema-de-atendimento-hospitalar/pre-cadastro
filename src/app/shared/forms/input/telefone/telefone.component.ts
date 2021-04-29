import { Component, Input, OnInit } from '@angular/core';
import { TipoTelefoneService } from 'src/app/service/generico/tipo-telefone.service';
import { Telefone } from 'src/models/telefone.model';
import { TipoTelefone } from 'src/models/tipoTelefone.model';

@Component({
  selector: 'form-telefone',
  templateUrl: './telefone.component.html',
  styleUrls: ['./telefone.component.scss']
})
export class TelefoneComponent implements OnInit {

  @Input() telefone: Telefone;
  tiposTelefone: TipoTelefone[];

  constructor(private tipoTelefoneService: TipoTelefoneService) { }

  ngOnInit(): void {
    this.tipoTelefoneService.getTipoTelefone().subscribe(result => {
      this.tiposTelefone = result
    });
  }

}
