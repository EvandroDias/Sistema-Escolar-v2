import { Component, OnInit } from "@angular/core";

import { FuncionarioService } from "src/app/services/funcionario/funcionario.service";

import { AtivarDesativarModel } from "src/app/Model/ativar-desativar.model";
import { FuncionarioModel } from "src/app/model/funcionario/funcionario.model";
import { take } from "rxjs/operators";
import { ConfirmationService, MessageService } from "primeng/api";
import { CommandResultModel } from "src/app/model/command-result.model";
import { UtilitarioService } from "src/app/services/utilitario/utilitario.service";
import { DadosModel } from "src/app/model/dados-model";

@Component({
  selector: "app-funcionario-admin",
  templateUrl: "./funcionario-admin.component.html",
  styleUrls: ["./funcionario-admin.component.css"]
})
export class FuncionarioAdminComponent implements OnInit {

  funcionarioModel: FuncionarioModel[] = [];
  _funcionarioModel: FuncionarioModel[] = [];
  dadosModel = new DadosModel();
  ativarDesativarModel = new AtivarDesativarModel();
  response = new CommandResultModel();

  constructor(
    private funcionarioService: FuncionarioService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private utilitarioService: UtilitarioService
  ) {}

  ngOnInit() {
    this.listarTodos();
  }

  pesquisar() {
    this.dadosModel.showSpinner = true;
     this.funcionarioModel = [];
     this._funcionarioModel = [];
    this.funcionarioService
      .pesquisar(this.dadosModel.filtro)
      .pipe(take(1))
      .subscribe(
        u => {
          if (u.length > 0) {
            u.forEach(item => {
              this.funcionarioModel.push(item);
            });

            this._funcionarioModel = this.funcionarioModel.slice(0, 5);

          }

          this.dadosModel.showSpinner = false;
        },
        erro => {
          console.log(erro);
          this.dadosModel.showSpinner = false;
        }
      );

      if(this.dadosModel.filtro == null || this.dadosModel.filtro == "")
         this.listarTodos();
  }

  listarTodos() {
    this.dadosModel.showSpinner = true;

    this.funcionarioService
      .listarTodos(this.dadosModel.status, this.dadosModel.skip, this.dadosModel.take)
      .pipe(take(1))
      .subscribe(
        u => {
          if (u.length > 0) {
            u.forEach(item => {
              this.funcionarioModel.push(item);
            });

            this._funcionarioModel = this.funcionarioModel.slice(0, 5);

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
    this._funcionarioModel = [];

    this.dadosModel.pagina = event.page;
    this.dadosModel.qtdPagina = event.rows;

    this._funcionarioModel = this.funcionarioModel.slice(
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
    this._funcionarioModel = [];
    this.funcionarioModel = [];

    this.listarTodos();
  }



  obter() {
    if (
      this.funcionarioModel.length === 0 ||
      this.dadosModel.filtro === undefined ||
      this.dadosModel.filtro.trim() === ""
    ) {
      return this.funcionarioModel;
    }

    return this.funcionarioModel.filter(v =>
      v.nome
        .toLocaleLowerCase()
        .includes(this.dadosModel.filtro.toLocaleLowerCase())
    );
  }

  confirm(id: string, status: boolean) {
    var mensagem: string = "";

    if (status) {
      mensagem = "Deseja reamente desativar esse funcionário?";
    } else {
      mensagem = "Deseja reamente ativar esse funcionário?";
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

    this.funcionarioService
      .ativarDesativar(this.ativarDesativarModel)
      .subscribe(
        u => {
          this.response = this.utilitarioService.responseAlerta(u);
          let tipo = this.response.success == true ? "success" : "error";

          this.showToast("f", tipo, "Funcionário", this.response.message);

          setTimeout(() => {
            this._funcionarioModel = [];
            this.funcionarioModel = [];
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
