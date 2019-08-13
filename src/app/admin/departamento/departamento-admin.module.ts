import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { DepartamentoRoutingAdminModule } from './departamento-routing-admin.module';
import { DepartamentoAdminComponent } from './departamento-admin.component';
import { CadastrarDepartamentoAdminComponent } from './cadastrar/cadastrar-departamento-admin.component';
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner';


@NgModule({
  imports: [
    CommonModule,
    DepartamentoRoutingAdminModule,
    Ng2LoadingSpinnerModule.forRoot({}),
    SharedModule
  ],
  declarations: [
    DepartamentoAdminComponent,
    CadastrarDepartamentoAdminComponent
  ]
})
export class DepartamentoAdminModule { }
