import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CepService } from '../../../../service/cep/cep.service';
import { EnderecoCorreios } from '../../../../../models/enderecoCorreios.model';
import { Endereco } from 'src/models/endereco.model';
import { PacienteService } from 'src/app/service/paciente/paciente.service';
import { Paciente } from 'src/models/paciente.model';

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
  private paciente: Paciente;

  private enderecoCorreios: EnderecoCorreios;

  constructor(private cepService: CepService, private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.enderecoCorreios = new EnderecoCorreios();
    this.paciente = this.pacienteService.getPacienteFromLocalStore();
  }

  convetion() {
    this.endereco.cep = this.enderecoCorreios.cep;
    this.endereco.estado = this.enderecoCorreios.uf;
    this.endereco.cidade = this.enderecoCorreios.localidade;
    this.endereco.logradouro = this.enderecoCorreios.logradouro;
    this.endereco.bairro = this.enderecoCorreios.bairro;
  }

  verifyCep() {
    let cepRequest = this.endereco;
    let cepLength: number = 8;
    if (cepRequest.cep.length == cepLength) {
      this.cepService.searchCep(cepRequest.cep).subscribe(result => {
        this.enderecoCorreios = result
        this.convetion()
      });
    }
  }

  deleteEndereco(endereco: Endereco) {
    if (this.enderecos.length == 1) {
      alert('Não pode remover o único endereço\nSe preferir pode alterar os dados!')
      return false;
    }

    if(endereco.enderecoId) {
      this.pacienteService.deleteEndereco(endereco, this.paciente).subscribe(result => {
        alert('Exclusão efetuada com sucesso!')
      });
    }

    this.enderecos.splice(this.indice, 1);
  }


}