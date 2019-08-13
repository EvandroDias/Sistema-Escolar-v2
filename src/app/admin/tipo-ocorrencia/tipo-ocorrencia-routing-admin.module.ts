import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { TipoOcorrenciaAdminComponent } from './tipo-ocorrencia-admin.component';
import { CadastrarTipoOcorrenciaAdminComponent } from './cadastrar/cadastrar-tipo-ocorrencia-admin.component';

const tipoOcorrenciaRoutes : Routes = [

  {path:'', component:TipoOcorrenciaAdminComponent},
  {path:'cadastrar',component:CadastrarTipoOcorrenciaAdminComponent},
  {path: 'alterar/:id', component: CadastrarTipoOcorrenciaAdminComponent}

]

@NgModule({
  imports: [
    RouterModule.forChild(tipoOcorrenciaRoutes)
    ],
  exports:[RouterModule]
})
export class TipoOcorrenciaRoutingAdminModule { }
