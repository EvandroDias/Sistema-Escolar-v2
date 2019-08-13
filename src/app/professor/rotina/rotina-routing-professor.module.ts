import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


import { RotinaProfComponent } from './rotina-prof.component';
import { AdicionarHorarioProfComponent } from './adicionar-horario/adicionar-horario-prof.component';




const rotinaRoutes: Routes = [
  { path: "", component: RotinaProfComponent },
  { path: "adicionar-horario/:id", component: AdicionarHorarioProfComponent },
  { path: "visualizar-horario/:id/:prof", component: AdicionarHorarioProfComponent },

//  { path: "metrica-ocorrencia", component: MetricaOcorrenciaComponent },
 // { path: "alterar/:id", component: CadastrarOcorrenciaComponent },
  //{ path: "visualizar/:id", component: VisualizarOcorrenciaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(rotinaRoutes)],
   exports: [RouterModule]
})
export class RotinaRoutingProfessorModule {}
