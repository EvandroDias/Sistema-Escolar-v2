import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrarDisciplinaAdminComponent } from './cadastrar/cadastrar-disciplina-admin.component';
import { DisciplinaAdminComponent } from './disciplina-admin.component';


const disciplinaRoutes : Routes = [

  {path:'', component:DisciplinaAdminComponent},
  {path:'cadastrar',component:CadastrarDisciplinaAdminComponent},
  {path: 'alterar/:id', component: CadastrarDisciplinaAdminComponent}

]

@NgModule({
  imports: [
    RouterModule.forChild(disciplinaRoutes)
    ],
  exports:[RouterModule]
})
export class DisciplinaRoutingAdminModule { }
