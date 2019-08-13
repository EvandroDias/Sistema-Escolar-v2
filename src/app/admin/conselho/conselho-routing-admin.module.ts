import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CadastrarAlunoConselhoAdminComponent } from './cadastrar-aluno-conselho/cadastrar-aluno-conselho-admin.component';
import { ConselhoAdminComponent } from './conselhoadmin.component';
import { CadastrarConselhoAdminComponent } from './cadastrar/cadastrarconselho-admin.component';



const ConselhoRoutes: Routes = [
  { path: "", component: ConselhoAdminComponent },
  { path: "cadastrar", component: CadastrarConselhoAdminComponent },
  { path: "cadastrar-aluno-conselho/:id/:serieId", component: CadastrarAlunoConselhoAdminComponent },
  { path: "alterar/:id", component: CadastrarConselhoAdminComponent },

];

@NgModule({
  imports: [RouterModule.forChild(ConselhoRoutes)],
  exports: [RouterModule]
})
export class ConselhoRoutingAdminModule {}
