import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { CadastrarTipoOcorrenciaAdminComponent } from './cadastrar/cadastrar-tipo-ocorrencia-admin.component';
import { TipoOcorrenciaAdminComponent } from './tipo-ocorrencia-admin.component';
import { TipoOcorrenciaRoutingAdminModule } from './tipo-ocorrencia-routing-admin.module';
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TipoOcorrenciaRoutingAdminModule,
    Ng2LoadingSpinnerModule.forRoot({})
  ],
  declarations: [
    TipoOcorrenciaAdminComponent,
    CadastrarTipoOcorrenciaAdminComponent,

  ],
  exports:[

    //FuncaoComponent,
    //CadastrarFuncaoComponent
  ]
})
export class TipoOcorrenciaAdminModule { }
