import { Component, OnInit } from "@angular/core";
import { AlunoService } from "src/app/services/aluno/aluno.service";
import { SerieService } from "src/app/services/serie/serie.service";
import { TipoOcorrenciaService } from "src/app/services/tipoOcorrencia/tipo-ocorrencia.service";
import { FuncionarioService } from "src/app/services/funcionario/funcionario.service";
import { OcorrenciaService } from "src/app/services/ocorrencia/ocorrencia.service";
import { UtilitarioService } from "src/app/services/utilitario/utilitario.service";
import { MenuItem } from "primeng/components/common/menuitem";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
import { FiltroOcorrenciaModel } from "src/app/model/ocorrencia/filtro-ocorrencia.model";
import { LineChartDataModel } from "src/app/model/grafico/lineChartData.model";
import { AlunoCmbModel } from "src/app/model/aluno/aluno-cmb.model";
import { SerieCmbModel } from "src/app/model/serie/serie-cmb.model";
import { FuncionarioCmbModel } from "src/app/model/funcionario/funcionario-cmb.model";
import { TipoOcorrenciaCmbModel } from "src/app/model/tipo-ocorrencia/tipo-ocorrencia.model";

@Component({
  selector: "app-metrica-grafico-admin",
  templateUrl: "./metrica-grafico-admin.component.html",
  styleUrls: ["./metrica-grafico-admin.component.css"]
})
export class MetricaGraficoAdminComponent implements OnInit {
  filtro = new FiltroOcorrenciaModel();
  lineChartData: LineChartDataModel;
  showSpinner: boolean = false;
  lineChartLabels: any;
  tipoGrafico: string = "bar";
  mostrar: boolean = false;
  tipoFiltro: string = "grafico";
  msgs = [];
  items: MenuItem[];
  _filtroSerie = "Série";

  alunoCmbModel: AlunoCmbModel[] = [];
  serieCmbModel: SerieCmbModel[] = [];
  funcionarioCmbModel: FuncionarioCmbModel[] = [];
  tipoOcorrenciaCmbModel: TipoOcorrenciaCmbModel[] = [];
  index: number = 0;
  retornoPainel: any;

  constructor(
    private alunoService: AlunoService,
    private serieService: SerieService,
    private tipoOcorrenciaService: TipoOcorrenciaService,
    private funcionarioService: FuncionarioService,
    private utilitarioService: UtilitarioService,
    private ocorrenciaService: OcorrenciaService
  ) {}

  ngOnInit() {
    this.items = [
      { label: "Data", icon: "fa fa-fw fa-bar-chart" },
      { label: "Aluno", icon: "fa fa-fw fa-calendar" },
      { label: "Série", icon: "fa fa-fw fa-book" }
    ];
    this.listarAluno();
    this.listarSerie();
    this.listarFuncionario();
    this.listarTipoOcorrencia();

    this.filtro.de = this.utilitarioService.obterDataAtual(0);
    this.filtro.ate = this.utilitarioService.obterDataAtual(1);
    this.filtro.tipoOcorrenciaId = "Todos";
    //this.filtro.tipoFiltro = "grafico";
  }

  trocou(e){
    console.log(e);

    var i = e.index;

   if(i == 0){
     this.filtro.tipoFiltro = "Data";
   }
   else if(i == 1){
    this.filtro.tipoFiltro = "Aluno";
   }else{
    this.filtro.tipoFiltro = "Série";
   }

    //this.filtro.tipoFiltro = event.target.innerText;

  }

  filtrar(event) {

    this.mostrar = false;
    this.showSpinner = true;
    this.filtro = event;
    this.msgs = this.utilitarioService.hide();

    if(this.filtro.tipoFiltro == "Série"){

      this.ocorrenciaService.graficoPorSerie(this.filtro).subscribe(
        r => {

            if (r != null && r != undefined) {

              if(r.lineChartDataSerie.length > 0){
                this.retornoPainel = r;
                this.mostrar = true;

              }



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

    else{

    this.ocorrenciaService.grafico(this.filtro).subscribe(
      r => {
        setTimeout(() => {


          if (r != null && r != undefined && r.lineChartData.length > 0) {

            this.lineChartData = r.lineChartData;
            this.lineChartLabels = r.mes;
            this.mostrar = true;


          } else {
            this.msgs = this.utilitarioService.show(
              "error",
              "Opss!!",
              "Nenhuma ocorrência foi encontrada!!"
            );
            this.mostrar = false;
          }
        }, 500);

        this.showSpinner = false;
      },
      erro => {
        console.log(erro);
        this.showSpinner = false;
        this.mostrar = false;
      }
    );
    }
  }

  imprimir(event) {

    this.showSpinner = true;

    var data = document.getElementById("contentToConvert");
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      //pdf.save('MYPdf.pdf'); // Generated PDF
      window.open(pdf.output("bloburl"));
      this.showSpinner = false;
    });
  }

  /* filtrar(event) {
    this.mostrar = false;

    console.log(event);


    setTimeout(() => {

      if (event != null && event != undefined && event.lineChartData.length > 0) {
        this.grafico = event;
        this.lineChartData = this.grafico.lineChartData;

        console.log(this.lineChartData);

        console.log("grafico", this.grafico);
        this.lineChartLabels = this.grafico.mes;
        this.mostrar = true;
      }
    }, 500);
  }*/

  // mudarPerido(
  //      tipoFiltro: any
  // ) {
  //this.filtro = new FiltroOcorrenciaModel();

  //  console.log(tipoFiltro);
  //this.filtro.tipoFiltro = tipoFiltro;
  //this.ocorrenciaModel = [];
  // }

  listarFuncionario() {
    this.funcionarioService.listarCmb().subscribe(
      r => {
        this.funcionarioCmbModel = r;
      },
      erro => {
        console.log(erro);
      }
    );
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

  listarAluno() {
    this.alunoService.listarCmb().subscribe(
      r => {
        this.alunoCmbModel = r;
      },
      erro => {
        console.log(erro);
      }
    );
  }

  listarSerie() {
    this.serieService.listarCmb().subscribe(
      r => {
        this.serieCmbModel = r;
      },
      erro => {
        console.log(erro);
      }
    );
  }
}
