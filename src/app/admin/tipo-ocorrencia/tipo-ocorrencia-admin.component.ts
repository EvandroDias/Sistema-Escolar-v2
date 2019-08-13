import { Component, OnInit } from "@angular/core";



import { TipoOcorrenciaCmbModel } from "src/app/model/tipo-ocorrencia/tipo-ocorrencia.model";
import { TipoOcorrenciaService } from "src/app/services/tipoOcorrencia/tipo-ocorrencia.service";
import { DadosModel } from "src/app/model/dados-model";
import { AtivarDesativarModel } from "src/app/Model/ativar-desativar.model";
import { CommandResultModel } from "src/app/model/command-result.model";
import { ConfirmationService, MessageService } from "primeng/api";
import { UtilitarioService } from "src/app/services/utilitario/utilitario.service";
import { take } from "rxjs/operators";



@Component({
  selector: "app-tipo-ocorrencia-admin",
  templateUrl: "./tipo-ocorrencia-admin.component.html",
  styleUrls: ["./tipo-ocorrencia-admin.component.css"]
})
export class TipoOcorrenciaAdminComponent implements OnInit {

  tipoOcorrenciaModel: TipoOcorrenciaCmbModel[] = [];
  _tipoOcorrenciaModel: any[];
  dadosModel = new DadosModel();
  ativarDesativarModel = new AtivarDesativarModel();
  response = new CommandResultModel();


  constructor(
    private tipoOcorrenciaService: TipoOcorrenciaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private utilitarioService: UtilitarioService
  ) {}

  ngOnInit() {
    this.listarTodos();
  }

  listarTodos() {

    this.dadosModel.showSpinner = true;

    this.tipoOcorrenciaService.listarTodos(this.dadosModel.status, this.dadosModel.skip, this.dadosModel.take)
    .pipe(take(1))
    .subscribe(
      u => {

         if (u.length > 0) {
            u.forEach(item => {
              this.tipoOcorrenciaModel.push(item);
            });

            this._tipoOcorrenciaModel = this.tipoOcorrenciaModel.slice(0, 5);

          }

          this.dadosModel.showSpinner = false;

      },
      erro => {
        console.log(erro);
        this.dadosModel.showSpinner = false;
      }
    );
  }

  paginate(event) {
    this._tipoOcorrenciaModel = [];

    this.dadosModel.pagina = event.page;
    this.dadosModel.qtdPagina = event.rows;

    this._tipoOcorrenciaModel = this.tipoOcorrenciaModel.slice(
      event.first,
      event.first + event.rows
    );

    if (event.page + 1 == event.pageCount) {
      this.dadosModel.skip += this.dadosModel.take;
      this.dadosModel.take = this.dadosModel.take;
      this.listarTodos();
    }
  }

  alterou(event) {
    this.dadosModel.status = event;
    this.dadosModel.skip = 0;
    this.dadosModel.take = 50;
    this._tipoOcorrenciaModel = [];
    this.tipoOcorrenciaModel = [];

    this.listarTodos();
  }



  obter() {
    if (
      this.tipoOcorrenciaModel.length === 0 ||
      this.dadosModel.filtro === undefined ||
      this.dadosModel.filtro.trim() === ""
    ) {
      return this.tipoOcorrenciaModel;
    }

    return this.tipoOcorrenciaModel.filter(v =>
      v.nome
        .toLocaleLowerCase()
        .includes(this.dadosModel.filtro.toLocaleLowerCase())
    );
  }

  confirm(id: string, status: boolean) {
    var mensagem: string = "";

    if (status) {
      mensagem = "Deseja reamente desativar esse tipo de ocorrência?";
    } else {
      mensagem = "Deseja reamente ativar esse tipo de ocorrência?";
    }

    this.confirmationService.confirm({
      message: mensagem,
      accept: () => {
        this.ativarDesativar(id, status);
      }
    });
  }



  ativarDesativar(id, status) {
    this.ativarDesativarModel.id = id;

    this.tipoOcorrenciaService
      .ativarDesativar(this.ativarDesativarModel)
      .subscribe(
        u => {
          this.response = this.utilitarioService.responseAlerta(u);
          let tipo = this.response.success == true ? "success" : "error";

          this.showToast("f", tipo, "Tipo Ocorrência", this.response.message);

          setTimeout(() => {
            this._tipoOcorrenciaModel = [];
            this.tipoOcorrenciaModel = [];
            this.listarTodos();
          }, 1000);
        },
        erro => {}
      );
  }

  showToast(key, tipo, titulo, mensagem) {
    this.messageService.add({
      key: key,
      severity: tipo,
      summary: titulo,
      detail: mensagem
    });
  }






}
