import { Component, OnInit } from "@angular/core";
import { OcorrenciaService } from "src/app/services/ocorrencia/ocorrencia.service";
import { OcorrenciaModel } from "src/app/model/ocorrencia/ocorrencia.model";
import { ConfirmationService } from "primeng/api";
import { AtivarDesativarModel } from '../../model/ativar-desativar.model';
import { UtilitarioService } from '../../services/utilitario/utilitario.service';
import { CommandResultModel } from '../../model/command-result.model';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
  selector: "app-ocorrencia-admin",
  templateUrl: "./ocorrencia-admin.component.html",
  styleUrls: ["./ocorrencia-admin.component.css"]
})
export class OcorrenciaAdminComponent implements OnInit {
  ocorrenciaModel: OcorrenciaModel[] = [];
  _ocorrenciaModel: OcorrenciaModel[] = [];

  //ativarDesativarModel = new AtivarDesativarAlunoModel();

  filtro: string;
  skip: number = 0;
  take: number = 50;
  pagina: number = 0;
  qtdPagina: number = 5;
  showSpinner: boolean = false;
  ativarDesativarModel = new AtivarDesativarModel();
  response = new CommandResultModel();

  constructor(
    private ocorrenciaService: OcorrenciaService,
    private confirmationService: ConfirmationService,
    private utilitarioService: UtilitarioService,
    private messageService: MessageService,
    ) {}

  ngOnInit() {
    this.listarTodos();
  }

  paginate(event) {
    this._ocorrenciaModel = [];

    this.pagina = event.page;
    this.qtdPagina = event.rows;

    this._ocorrenciaModel = this.ocorrenciaModel.slice(
      event.first,
      event.first + event.rows
    );

    if (event.page + 1 == event.pageCount) {
      this.skip += this.take;
      this.take = this.take;
      this.listarTodos();
    }
  }

  listarTodos() {

    this.showSpinner = true;

    this.ocorrenciaService.listarTodos(this.skip,this.take).subscribe(
      u => {

        if (u.length > 0) {
          u.forEach(item => {
            this.ocorrenciaModel.push(item);
          });

          this._ocorrenciaModel = this.ocorrenciaModel.slice(0, 5);

        }
        this.showSpinner = false;
      },
      erro => {
        console.log(erro);
        this.showSpinner = false;
      }
    );
  }

  confirm(id) {
    console.log(id);

    var mensagem: string = "";

      mensagem = "Deseja reamente excluir essa ocorrência?";


    this.confirmationService.confirm({
      message: mensagem,
      accept: () => {
        this.ativarDesativar(id);
      }
    });
  }

  ativarDesativar(id) {

    this.ativarDesativarModel.id = id;

    this.ocorrenciaService
      .ativarDesativar(this.ativarDesativarModel)
      .subscribe(
        u => {
          this.response = this.utilitarioService.responseAlerta(u);
          let tipo = this.response.success == true ? "success" : "error";

          this.showToast("f", tipo, "Ocorrência", this.response.message);

          setTimeout(() => {
            this._ocorrenciaModel = [];
            this.ocorrenciaModel = [];
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

      var o = this.ocorrenciaModel[i];

      if (o != null) {
        this._ocorrenciaModel.push(o);
      }
    }

    if (this.filtro === undefined || this.filtro.trim() === "") {
      return this._ocorrenciaModel;
    }

    return this.ocorrenciaModel.filter(v =>
      v.titulo.toLocaleLowerCase().includes(this.filtro.toLocaleLowerCase())
    );
  }
}
