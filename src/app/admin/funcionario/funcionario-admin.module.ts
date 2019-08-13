import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingAdminModule } from './funcionario-admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FuncionarioAdminComponent } from './funcionario-admin/funcionario-admin.component';
import { CadastrarFuncionarioAdminComponent } from './cadastrar-funcionario-admin/cadastrar-funcionario-admin.component';
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner';





@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FuncionarioRoutingAdminModule,
    Ng2LoadingSpinnerModule.forRoot({})
  ],
  declarations: [
    FuncionarioAdminComponent,
    CadastrarFuncionarioAdminComponent,

  ],
  exports:[

    //UsuarioComponent,
    //CadastrarUsuarioComponent
  ],
  providers:[

  ]
})
export class FuncionarioAdminModule { }
