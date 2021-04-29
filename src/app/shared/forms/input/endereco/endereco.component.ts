import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CepService } from '../../../../service/cep/cep.service';
import { EnderecoCorreios } from '../../../../../models/enderecoCorreios.model';
import { Endereco } from 'src/models/endereco.model';

@Component({
  selector: 'form-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {

  @Input() endereco: Endereco;
  private enderecoCorreios: EnderecoCorreios;

  constructor(private cepService: CepService) { }

  ngOnInit(): void {
    this.enderecoCorreios = new EnderecoCorreios();
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


}