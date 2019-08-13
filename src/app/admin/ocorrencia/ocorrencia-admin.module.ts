import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Ng2LoadingSpinnerModule } from "ng2-loading-spinner";

import { OcorrenciaRoutingAdminModule } from "./ocorrencia-routing-admin.module";
import { OcorrenciaAdminComponent } from "./ocorrencia-admin.component";
import { CadastrarOcorrenciaAdminComponent } from "./cadastrar/cadastrar-ocorrencia-admin.component";
import { VisualizarOcorrenciaAdminComponent } from "./visualizar-ocorrencia/visualizar-ocorrencia-admin.component";
import { MetricaGraficoAdminComponent } from "./metrica-grafico/metrica-grafico-admin.component";
import { MetricaOcorrenciaAdminComponent } from "./metrica-ocorrencia/metrica-ocorrencia-admin.component";

import { SharedModule } from "src/app/shared/shared.module";
import { FiltrosModule } from "src/app/components/filros/filtros.module";
import { TabelaOcorrenciaComponent } from "src/app/components/tabela-ocorrencia-admin/tabela-ocorrencia.component";
import { GraficoOcorrenciaComponent } from "src/app/components/grafico-ocorrencia/grafico-ocorrencia.component";
import { PainelOcorrenciaComponent } from "./painel-ocorrencia/painel-ocorrencia.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OcorrenciaRoutingAdminModule,
    Ng2LoadingSpinnerModule.forRoot({}),
    FiltrosModule
  ],
  declarations: [
    OcorrenciaAdminComponent,
    CadastrarOcorrenciaAdminComponent,
    VisualizarOcorrenciaAdminComponent,
    MetricaGraficoAdminComponent,
    MetricaOcorrenciaAdminComponent,
    GraficoOcorrenciaComponent,
    TabelaOcorrenciaComponent,
    PainelOcorrenciaComponent
  ],
  exports: [
    //UsuarioComponent,
    //CadastrarUsuarioComponent
  ],
  providers: []
})
export class OcorrenciaAdminModule {}
