import { Component, OnInit } from "@angular/core";
import { FuncaoService } from "src/app/services/funcao/funcao.service";
import { AtivarDesativarModel } from "src/app/Model/ativar-desativar.model";
import { FuncaoModel } from "src/app/model/funcao/funcao.model";
import { DadosModel } from "src/app/model/dados-model";
import { CommandResultModel } from "src/app/model/command-result.model";
import { ConfirmationService, MessageService } from "primeng/api";
import { UtilitarioService } from "src/app/services/utilitario/utilitario.service";

@Component({
  selector: "app-funcao-admin",
  templateUrl: "./funcao-admin.component.html",
  styleUrls: ["./funcao-admin.component.css"]
})
export class FuncaoAdminComponent implements OnInit {
  funcaoModel: FuncaoModel[] = [];
  _funcaoModel: any[];
  dadosModel = new DadosModel();
  ativarDesativarModel = new AtivarDesativarModel();
  response = new CommandResultModel();

  constructor(
    private funcaoService: FuncaoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private utilitarioService: UtilitarioService
  ) {}

  ngOnInit() {
    this.listarTodos();
  }

  listarTodos() {
    this.dadosModel.showSpinner = true;

    this.funcaoService.listarTodos(this.dadosModel.status,this.dadosModel.skip,this.dadosModel.take).subscribe(
      u => {
        if (u.length > 0) {
          u.forEach(item => {
            this.funcaoModel.push(item);
          });

          this._funcaoModel = this.funcaoModel.slice(0, 5);
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
    this._funcaoModel = [];

    this.dadosModel.pagina = event.page;
    this.dadosModel.qtdPagina = event.rows;

    this._funcaoModel = this.funcaoModel.slice(
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
    this._funcaoModel = [];
    this.funcaoModel = [];

    this.listarTodos();
  }

  confirm(id: string, status: boolean) {
    var mensagem: string = "";

    if (status) {
      mensagem = "Deseja reamente desativar essa função?";
    } else {
      mensagem = "Deseja reamente ativar essa função?";
    }

    this.confirmationService.confirm({
      message: mensagem,
      accept: () => {
        this.ativarDesativar(id, status);
      }
    });
  }

  ativarDesativar(id, status) {

    this.response = new CommandResultModel();

    this.ativarDesativarModel.id = id;

    this.funcaoService.ativarDesativar(this.ativarDesativarModel).subscribe(
      u => {

        this.response = this.utilitarioService.responseAlerta(u);
        let tipo = this.response.success == true ? "success" : "error";

        this.showToast("f", tipo, "Função", this.response.message);

        setTimeout(() => {
          this._funcaoModel = [];
          this.funcaoModel = [];
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
