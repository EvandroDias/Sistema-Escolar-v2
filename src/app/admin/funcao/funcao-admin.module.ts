import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { FuncaoRoutingAdminModule } from './funcao-routing-admin.module';
import { CadastrarFuncaoAdminComponent } from './cadastrar/cadastrar-funcao-admin.component';
import { FuncaoAdminComponent } from './funcao-admin.component';
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FuncaoRoutingAdminModule,
    Ng2LoadingSpinnerModule.forRoot({})
  ],
  declarations: [
    FuncaoAdminComponent,
    CadastrarFuncaoAdminComponent,

  ],
  exports:[

    //FuncaoComponent,
    //CadastrarFuncaoComponent
  ]
})
export class FuncaoAdminModule { }
