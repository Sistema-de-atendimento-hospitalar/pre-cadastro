import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/models/paciente.model';
import { PacienteService } from 'src/app/service/paciente/paciente.service'
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalEnderecoComponent } from 'src/app/shared/modal/modal-endereco/modal-endereco.component';
import { DadosTelefoneComponent } from '../dados-telefone/dados-telefone.component';
import { DadosPessoaisComponent } from '../dados-pessoais/dados-pessoais.component'
import { ModalTelefoneComponent } from 'src/app/shared/modal/modal-telefone/modal-telefone.component';
import { DadosConvenioComponent } from '../dados-convenio/dados-convenio.component';
import { DadosEnderecoComponent } from '../dados-endereco/dados-endereco.component';

@Component({
  selector: 'app-dados-confirmacao',
  templateUrl: './dados-confirmacao.component.html',
  styleUrls: ['./dados-confirmacao.component.scss']

})
export class DadosConfirmacaoComponent implements OnInit {

  private paciente: Paciente;
  form: FormGroup;
  step = 0;
  // modais = [
  //   { "id": 0, "componente": DadosPessoaisComponent },
  //   { "id": 1, "componente": DadosTelefoneComponent }
  // ]

  constructor(private pacienteService: PacienteService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.paciente = this.pacienteService.getPacienteFromLocalStore();
  }

  showModal(step: number) {

    // let modal = this.modais.filter((modal => {
    //   return modal.id === step;
    // }));

    // if (modal.length === 1) {
    //   const dialogRef = this.dialog.open(modal[0].componente);
    // }

    let config = {
      height: '500px',
      width: '800px',
    }

    if (step === 0) {
      const dialogRef = this.dialog.open(DadosPessoaisComponent, config);
    } else if (step === 1) {
      const dialogRef = this.dialog.open(DadosEnderecoComponent, config);
    } else if (step === 2) {
      const dialogRef = this.dialog.open(DadosTelefoneComponent, config);
    } else if (step === 3) {
      const dialogRef = this.dialog.open(DadosConvenioComponent, config);
    }

  }

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
