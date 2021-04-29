import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/models/paciente.model';
import {PacienteService} from 'src/app/service/paciente/paciente.service'

@Component({
  selector: 'app-dados-confirmacao',
  templateUrl: './dados-confirmacao.component.html',
  styleUrls: ['./dados-confirmacao.component.scss']

})
export class DadosConfirmacaoComponent implements OnInit {

  private paciente:Paciente;



  constructor( private pacienteService:PacienteService) { }

  ngOnInit(): void {
   this.paciente = this.pacienteService.getPacienteFromLocalStore();
  }

}
