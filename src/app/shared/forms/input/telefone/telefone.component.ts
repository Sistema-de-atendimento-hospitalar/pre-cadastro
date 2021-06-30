import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog';
import { TipoTelefoneService } from 'src/app/service/generico/tipo-telefone.service';
import { PacienteService } from 'src/app/service/paciente/paciente.service';
import { ModalGenericComponent } from 'src/app/shared/modal/modal-generic/modal-generic.component';
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
  @Input() form: FormGroup;
  private paciente: Paciente;
  tiposTelefone: TipoTelefone[];
  dialog: any;

  constructor(private tipoTelefoneService: TipoTelefoneService,
              private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.tipoTelefoneService.getTipoTelefone().subscribe(result => {
      this.tiposTelefone = result
    });
    this.paciente = this.pacienteService.getPacienteFromLocalStore();
  }

  converteToControlName(field, indice) {
    if (indice === 0) {
      return field;
    }
    return `${field}-${indice}`;
  }

  openDialog(titledialogo:string, dialogo:string) {
    const config = new MatDialogConfig()
    config.data = {title:titledialogo, content:dialogo}
    config.height = '20%'
    config.width = '30%'
    this.dialog.open(ModalGenericComponent, config);
  }

  deleteTelefone(telefone: Telefone) {
    if (this.telefones.length == 1) {
      this.openDialog('Erro', 'Não pode remover o único contato, se preferir pode alterar os dados!')
      return false;
    }

    if(telefone.telefoneId) {
      this.pacienteService.deleteTelefone(telefone, this.paciente).subscribe(result => {
        this.openDialog('Sucesso', 'Exclusão efetuada com sucesso!')
      });
    }

    this.telefones.splice(this.indice, 1);
  }

  showError(field: string, indice) {
    if (indice != null) {
      field = this.converteToControlName(field, indice)
    }
    return this.form.get(field).invalid && !this.form.get(field).untouched;
  }

}
