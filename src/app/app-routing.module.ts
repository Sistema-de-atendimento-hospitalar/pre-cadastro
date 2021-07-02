import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./pages/pre-cadastro/index/index.component";
import { DadosPessoaisComponent } from "./pages/pre-cadastro/dados-pessoais/dados-pessoais.component";
import { DadosEnderecoComponent } from "./pages/pre-cadastro/dados-endereco/dados-endereco.component";
import { DadosConvenioComponent } from "./pages/pre-cadastro/dados-convenio/dados-convenio.component";
import { DadosTelefoneComponent } from "./pages/pre-cadastro/dados-telefone/dados-telefone.component";
import { DadosConfirmacaoComponent } from "./pages/pre-cadastro/dados-confirmacao/dados-confirmacao.component";
import { StepComponent } from "./pages/pre-cadastro/step/step.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: IndexComponent },
  { path: "passo1", component: DadosPessoaisComponent },
  { path: "passo2", component: DadosEnderecoComponent },
  { path: "passo3", component: DadosTelefoneComponent },
  { path: "passo4", component: DadosConvenioComponent },
  { path: "confirmacao-dados", component: DadosConfirmacaoComponent },
  { path: "step", component: StepComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule { }
