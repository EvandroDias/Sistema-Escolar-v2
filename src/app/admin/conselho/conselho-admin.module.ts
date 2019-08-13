import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Ng2LoadingSpinnerModule } from "ng2-loading-spinner";

import { ConselhoRoutingAdminModule } from "./Conselho-routing-admin.module";



import { CadastrarAlunoConselhoAdminComponent } from './cadastrar-aluno-conselho/cadastrar-aluno-conselho-admin.component';
import { TabelaConselhoComponent } from '../../components/tabela-conselho-admin/tabela-conselho.component';
import { TabelaAlunoConselhoComponent } from '../../components/tabela-aluno-conselho-admin/tabela-aluno-conselho.component';
import { SharedModule } from '../../shared/shared.module';
import { FiltrosModule } from '../../components/filros/filtros.module';
import { ConselhoAdminComponent } from './conselhoadmin.component';
import { CadastrarConselhoAdminComponent } from './cadastrar/cadastrarconselho-admin.component';





@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ConselhoRoutingAdminModule,
    Ng2LoadingSpinnerModule.forRoot({}),
    FiltrosModule
  ],
  declarations: [
    ConselhoAdminComponent,
    CadastrarConselhoAdminComponent,
    CadastrarAlunoConselhoAdminComponent,
    TabelaConselhoComponent,
    TabelaAlunoConselhoComponent
  ],
  exports: [
    //UsuarioComponent,
    //CadastrarUsuarioComponent
  ],
  providers: []
})
export class ConselhoAdminModule { }
