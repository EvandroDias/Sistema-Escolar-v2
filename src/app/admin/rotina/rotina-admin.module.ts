import { NgModule } from "@angular/core";
import { Ng2LoadingSpinnerModule } from "ng2-loading-spinner";

import {EditorModule} from 'primeng/editor';
import { RotinaRoutingAdminModule } from "./rotina-routing-admin.module";
import { AdicionarHorarioAdminComponent } from "./adicionar-horario/adicionar-horario-admin.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RotinaAdminComponent } from "./rotina-admin.component";
import { ListarTodasRotinasAdminComponent } from "./listar-todas-rotinas-admin/listar-todas-rotinas-admin.component";
import {AccordionModule} from 'primeng/accordion';
import { CommonModule } from "@angular/common";



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RotinaRoutingAdminModule,
    Ng2LoadingSpinnerModule.forRoot({}),
    EditorModule,
    AccordionModule,
    //MessagesModule,
    //MessageModule
  ],
  declarations: [
    RotinaAdminComponent,
    AdicionarHorarioAdminComponent,
    //TabelaHorarioRotinaComponent,
    ListarTodasRotinasAdminComponent,
    //TabelaOcorrenciaComponent
  ],
  exports: [
    //UsuarioComponent,
    //CadastrarUsuarioComponent
  ],
  providers: []
})
export class RotinaAdminModule {}
