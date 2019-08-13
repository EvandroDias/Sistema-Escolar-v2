import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoRoutingAdminModule } from './aluno-routing-admin.module';
import { AlunoAdminComponent } from './aluno-admin.component';
import { CadastrarAlunoAdminComponent } from './cadastrar/cadastrar-aluno-admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner';




@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AlunoRoutingAdminModule,
    Ng2LoadingSpinnerModule.forRoot({})
  ],
  declarations: [
    AlunoAdminComponent,
    CadastrarAlunoAdminComponent,

  ],
  exports:[

    //UsuarioComponent,
    //CadastrarUsuarioComponent
  ],
  providers:[

  ]
})
export class AlunoAdminModule { }
