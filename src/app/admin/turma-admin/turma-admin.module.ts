import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner';
import { TurmaRoutingAdminModule } from './turma-routing-admin.module';
import { TurmaAdminComponent } from './turma-admin.component';
import { TabelaTurmaComponent } from '../../components/tabela-turma-admin/tabela-turma.component';
import { CadastrarTurmaAdminComponent } from './cadastrar/cadastrarturma-admin.component';
import { CadastrarAlunoTurmaAdminComponent } from './cadastrar-aluno-turma/cadastrar-aluno-turma-admin.component';
import { TabelaAlunoTurmaComponent } from 'src/app/components/tabela-aluno-turma-admin/tabela-aluno-turma.component';




@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TurmaRoutingAdminModule,
    Ng2LoadingSpinnerModule.forRoot({})
  ],
  declarations: [
    TurmaAdminComponent,
    TabelaTurmaComponent,
    CadastrarTurmaAdminComponent,
    CadastrarAlunoTurmaAdminComponent,
    TabelaAlunoTurmaComponent

  ],
  exports:[
    TabelaTurmaComponent
    //UsuarioComponent,
    //CadastrarUsuarioComponent
  ],
  providers:[

  ]
})
export class TurmaAdminModule { }
