import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { VisualizarOcorrenciaAdminComponent } from "./visualizar-ocorrencia/visualizar-ocorrencia-admin.component";
import { OcorrenciaAdminComponent } from "./ocorrencia-admin.component";
import { CadastrarOcorrenciaAdminComponent } from "./cadastrar/cadastrar-ocorrencia-admin.component";
import { MetricaGraficoAdminComponent } from "./metrica-grafico/metrica-grafico-admin.component";
import { MetricaOcorrenciaAdminComponent } from "./metrica-ocorrencia/metrica-ocorrencia-admin.component";
import { PainelOcorrenciaComponent } from "./painel-ocorrencia/painel-ocorrencia.component";

const ocorrenciaRoutes: Routes = [
  { path: "", component: OcorrenciaAdminComponent },
  { path: "cadastrar", component: CadastrarOcorrenciaAdminComponent },
  { path: "painel", component: PainelOcorrenciaComponent},
  { path: "grafico-ocorrencia", component: MetricaGraficoAdminComponent },
  { path: "metrica-ocorrencia", component: MetricaOcorrenciaAdminComponent },
  { path: "alterar/:id", component: CadastrarOcorrenciaAdminComponent },
  { path: "visualizar/:id", component: VisualizarOcorrenciaAdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ocorrenciaRoutes)],
  exports: [RouterModule]
})
export class OcorrenciaRoutingAdminModule {}
