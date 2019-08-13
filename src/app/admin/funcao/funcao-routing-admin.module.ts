import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { CadastrarFuncaoAdminComponent } from './cadastrar/cadastrar-funcao-admin.component';
import { FuncaoAdminComponent } from './funcao-admin.component';

const funcaoRoutes : Routes = [

  {path:'', component:FuncaoAdminComponent},
  {path:'cadastrar',component:CadastrarFuncaoAdminComponent},
  {path: 'alterar/:id', component: CadastrarFuncaoAdminComponent}

]

@NgModule({
  imports: [
    RouterModule.forChild(funcaoRoutes)
    ],
  exports:[RouterModule]
})
export class FuncaoRoutingAdminModule { }
