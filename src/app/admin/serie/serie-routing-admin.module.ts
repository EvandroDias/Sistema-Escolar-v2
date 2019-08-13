import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SerieAdminComponent } from './serie-admin.component';
import { CadastrarSerieAdminComponent } from './cadastrar/cadastrar-serie-admin.component';

const serieRoutes : Routes = [

  {path:'', component:SerieAdminComponent},
  {path:'cadastrar',component:CadastrarSerieAdminComponent},
  {path: 'alterar/:id', component: CadastrarSerieAdminComponent}

]

@NgModule({
  imports: [
    RouterModule.forChild(serieRoutes)
    ],
  exports:[RouterModule]
})
export class SerieRoutingAdminModule { }
