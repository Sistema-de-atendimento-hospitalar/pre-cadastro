import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { DadosConfirmacaoComponent } from '../dados-confirmacao/dados-confirmacao.component';
import { DadosConvenioComponent } from '../dados-convenio/dados-convenio.component';
import { DadosEnderecoComponent } from '../dados-endereco/dados-endereco.component';
import { DadosPessoaisComponent } from '../dados-pessoais/dados-pessoais.component';
import { DadosTelefoneComponent } from '../dados-telefone/dados-telefone.component';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit, AfterViewInit {

  @ViewChild(DadosPessoaisComponent) dadosPessoaisComponent: DadosPessoaisComponent;
  @ViewChild(DadosEnderecoComponent) dadosEnderecoComponent: DadosEnderecoComponent;
  @ViewChild(DadosTelefoneComponent) dadosTelefoneComponent: DadosTelefoneComponent;
  @ViewChild(DadosConvenioComponent) dadosConvenioComponent: DadosConvenioComponent;
  @ViewChild(DadosConfirmacaoComponent) dadosConfirmacaoComponent: DadosConfirmacaoComponent;


   @ViewChild('stepper') private myStepper: MatStepper;
   totalStepsCount: number;

  constructor() { }

  ngOnInit() {
    
  }


  ngAfterViewInit() {
    this.totalStepsCount = this.myStepper._steps.length;
  }

  goForward(stepper: MatStepper) {
    console.log(stepper);
    stepper.next();
  }

  get formGroupOne() {
    return this.dadosPessoaisComponent ? this.dadosPessoaisComponent.form : null;
  }

  get formGroupTwo() {
    return this.dadosEnderecoComponent ? this.dadosEnderecoComponent.form : null;
  }

  get formGroupThree() {
    return this.dadosTelefoneComponent ? this.dadosTelefoneComponent.form : null;
  }

  get frmStepThree1() {
    return this.dadosConvenioComponent ? this.dadosConvenioComponent.form : null;
  }
}
