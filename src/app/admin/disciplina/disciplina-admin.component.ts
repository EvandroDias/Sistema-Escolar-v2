import { OnInit, Component } from "@angular/core";

import { DisciplinaService } from "src/app/services/Disciplina/Disciplina.service";
import { DisciplinaModel } from "src/app/model/disciplina/disciplina.model";
import { AtivarDesativarModel } from "src/app/Model/ativar-desativar.model";
import { DadosModel } from "src/app/model/dados-model";
import { CommandResultModel } from "src/app/model/command-result.model";
import { ConfirmationService, MessageService } from "primeng/api";
import { UtilitarioService } from "src/app/services/utilitario/utilitario.service";

@Component({
  selector: "app-disciplina-admin",
  templateUrl: "./disciplina-admin.component.html",
  styleUrls: ["./disciplina-admin.component.css"]
})
export class DisciplinaAdminComponent implements OnInit {
  disciplinaModel: DisciplinaModel[] = [];
  _disciplinaModel: any[];
  dadosModel = new DadosModel();
  ativarDesativarModel = new AtivarDesativarModel();
  response = new CommandResultModel();

  constructor(
    private disciplinaService: DisciplinaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private utilitarioService: UtilitarioService
  ) {}

  ngOnInit() {
    this.listarTodos();
  }

  listarTodos() {
    this.dadosModel.showSpinner = true;

    this.disciplinaService
      .listarTodos(
        this.dadosModel.status,
        this.dadosModel.skip,
        this.dadosModel.take
      )
      .subscribe(
        u => {
          if (u.length > 0) {
            u.forEach(item => {
              this.disciplinaModel.push(item);
            });

            this._disciplinaModel = this.disciplinaModel.slice(0, 5);
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
    this._disciplinaModel = [];

    this.dadosModel.pagina = event.page;
    this.dadosModel.qtdPagina = event.rows;

    this._disciplinaModel = this.disciplinaModel.slice(
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
    this._disciplinaModel = [];
    this.disciplinaModel = [];

    this.listarTodos();
  }

  obter() {
    if (
      this.disciplinaModel.length === 0 ||
      this.dadosModel.filtro === undefined ||
      this.dadosModel.filtro.trim() === ""
    ) {
      return this.disciplinaModel;
    }

    return this.disciplinaModel.filter(v =>
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

    this.disciplinaService.ativarDesativar(this.ativarDesativarModel).subscribe(
      u => {
        this.response = this.utilitarioService.responseAlerta(u);
        let tipo = this.response.success == true ? "success" : "error";

        this.showToast("f", tipo, "Funcionário", this.response.message);

        setTimeout(() => {
          this._disciplinaModel = [];
          this.disciplinaModel = [];
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
