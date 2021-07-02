import { Component, Input, OnInit } from '@angular/core';
import { Paciente } from 'src/models/pre-cadastro/paciente.model';
import { PacienteService } from 'src/app/service/pre-cadastro/paciente/paciente.service'
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-dados-confirmacao',
  templateUrl: './dados-confirmacao.component.html',
  styleUrls: ['./dados-confirmacao.component.scss']
})
export class DadosConfirmacaoComponent implements OnInit {

  public paciente: Paciente;
  @Input() stepper: MatStepper;

  constructor(
    private pacienteService: PacienteService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.paciente = this.pacienteService.getPacienteFromLocalStore();
  }

  selectedStep(index: number) {
    this.stepper.selectedIndex = index
  }
}
