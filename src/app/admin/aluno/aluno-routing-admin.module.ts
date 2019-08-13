import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrarAlunoAdminComponent } from './cadastrar/cadastrar-aluno-admin.component';
import { AlunoAdminComponent } from './aluno-admin.component';


const alunoRoutes : Routes = [

  {path:'', component:AlunoAdminComponent},
  {path:'cadastrar',component:CadastrarAlunoAdminComponent},
  {path: 'alterar/:id', component: CadastrarAlunoAdminComponent}

]


@NgModule({
  imports: [
    RouterModule.forChild(alunoRoutes)
    ],
  exports:[RouterModule]
})
export class AlunoRoutingAdminModule { }
