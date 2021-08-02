import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog';
import { TipoTelefoneService } from 'src/app/service/generico/tipo-telefone.service';
import { PacienteService } from 'src/app/service/pre-cadastro/paciente/paciente.service';
import { GenericComponent } from 'src/app/shared/generic.component';
import { ModalGenericComponent } from 'src/app/shared/modal/modal-generic/modal-generic.component';
import { Paciente } from 'src/models/pre-cadastro/paciente.model';
import { Telefone } from 'src/models/pre-cadastro/telefone.model';
import { TipoTelefone } from 'src/models/pre-cadastro/tipoTelefone.model';

@Component({
  selector: 'form-telefone',
  templateUrl: './telefone.component.html',
  styleUrls: ['./telefone.component.scss']
})
export class TelefoneComponent extends GenericComponent implements OnInit {

  @Input() telefone: Telefone;
  @Input() telefones: Telefone[];
  @Input() indice: number;
  @Input() showDeleteOption: boolean;
  @Input() form: FormGroup;
  private paciente: Paciente;
  tiposTelefone: TipoTelefone[];
  dialog: any;

  constructor(
    private tipoTelefoneService: TipoTelefoneService,
    private pacienteService: PacienteService) {
    super()
  }

  ngOnInit(): void {
    this.tipoTelefoneService.getTipoTelefone().subscribe(result => {
      this.tiposTelefone = result
    });
    this.paciente = this.pacienteService.getPacienteFromLocalStore();
  }

  deleteTelefone(telefone: Telefone) {
    if (this.telefones.length == 1) {
      this.openGenericDialog('Erro', 'Não pode remover o único contato, se preferir pode alterar os dados!')
      return false;
    }

    if (telefone.telefoneId) {
      this.pacienteService.deleteTelefone(telefone, this.paciente).subscribe(result => {
        this.openGenericDialog('Sucesso', 'Exclusão efetuada com sucesso!')
      });
    }

    this.telefones.splice(this.indice, 1);
  }

}
