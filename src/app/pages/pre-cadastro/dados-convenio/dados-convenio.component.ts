import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { PacienteService } from 'src/app/service/pre-cadastro/paciente/paciente.service';
import { GenericComponent } from 'src/app/shared/generic.component';
import { CartaoSaude } from 'src/models/pre-cadastro/CartaoSaude.model';
import { Paciente } from 'src/models/pre-cadastro/paciente.model';

@Component({
  selector: 'app-dados-convenio',
  templateUrl: './dados-convenio.component.html',
  styleUrls: ['./dados-convenio.component.scss']
})
export class DadosConvenioComponent extends GenericComponent implements OnInit {

  private paciente: Paciente;
  private cartaoSaude: CartaoSaude;
  public convenio: boolean = null;
  formaPagamento: string;
  pagamento: string[] = ['Cartão de crédito', 'Pix', 'Dinheiro'];
  hasConvenio = false
  hasPagamentoParticular = false
  modoAcesso: boolean = null;
  codigoCartaoCovenio: number = null;
  codigoValidado = false;
  @Input() stepper: MatStepper;

  constructor(private router: Router,
    private pacienteService: PacienteService,
    private _formBuilder: FormBuilder) {
    super()
  }

  ngOnInit(): void {
    this.paciente = this.pacienteService.getPacienteFromLocalStore();
    if (this.paciente.cartaoSaude) {
      this.cartaoSaude = this.paciente.cartaoSaude;
      this.hasConvenio = true;
    } else {
      this.cartaoSaude = new CartaoSaude();
    }

    this.convenio = !!this.paciente.cartaoSaude

    this.form = this._formBuilder.group({
      convenio: [this.cartaoSaude.convenio, Validators.required],
      rede: [this.cartaoSaude.rede, Validators.required],
      dtValidade: [this.cartaoSaude.dtValidade, Validators.compose([
        Validators.required, Validators.pattern(/^([1-2]{1})([0-9]{3})\-([0-9]{2})\-([0-9]{2})/)
      ])],
      tipoContrato: [this.cartaoSaude.tipoContrato, Validators.required],
      numeroCarteira: [this.cartaoSaude.numeroCarteira, Validators.required]
    });
  }

  converterToModel(form: FormGroup, model: CartaoSaude) {
    let namesForm = Object.keys(form.controls);
    let namesPaciente = Object.keys(model);

    namesPaciente.forEach(nameModel => {
      namesForm.forEach(nameForm => {
        if (nameForm === nameModel) {
          model[nameForm] = form.get(nameForm).value
        }
      });
    });

    return model;
  }

  nextPage() {

    if (!this.convenio) {
      this.pacienteService.deleteCartaoSaude(this.cartaoSaude, this.paciente).subscribe(result => {
        localStorage.setItem("paciente", JSON.stringify(this.paciente));
        this.goForward(this.stepper);
      });
    }

    localStorage.setItem("selectedIndex", (this.stepper.selectedIndex + 1).toString());
    this.cartaoSaude = this.converterToModel(this.form, this.cartaoSaude);
    if (this.paciente.pacienteId) {
      this.paciente.cartaoSaude = this.cartaoSaude;
      this.pacienteService.updateCartaoSaude(this.cartaoSaude, this.paciente).subscribe(result => {
        localStorage.setItem("paciente", JSON.stringify(this.paciente));
        this.goForward(this.stepper);
      });
    } else {
      this.pacienteService.saveCartaoSaude(this.cartaoSaude, this.paciente).subscribe(
        result => {
          if (result) {
            this.goForward(this.stepper);
          }
        }
      );
    }
  }

  clearConvenio() {
    //this.cartaoSaude = null;
    this.paciente.cartaoSaude = null;
    this.hasConvenio = false;
    this.convenio = null;
  }

  validarCodigoAcesso(codigoConvenio: number) {
    this.pacienteService.validateCodigoConvenio(codigoConvenio).subscribe(result => {
      this.cartaoSaude = result;
      this.codigoValidado = true;
    })
  }

}
