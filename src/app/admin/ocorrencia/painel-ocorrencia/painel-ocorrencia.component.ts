import { Component, OnInit } from '@angular/core';
import { LineChartDataModel } from 'src/app/model/grafico/lineChartData.model';
import { OcorrenciaService } from 'src/app/services/ocorrencia/ocorrencia.service';
import { FiltroOcorrenciaModel } from 'src/app/model/ocorrencia/filtro-ocorrencia.model';
import { UtilitarioService } from 'src/app/services/utilitario/utilitario.service';
import { TipoOcorrenciaCmbModel } from 'src/app/model/tipo-ocorrencia/tipo-ocorrencia.model';
import { TipoOcorrenciaService } from 'src/app/services/tipoOcorrencia/tipo-ocorrencia.service';

@Component({
  selector: 'app-painel-ocorrencia',
  templateUrl: './painel-ocorrencia.component.html',
  styleUrls: ['./painel-ocorrencia.component.css']
})
export class PainelOcorrenciaComponent implements OnInit {

  lineChartDataSerie: any;
  lineChartLabelsSerie: any;
  retornoPainel: any;
  filtro = new FiltroOcorrenciaModel();
  tipoOcorrenciaCmbModel: TipoOcorrenciaCmbModel[] = [];
  mostrar: boolean = false;
  tipoGrafico: string = "bar";
  dias:number = 30;
  showSpinner:boolean = false;

  constructor(
    private ocorrenciaService: OcorrenciaService,
    private utilitarioService: UtilitarioService,
    private tipoOcorrenciaService: TipoOcorrenciaService,
  ) { }

  ngOnInit() {
    this.filtro.tipoOcorrenciaId = "Todos";
    this.dias = 30;
    this.listarPorSerie();
    this.listarTipoOcorrencia();
  }

  mudou(){
    this.listarPorSerie();
  }

  listarTipoOcorrencia() {
    this.tipoOcorrenciaService.listarCmb().subscribe(
      r => {
        this.tipoOcorrenciaCmbModel = r;
      },
      erro => {
        console.log(erro);
      }
    );
  }

  listarPorSerie() {
    this.filtro.dias = this.dias;
    this.filtro.ate = this.utilitarioService.obterDataAtual(1);
    this.filtro.de = this.utilitarioService.obterDataAtual(0);
    this.filtro.filtro = "filtro";
    //this.filtro.tipoOcorrenciaId = "Todos";



    this.filtrar();

  }

  filtrar(): any {

    this.mostrar = false;
    this.showSpinner = true;

     this.ocorrenciaService.PainelGrafico(this.filtro).subscribe(
      r => {

          if (r != null && r != undefined) {

            if(r.lineChartDataSerie.length > 0){
              this.retornoPainel = r;
              this.mostrar = true;

            }


          //  this.lineChartDataSerie = this.retornoPainel.lineChartDataSerie;
          //  this.lineChartLabelsSerie = this.retornoPainel.mesSerie;

            //this.lineChartDataSerie = this.retornoPainel.lineChartDataAluno;
          //  this.lineChartLabelsSerie = this.retornoPainel.mesSerie;

          } else {
            this.retornoPainel = [];
            this.mostrar = false;

         }
         this.showSpinner = false;
      },
      erro => {
        console.log(erro);
        this.mostrar = false;
        this.showSpinner = false;
      }
    );
  }

}
