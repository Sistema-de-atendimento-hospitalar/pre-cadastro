import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./pages/index/index.component";
import { DadosPessoaisComponent } from "./pages/dados-pessoais/dados-pessoais.component";
import { DadosEnderecoComponent } from "./pages/dados-endereco/dados-endereco.component";
import { DadosConvenioComponent } from "./pages/dados-convenio/dados-convenio.component";
import { DadosTelefoneComponent } from "./pages/dados-telefone/dados-telefone.component";
import { DadosConfirmacaoComponent } from "./pages/dados-confirmacao/dados-confirmacao.component";
import { StepComponent } from "./pages/step/step.component";

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
