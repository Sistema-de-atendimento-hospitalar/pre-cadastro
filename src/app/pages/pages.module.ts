import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { PopoverModule } from "ngx-bootstrap/popover";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { CdkStepperModule } from '@angular/cdk/stepper';


import { FooterComponent } from '../shared/footer/footer.component';
import { SquareComponent } from '../shared/square/square.component';
import { SquarePreCadastroComponent } from '../shared/square/square-pre-cadastro/square-pre-cadastro.component'
import { InputEstadoComponent } from '../shared/forms/input/input-estado/input-estado.component';
import { InputCidadeComponent } from '../shared/forms/input/input-cidade/input-cidade.component';
import { EnderecoComponent } from '../shared/forms/input/endereco/endereco.component';
import { TelefoneComponent } from '../shared/forms/input/telefone/telefone.component';
import { ModalTelefoneComponent } from '../shared/modal/modal-telefone/modal-telefone.component';
import { ButtonComponent } from '../shared/button/button.component';
import { StepComponent } from './step/step.component'

import { IndexComponent } from "./index/index.component";
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { DadosEnderecoComponent } from './dados-endereco/dados-endereco.component';
import { DadosTelefoneComponent } from './dados-telefone/dados-telefone.component';
import { DadosConvenioComponent } from './dados-convenio/dados-convenio.component';
import { DadosConfirmacaoComponent } from './dados-confirmacao/dados-confirmacao.component';
import { ModalEnderecoComponent } from "../shared/modal/modal-endereco/modal-endereco.component"
import { PagamentoParticularComponent } from './../shared/pagamento-particular/pagamento-particular.component';
import { CodigoCartaoComponent } from './../shared/codigo-cartao/codigo-cartao.component';
import { ModalGenericComponent } from './../shared/modal/modal-generic/modal-generic.component';


export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
  imports: [
    MatListModule,
    FormsModule,
    ReactiveFormsModule, 
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    MatSnackBarModule,
    HttpClientModule,
    MatExpansionModule,
    MatRadioModule,
    MatChipsModule,
    MatStepperModule,
    CdkStepperModule,

    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  declarations: [
    IndexComponent,
    FooterComponent,
    SquareComponent,
    SquarePreCadastroComponent,
    InputEstadoComponent,
    InputCidadeComponent,
    EnderecoComponent,
    TelefoneComponent,
    ModalTelefoneComponent,
    ModalEnderecoComponent,
    DadosPessoaisComponent,
    DadosEnderecoComponent,
    DadosTelefoneComponent,
    DadosConvenioComponent,
    DadosConfirmacaoComponent,
    ButtonComponent,
    StepComponent,
    PagamentoParticularComponent,
    CodigoCartaoComponent,
    ModalGenericComponent
  ],
  exports: [
    IndexComponent,
    ScrollingModule
  ],
  providers: [
  ],
  entryComponents: [ModalEnderecoComponent]
})
export class PagesModule { }
