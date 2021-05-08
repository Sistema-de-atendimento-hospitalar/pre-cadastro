import { Component, Input, OnInit } from '@angular/core';
import { TipoTelefoneService } from 'src/app/service/generico/tipo-telefone.service';
import { PacienteService } from 'src/app/service/paciente/paciente.service';
import { Paciente } from 'src/models/paciente.model';
import { Telefone } from 'src/models/telefone.model';
import { TipoTelefone } from 'src/models/tipoTelefone.model';

@Component({
  selector: 'form-telefone',
  templateUrl: './telefone.component.html',
  styleUrls: ['./telefone.component.scss']
})
export class TelefoneComponent implements OnInit {

  @Input() telefone: Telefone;
  @Input() telefones: Telefone[];
  @Input() indice: number;
  @Input() showDeleteOption: boolean;
  private paciente: Paciente;
  tiposTelefone: TipoTelefone[];

  constructor(private tipoTelefoneService: TipoTelefoneService, private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.tipoTelefoneService.getTipoTelefone().subscribe(result => {
      this.tiposTelefone = result
    });
    this.paciente = this.pacienteService.getPacienteFromLocalStore();
  }

  deleteTelefone(telefone: Telefone) {
    if (this.telefones.length == 1) {
      alert('Não pode remover o único contato\nSe preferir pode alterar os dados!')
      return false;
    }

    if(telefone.telefoneId) {
      this.pacienteService.deleteTelefone(telefone, this.paciente).subscribe(result => {
        alert('Exclusão efetuada com sucesso!')
      });
    }

    this.telefones.splice(this.indice, 1);
  }

}
