import { Component, OnInit } from "@angular/core";

import { AlunoService } from "src/app/services/aluno/aluno.service";
import { SerieService } from "src/app/services/serie/serie.service";
import { TipoOcorrenciaService } from "src/app/services/tipoOcorrencia/tipo-ocorrencia.service";
import { FuncionarioService } from "src/app/services/funcionario/funcionario.service";
import { OcorrenciaService } from "src/app/services/ocorrencia/ocorrencia.service";
import { UtilitarioService } from "src/app/services/utilitario/utilitario.service";

import { MenuItem } from "primeng/components/common/menuitem";
import { AlunoCmbModel } from "src/app/model/aluno/aluno-cmb.model";
import { SerieCmbModel } from "src/app/model/serie/serie-cmb.model";
import { FuncionarioCmbModel } from "src/app/model/funcionario/funcionario-cmb.model";
import { TipoOcorrenciaCmbModel } from "src/app/model/tipo-ocorrencia/tipo-ocorrencia.model";
import { OcorrenciaModel } from "src/app/model/ocorrencia/ocorrencia.model";
import { FiltroOcorrenciaModel } from "src/app/model/ocorrencia/filtro-ocorrencia.model";

@Component({
  selector: "app-metrica-ocorrencia-admin",
  templateUrl: "./metrica-ocorrencia-admin.component.html",
  styleUrls: ["./metrica-ocorrencia-admin.component.css"]
})
export class MetricaOcorrenciaAdminComponent implements OnInit {

  showSpinner: boolean = false;

  btnSerie = false;
  btnData = true;
  btnNomeAluno = false;
  habilitarBotaoImprimir: boolean = true;
  msgs = [];

  alunoCmbModel: AlunoCmbModel[] = [];
  serieCmbModel: SerieCmbModel[] = [];
  funcionarioCmbModel: FuncionarioCmbModel[] = [];
  tipoOcorrenciaCmbModel: TipoOcorrenciaCmbModel[] = [];

  ocorrenciaModel: OcorrenciaModel[] = [];
  _ocorrenciaModel: OcorrenciaModel[] = [];
  //skip: number = 0;
  //take: number = 50;

  filtro = new FiltroOcorrenciaModel();
  f: string;
  items: MenuItem[];

  constructor(
    private alunoService: AlunoService,
    private serieService: SerieService,
    private tipoOcorrenciaService: TipoOcorrenciaService,
    private funcionarioService: FuncionarioService,
    private utilitarioService: UtilitarioService,
    private ocorrenciaService: OcorrenciaService
  ) { }

  ngOnInit() {
    this.items = [
      { label: "Data", icon: "fa fa-fw fa-bar-chart" },
      { label: "Aluno", icon: "fa fa-fw fa-calendar" },
      { label: "Série", icon: "fa fa-fw fa-book" }
    ];

    this.filtro.ate = this.utilitarioService.obterDataAtual(1);
    this.filtro.de = this.utilitarioService.obterDataAtual(0);
    this.filtro.filtro = "filtro";
    this.filtro.tipoOcorrenciaId = "Todos";

    this.listarAluno();
    this.listarSerie();
    this.listarFuncionario();
    this.listarTipoOcorrencia();

    this.filtrar(this.filtro);


  }

  impressao(event) {
     console.log('event',event);

    this.showSpinner = true;

    this.ocorrenciaService.imprimir(event).subscribe(
      r => {
        console.log(r);

        var fileURL = URL.createObjectURL(r);
        window.open(fileURL);
        this.showSpinner = false;
      },
      erro => {
        console.log("erro", erro);
        this.showSpinner = false;
      }
    );
  }

  imprimirTotal(event) {
    console.log('event',event);

   this.showSpinner = true;

   this.ocorrenciaService.imprimirTotal(event).subscribe(
     r => {
       console.log(r);

       var fileURL = URL.createObjectURL(r);
       window.open(fileURL);
       this.showSpinner = false;
     },
     erro => {
       console.log("erro", erro);
       this.showSpinner = false;
     }
   );
 }



  filtrar(event) {

    this.filtro = event;
    this.showSpinner = true;

    this.msgs = this.utilitarioService.hide();

    this._ocorrenciaModel = [];

    this.ocorrenciaService.filtrar(this.filtro).subscribe(
      r => {

        if (r.length > 0) {

          this.ocorrenciaModel = r;
          this.popularOcorrencia(0, 5);
        }

        this.showSpinner = false;
      },
      erro => {
        console.log(erro);
        this.showSpinner = false;
      }
    );
  }

  mudarPerido(
    status1: boolean,
    status2: boolean,
    status3: boolean,
    tipoFiltro: any
  ) {

    this.btnSerie = status1;
    this.btnData = status2;
    this.btnNomeAluno = status3;
    this.filtro.tipoFiltro = tipoFiltro;
    this.ocorrenciaModel = [];
  }

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

  paginate(event) {

    this.popularOcorrencia(event.page, event.rows);

    if (event.pageCount == event.first + event.rows) {

      this.filtrar(this.filtro);
    }


  }

  popularOcorrencia(pagina, qtdPorPagina) {
    this._ocorrenciaModel = [];

    for (
      let i = pagina * qtdPorPagina;
      i < pagina * qtdPorPagina + qtdPorPagina;
      i++
    ) {
      if (this.ocorrenciaModel.length == 0) {
        break;
      }

      let o = this.ocorrenciaModel[i];
      console.log("o", o);

      if (o != null) {
        this._ocorrenciaModel.push(o);
      }
    }

    if (this.f === undefined || this.f.trim() === "") {
      return this._ocorrenciaModel;
    }

    return this._ocorrenciaModel.filter(v =>
      v.nomeAluno.toLocaleLowerCase().includes(this.f.toLocaleLowerCase())
    );
  }
}
