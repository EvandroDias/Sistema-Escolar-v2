import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";

//import { DialogService } from 'ng2-bootstrap-modal';
import { AlunoService } from "src/app/services/aluno/aluno.service";

//import { ConfirmComponent } from '../../alert/confirm.component';
import { AtivarDesativarModel } from "src/app/Model/ativar-desativar.model";
import { AlunoModel } from "src/app/model/aluno/aluno.model";
import { CommandResultModel } from "src/app/model/command-result.model";
import { DadosModel } from "src/app/model/dados-model";
import { ConfirmationService, MessageService } from "primeng/api";
import { UtilitarioService } from "src/app/services/utilitario/utilitario.service";

@Component({
  selector: "app-aluno-admin",
  templateUrl: "./aluno-admin.component.html",
  styleUrls: ["./aluno-admin.component.css"]
})
export class AlunoAdminComponent implements OnInit {
  alunoModel: AlunoModel[] = [];
  _alunoModel: any[];
  response = new CommandResultModel();
  ativarDesativarModel = new AtivarDesativarModel();
  dadosModel = new DadosModel();

  constructor(
    private alunoService: AlunoService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private utilitarioService: UtilitarioService
  ) { }

  ngOnInit() {
    this.listarTodos(this.dadosModel.status);
  }

  alterou(event) {
    this.dadosModel.status = event;
    this.dadosModel.skip = 0;
    this.dadosModel.take = 50;
    this._alunoModel = [];
    this.alunoModel = [];

    this.listarTodos(this.dadosModel.status);
  }

  pesquisar(){

    this._alunoModel = [];
    this.alunoModel = [];
    this.dadosModel.showSpinner = true;

    this.alunoService
      .pesquisar(this.dadosModel.filtro)
      .subscribe(
        u => {
          if (u != null) {
            if (u.length > 0) {
              u.forEach(item => {
                this.alunoModel.push(item);
              });

              this._alunoModel = this.alunoModel.slice(0, 5);
            }
          }

          this.dadosModel.showSpinner = false;
        },
        erro => {
          console.log(erro);
          this.dadosModel.showSpinner = false;
        }
      );

      if(this.dadosModel.filtro == null || this.dadosModel.filtro == "")
         this.listarTodos(true);
  }

  listarTodos(status) {
    this.dadosModel.showSpinner = true;

    this.alunoService
      .listarTodos(status, this.dadosModel.skip, this.dadosModel.take)
      .subscribe(
        u => {
          if (u != null) {
            if (u.length > 0) {
              u.forEach(item => {
                this.alunoModel.push(item);
              });




              this._alunoModel = this.alunoModel.slice(0, 5);
            }
          }

          this.dadosModel.showSpinner = false;
        },
        erro => {
          console.log(erro);
          this.dadosModel.showSpinner = false;
        }
      );
  }

  confirm(id: string, status: boolean) {
    var mensagem: string = "";

    if (status) {
      mensagem = "Deseja reamente desativar esse aluno?";
    } else {
      mensagem = "Deseja reamente ativar esse aluno?";
    }

    this.confirmationService.confirm({
      message: mensagem,
      accept: () => {
        this.ativarDesativar(id);
      }
    });
  }

  showToast(key, tipo, titulo, mensagem) {
    this.messageService.add({
      key: key,
      severity: tipo,
      summary: titulo,
      detail: mensagem
    });
  }

  ativarDesativar(id) {

    this.ativarDesativarModel.id = id;

    this.alunoService
      .ativarDesativar(this.ativarDesativarModel)
      .subscribe(
        u => {
          this.response = this.utilitarioService.responseAlerta(u);
          let tipo = this.response.success == true ? "success" : "error";

          this.showToast("f", tipo, "Aluno", this.response.message);

          setTimeout(() => {
            this._alunoModel = [];
            this.alunoModel = [];
            this.listarTodos(this.dadosModel.status);
          }, 1000);
        },
        erro => { }
      );
  }

  paginate(event) {
    this._alunoModel = [];

    this.dadosModel.pagina = event.page;
    this.dadosModel.qtdPagina = event.rows;

    this._alunoModel = this.alunoModel.slice(
      event.first,
      event.first + event.rows
    );

    if (event.page + 1 == event.pageCount) {
      this.dadosModel.skip += this.dadosModel.take;
      this.dadosModel.take = this.dadosModel.take;
      this.listarTodos(this.dadosModel.status);
    }
  }
}
