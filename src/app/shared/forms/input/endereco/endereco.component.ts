import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CepService } from '../../../../service/cep/cep.service';
import { EnderecoCorreios } from '../../../../../models/enderecoCorreios.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalEnderecoComponent } from 'src/app/shared/modal/modal-endereco/modal-endereco.component';
import { Endereco } from 'src/models/endereco.model';

@Component({
  selector: 'form-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {

  enderecos = [1];

  private endereco: Endereco;
  @Output() enderecoEvent = new EventEmitter<Endereco>();
  private enderecoCorreios: EnderecoCorreios;
  private disableInput: boolean = false;

  constructor(private cepService: CepService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.enderecoCorreios = new EnderecoCorreios();
    this.endereco = new Endereco();
  }

  convetion() {
    this.endereco.cep = this.enderecoCorreios.cep;
    this.endereco.estado = this.enderecoCorreios.uf;
    this.endereco.cidade = this.enderecoCorreios.localidade;
    this.endereco.logradouro = this.enderecoCorreios.logradouro;
    this.endereco.bairro = this.enderecoCorreios.bairro;
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalEnderecoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  // addEndereco() {
  //   this.enderecos.push(1);
  // }

  verifyCep() {
    let cepRequest = this.endereco;
    let cepLength: number = 8;
    if (cepRequest.cep.length == cepLength) {
      this.cepService.searchCep(cepRequest.cep).subscribe(result => {
        this.enderecoCorreios = result
        this.convetion()
        localStorage.setItem("endereco", JSON.stringify(this.endereco))
        this.enderecoEvent.emit(this.endereco);
      });
    }
  }


}