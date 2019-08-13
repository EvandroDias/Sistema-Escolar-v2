import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RotinaAdminComponent } from "./rotina-admin.component";
import { AdicionarHorarioAdminComponent } from "./adicionar-horario/adicionar-horario-admin.component";
import { ListarTodasRotinasAdminComponent } from "./listar-todas-rotinas-admin/listar-todas-rotinas-admin.component";


const rotinaRoutes: Routes = [
  { path: "", component: RotinaAdminComponent },
  { path: "listar-todas", component: ListarTodasRotinasAdminComponent },
  { path: "adicionar-horario/:id", component: AdicionarHorarioAdminComponent },
  { path: "visualizar-horario/:id/:admin", component: AdicionarHorarioAdminComponent },

//  { path: "metrica-ocorrencia", component: MetricaOcorrenciaComponent },
 // { path: "alterar/:id", component: CadastrarOcorrenciaComponent },
  //{ path: "visualizar/:id", component: VisualizarOcorrenciaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(rotinaRoutes)],
   exports: [RouterModule]
})
export class RotinaRoutingAdminModule {}
