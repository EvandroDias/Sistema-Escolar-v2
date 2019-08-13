import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionarioAdminComponent } from './funcionario-admin/funcionario-admin.component';
import { CadastrarFuncionarioAdminComponent } from './cadastrar-funcionario-admin/cadastrar-funcionario-admin.component';



const funcionarioRoutes : Routes = [

  {path:'', component:FuncionarioAdminComponent},
  {path:'cadastrar',component:CadastrarFuncionarioAdminComponent},
  {path: 'alterar/:id', component: CadastrarFuncionarioAdminComponent}

]


@NgModule({
  imports: [
    RouterModule.forChild(funcionarioRoutes)
    ],
  exports:[RouterModule]
})
export class FuncionarioRoutingAdminModule { }
