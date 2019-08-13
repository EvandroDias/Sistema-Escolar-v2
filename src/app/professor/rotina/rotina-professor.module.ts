import { NgModule } from "@angular/core";
import { Ng2LoadingSpinnerModule } from "ng2-loading-spinner";

import {EditorModule} from 'primeng/editor';
import { RotinaRoutingProfessorModule } from "./rotina-routing-Professor.module";
import { SharedModule } from "src/app/shared/shared.module";
import {AccordionModule} from 'primeng/accordion';
import { CommonModule } from "@angular/common";
import { RotinaProfComponent } from "./rotina-prof.component";
import { AdicionarHorarioProfComponent } from "./adicionar-horario/adicionar-horario-prof.component";




@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RotinaRoutingProfessorModule,
    Ng2LoadingSpinnerModule.forRoot({}),
    EditorModule,
    AccordionModule,
    //MessagesModule,
    //MessageModule
  ],
  declarations: [
    RotinaProfComponent,
    AdicionarHorarioProfComponent,

    //TabelaOcorrenciaComponent
  ],
  exports: [
    //UsuarioComponent,
    //CadastrarUsuarioComponent
  ],
  providers: []
})
export class RotinaProfessorModule {}
