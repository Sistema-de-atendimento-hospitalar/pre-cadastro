import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/models/paciente.model';
import { PacienteService } from 'src/app/service/paciente/paciente.service'
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dados-confirmacao',
  templateUrl: './dados-confirmacao.component.html',
  styleUrls: ['./dados-confirmacao.component.scss']

})
export class DadosConfirmacaoComponent implements OnInit {

  private paciente: Paciente;
  form: FormGroup;

  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.paciente = this.pacienteService.getPacienteFromLocalStore();
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
