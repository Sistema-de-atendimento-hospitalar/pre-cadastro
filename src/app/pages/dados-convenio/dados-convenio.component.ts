import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from 'src/app/service/paciente/paciente.service';
import { CartaoSaude } from 'src/models/CartaoSaude.model';
import { Paciente } from 'src/models/paciente.model';

@Component({
  selector: 'app-dados-convenio',
  templateUrl: './dados-convenio.component.html',
  styleUrls: ['./dados-convenio.component.scss']
})
export class DadosConvenioComponent implements OnInit {

  private paciente: Paciente;
  private cartaoSaude: CartaoSaude;
  private convenio: boolean = false;
  hasConvenio: boolean = false
  hasPagamentoParticular: boolean = false
  acessoViaCodigo: boolean = false

  respondeuConvenio: boolean = false
  respondeuPagamento: boolean = false
  respondeuModoAcesso: boolean = false

  constructor(private router: Router, private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.paciente = this.pacienteService.getPacienteFromLocalStore();
    this.cartaoSaude = new CartaoSaude();
  }

  nextPage() {

    this.pacienteService.saveCartaoSaude(this.cartaoSaude, this.paciente).subscribe(result => {
        this.router.navigate(['/confirmacao-dados']);
    }, error => {
      console.log(error);
    });
  }

  temConvenio(resp: boolean) {
    this.hasConvenio = resp;
    this.respondeuConvenio = true;
  }

  pagamentoParticular(resp: boolean) {
    this.hasPagamentoParticular = resp;
    this.respondeuPagamento = true;
  }

  acessarComCodigo() {
    this.acessoViaCodigo = true;
    this.respondeuModoAcesso = true;
  }

  cadastrarCartao() {
    this.respondeuModoAcesso = true;
  }

}
