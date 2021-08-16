import { Component, Input, OnInit } from '@angular/core';
import { Paciente } from 'src/models/pre-cadastro/paciente.model';
import { PacienteService } from 'src/app/service/pre-cadastro/paciente/paciente.service'
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { GenericComponent } from 'src/app/shared/generic.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dados-confirmacao',
  templateUrl: './dados-confirmacao.component.html',
  styleUrls: ['./dados-confirmacao.component.scss']
})
export class DadosConfirmacaoComponent extends GenericComponent implements OnInit {

  public paciente: Paciente;
  @Input() stepper: MatStepper;

  constructor(
    private pacienteService: PacienteService,
    public dialog: MatDialog,
    private router: Router
  ) { 
    super()
  }

  ngOnInit(): void {
    localStorage.setItem("selectedIndex", (this.stepper.selectedIndex).toString());
    this.paciente = this.pacienteService.getPacienteFromLocalStore();
  }

  selectedStep(index: number) {
    this.stepper.selectedIndex = index
  }

  finalizarCadastro() {
    this.openGenericDialog("Sucesso", "Cadastro realizado com sucesso!", null,  () => this.router.navigate(['/home']));
  }
}
