import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { SerieRoutingAdminModule } from './serie-routing-admin.module';
import { SerieAdminComponent } from './serie-admin.component';
import { CadastrarSerieAdminComponent } from './cadastrar/cadastrar-serie-admin.component';
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner';


@NgModule({
  imports: [
    CommonModule,
    SerieRoutingAdminModule,
    Ng2LoadingSpinnerModule.forRoot({}),
    SharedModule
  ],
  declarations: [
    SerieAdminComponent,
    CadastrarSerieAdminComponent
  ]
})
export class SerieAdminModule { }
