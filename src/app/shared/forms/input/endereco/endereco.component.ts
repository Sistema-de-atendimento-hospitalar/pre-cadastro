import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CepService } from '../../../../service/cep/cep.service';
import { EnderecoCorreios } from '../../../../../models/enderecoCorreios.model';
import { Endereco } from 'src/models/endereco.model';
import { PacienteService } from 'src/app/service/paciente/paciente.service';
import { Paciente } from 'src/models/paciente.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'form-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {

  @Input() endereco: Endereco;
  @Input() enderecos: Endereco[];
  @Input() indice: number;
  @Input() showDeleteOption: boolean;
  @Input() form: FormGroup;
  private paciente: Paciente;

  private enderecoCorreios: EnderecoCorreios;

  constructor(
    private cepService: CepService,
    private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.enderecoCorreios = new EnderecoCorreios();
    this.paciente = this.pacienteService.getPacienteFromLocalStore();
  }

  converteToControlName(field, indice) {
    if (indice === 0) {
      return field;
    }
    return `${field}-${indice}`;
  }

  convetion(indice: number) {
    this.form.get(this.converteToControlName('cep', indice)).setValue(this.enderecoCorreios.cep);
    this.form.get(this.converteToControlName('estado', indice)).setValue(this.enderecoCorreios.uf);
    this.form.get(this.converteToControlName('cidade', indice)).setValue(this.enderecoCorreios.localidade);
    this.form.get(this.converteToControlName('logradouro', indice)).setValue(this.enderecoCorreios.logradouro);
    this.form.get(this.converteToControlName('bairro', indice)).setValue(this.enderecoCorreios.bairro);
  }

  buscarCep(indice: number) {
    let cepRequest = this.form.get(this.converteToControlName('cep', indice)).value
    let cepLength: number = 8;
    if (cepRequest != null && cepRequest.length == cepLength) {
      this.cepService.searchCep(cepRequest).subscribe(result => {

        if (result && !result.cep) {
          alert('Cep não encontrado!')
        }

        this.enderecoCorreios = result
        this.convetion(indice)
      });
    }
  }

  deleteEndereco(endereco: Endereco) {
    if (this.enderecos.length == 1) {
      alert('Não pode remover o único endereço\nSe preferir pode alterar os dados!')
      return false;
    }

    if (endereco.enderecoId) {
      this.pacienteService.deleteEndereco(endereco, this.paciente).subscribe(result => {
        alert('Exclusão efetuada com sucesso!')
      });
    }

    this.enderecos.splice(this.indice, 1);
  }

  showError(field: string, indice) {
    if (indice != null) {
      field = this.converteToControlName(field, indice)
    }
    return this.form.get(field).invalid && !this.form.get(field).untouched;
  }

}