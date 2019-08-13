import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurmaAdminComponent } from './turma-admin.component';
import { CadastrarTurmaAdminComponent } from './cadastrar/cadastrarturma-admin.component';
import { CadastrarAlunoTurmaAdminComponent } from './cadastrar-aluno-turma/cadastrar-aluno-turma-admin.component';


const turmaRoutes : Routes = [

  {path:'', component:TurmaAdminComponent},
  {path:'cadastrar',component:CadastrarTurmaAdminComponent},
  {path:'cadastrar-aluno/:id',component:CadastrarAlunoTurmaAdminComponent},
  //{path: 'alterar/:id', component: CadastrarTurmaAdminComponent}

]


@NgModule({
  imports: [
    RouterModule.forChild(turmaRoutes)
    ],
  exports:[RouterModule]
})
export class TurmaRoutingAdminModule { }
