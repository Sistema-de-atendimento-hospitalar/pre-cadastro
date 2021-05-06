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
  private convenio: boolean = null;
  formaPagamento: string;
  pagamento: string[] = ['Cartão de crédito', 'Pix', 'Dinheiro'];
  hasConvenio: boolean = false
  hasPagamentoParticular: boolean = false
  modoAcesso: boolean = null;
  codigoCartaoCovenio: number = null;
  codigoValidado: boolean = false;

  constructor(private router: Router, private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.paciente = this.pacienteService.getPacienteFromLocalStore();
    if (this.paciente.cartaoSaude) {
      this.cartaoSaude = this.paciente.cartaoSaude 
      this.hasConvenio = true;
    } else {
      this.cartaoSaude = new CartaoSaude();
    }

    this.convenio = !!this.paciente.cartaoSaude
  }

  nextPage() {
    this.paciente.cartaoSaude = this.cartaoSaude
    localStorage.setItem("paciente", JSON.stringify(this.paciente));
    this.pacienteService.updateCartaoSaude(this.cartaoSaude,this.paciente).subscribe(result => {
      this.router.navigate(['/confirmacao-dados']);
    });

    // this.pacienteService.saveCartaoSaude(this.cartaoSaude, this.paciente).subscribe(result => {
      
    // });
  }

  validarCodigoAcesso(codigoConvenio: number) {
    this.pacienteService.validateCodigoConvenio(codigoConvenio).subscribe(result => {
      this.cartaoSaude = result;
      this.codigoValidado = true;
    })
  }

}
