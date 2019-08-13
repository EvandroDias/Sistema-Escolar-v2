import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrarDepartamentoAdminComponent } from './cadastrar/cadastrar-departamento-admin.component';
import { DepartamentoAdminComponent } from './departamento-admin.component';

const departamentoRoutes : Routes = [

  {path:'', component:DepartamentoAdminComponent},
  {path:'cadastrar',component:CadastrarDepartamentoAdminComponent},
  {path: 'alterar/:id', component: CadastrarDepartamentoAdminComponent}

]

@NgModule({
  imports: [
    RouterModule.forChild(departamentoRoutes)
    ],
  exports:[RouterModule]
})
export class DepartamentoRoutingAdminModule { }
