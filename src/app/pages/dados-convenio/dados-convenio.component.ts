import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dados-convenio',
  templateUrl: './dados-convenio.component.html',
  styleUrls: ['./dados-convenio.component.scss']
})
export class DadosConvenioComponent implements OnInit {

  hasConvenio: boolean = false
  hasPagamentoParticular: boolean = false
  acessoViaCodigo: boolean = false

  respondeuConvenio: boolean = false
  respondeuPagamento: boolean = false
  respondeuModoAcesso: boolean = false

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  nextPage() {
    // Realizar validação com o cpf
    this.router.navigate(['/passo1']);
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
