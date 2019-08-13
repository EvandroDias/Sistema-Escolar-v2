
import { NgModule } from '@angular/core';
import { FiltroSerieComponent } from '../filros/filtro-serie/filtro-serie.component';
import { FiltroAlunoComponent } from '../filros/filtro-aluno/filtro-aluno.component';
import { FiltroTodosComponent } from '../filros/filtro-todos/filtro-todos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FiltroGraficoComponent } from './filtro-grafico/filtro-grafico.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
     FiltroSerieComponent,
     FiltroAlunoComponent,
     FiltroTodosComponent,
     FiltroGraficoComponent
    
  ],
  exports:[
    FiltroSerieComponent,
    FiltroAlunoComponent,
    FiltroTodosComponent,
    FiltroGraficoComponent
  ]
})
export class FiltrosModule { }
