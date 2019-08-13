import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';


import { CadastrarDisciplinaAdminComponent } from './cadastrar/cadastrar-disciplina-admin.component';
import { DisciplinaAdminComponent } from './disciplina-admin.component';
import { DisciplinaRoutingAdminModule } from './disciplina-routing-admin.module';
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner';


@NgModule({
  imports: [
    CommonModule,
    DisciplinaRoutingAdminModule,
    Ng2LoadingSpinnerModule.forRoot({}),
    SharedModule
  ],
  declarations: [
    DisciplinaAdminComponent,
    CadastrarDisciplinaAdminComponent
  ]
})
export class DisciplinaAdminModule { }
