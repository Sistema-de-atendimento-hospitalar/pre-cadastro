import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from '@angular/router';
import { PacienteService } from '../../service/paciente/paciente.service';
import { Paciente } from "src/models/paciente.model";
@Component({
  selector: "app-index",
  templateUrl: "index.component.html",
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  dataText = ["Olá, seja bem vindo!", "Informe seu CPF", "Obrigada!"];

  public hasError: Boolean = false;
  public showAnimation: Boolean = true;

  private paciente: Paciente;

  constructor(private router: Router, private pacienteService: PacienteService) { }

  ngOnInit() {
    this.paciente = new Paciente()
    this.startTextAnimation(0);
  }

  typeWriter(text, i, fnCallback) {
    if (i < (text.length)) {
      document.querySelector("h1").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
      setTimeout(() => {
        this.typeWriter(text, i + 1, fnCallback)
      }, 90);
    }

    else if (typeof fnCallback == 'function') {
      setTimeout(fnCallback, 700);
    }
  }

  startTextAnimation(i) {
    if (!this.showAnimation) {
      return false;
    }
    if (typeof this.dataText[i] == 'undefined') {
      setTimeout(() => {
        this.startTextAnimation(0);
      }, 2000);
    }

    if (i < this.dataText.length) {
      this.typeWriter(this.dataText[i], 0, () => {
        this.startTextAnimation(i + 1);
      });
    }
  }

  ngOnDestroy() {
    this.showAnimation = false;
  }

  nextPage() {
    this.showAnimation = false;

    if (this.validarCpf(this.paciente.cpf)) {
      this.pacienteService.verifyPacienteFromCpf(this.paciente.cpf)
        .subscribe(result => {
          localStorage.setItem("paciente", JSON.stringify(this.paciente));
          this.paciente = result;
          console.log(this.paciente);
          if (result) {
            localStorage.setItem("paciente", JSON.stringify(this.paciente));
          }
          this.router.navigate(['/passo1']);
        }, error => {
          console.log(error);
        });
    } else {
      this.hasError = true;
    }
  }

  validarCpf(strCPF: String): Boolean {
    let soma: number = 0;
    let resto: number;
    let i: number;

    if (strCPF == null || strCPF === '00000000000' || strCPF === '11111111111' || strCPF === '22222222222' || strCPF === '33333333333' ||
      strCPF === '44444444444' || strCPF === '55555555555' || strCPF === '66666666666' || strCPF === '77777777777' ||
      strCPF === '88888888888' || strCPF === '99999999999' || strCPF.length !== 11) {
      return false;
    }

    for (i = 1; i <= 9; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(strCPF.substring(9, 10))) return false;

    soma = 0;
    for (i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }

}