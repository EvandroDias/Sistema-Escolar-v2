import { Component, OnInit } from "@angular/core";
import { BaseFormComponent } from "src/app/shared/base-form/base-form.component";

import { SerieService } from "src/app/services/serie/serie.service";
import { FormBuilder, Validators } from "@angular/forms";


import { RotinaService } from "src/app/services/rotina/rotina.service";
import { MessageService } from "primeng/components/common/messageservice";
import { AtivarDesativarModel } from "src/app/Model/ativar-desativar.model";
import { CadastrarRotinaModel } from "src/app/model/rotina/cadastrar-rotina.model";
import { SerieCmbModel } from "src/app/model/serie/serie-cmb.model";
import { ListarRotinaModel } from "src/app/model/rotina/listar-rotina.model";
import { CommandResultModel } from "src/app/model/command-result.model";
import { ImprimirRotinaModel } from "src/app/model/rotina/imprimir-rotina.model";
import { UtilitarioService } from "src/app/services/utilitario/utilitario.service";
import { ConfirmationService } from "primeng/api";


@Component({
  selector: "app-rotina-prof",
  templateUrl: "./rotina-prof.component.html",
  styleUrls: ["./rotina-prof.component.css"],
  providers: [MessageService]
})
export class RotinaProfComponent extends BaseFormComponent implements OnInit {

  cadastrarRotinaModel = new CadastrarRotinaModel();
  serieCmbModel: SerieCmbModel[] = [];
  listarRotinaModel: ListarRotinaModel[] = [];
  response = new CommandResultModel();
  ativarDesativarModel = new AtivarDesativarModel();
  mensagem: string = "";
  imprimirRotinaModel = new ImprimirRotinaModel();
  skip: number = 0;
  take: number = 50;

  pt = {
    firstDayOfWeek: 0,
    dayNames: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado"
    ],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"
    ],
    monthNamesShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez"
    ],
    today: "Hoje",
    clear: "Limpar",
    dateFormat: "dd/mm/yy"
  };

  constructor(
    private serieService: SerieService,
    private rotinaService: RotinaService,
    private messageService: MessageService,
    private utilitarioService: UtilitarioService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.listarSerie();
    this.listarRotina();
    this.formulario = this.formBuilder.group({
      de: [null, [Validators.required]],

      ate: [null, [Validators.required]],

      serieId: [null, Validators.required]
    });
  }

  submit() {
    let valueSubmit = Object.assign(
      this.cadastrarRotinaModel,
      this.formulario.value
    );

    console.log(this.cadastrarRotinaModel);

    this.salvar(this.cadastrarRotinaModel);
  }

  salvar(valueSubmit) {
    this.rotinaService.salvar(valueSubmit).subscribe(
      u => {

        this.response = this.utilitarioService.responseAlerta(u);
        let tipo = this.response.success == true ? 'success' : 'error';

        this.showToast('f', tipo, 'Rotina', this.response.message);

        this.listarRotina();

      },
      erro => {
        console.log(erro);
      }
    );
  }


  excluir(id) {

    this.ativarDesativarModel.id = id;

    this.rotinaService.excluir(this.ativarDesativarModel).subscribe(
      u => {
        this.response = u;

        this.response = this.utilitarioService.responseAlerta(u);
        let tipo = this.response.success == true ? 'success' : 'error';

        this.showToast('f', tipo, 'Rotina', this.response.message);

        this.listarRotina();

      },
      erro => {
        console.log(erro);
      }
    );
  }

  confirm(id: string) {

    var mensagem: string = "Deseja reamente excluir essa rotina?";

    this.confirmationService.confirm({
      message: mensagem,
      accept: () => {
        this.excluir(id);
      }
    });
  }

  imprimir(rotinaId) {
    this.imprimirRotinaModel.rotinaId = rotinaId;

    this.rotinaService.imprimir(this.imprimirRotinaModel).subscribe(
      u => {
        //this.response = u;
        console.log(u);

        var fileURL = URL.createObjectURL(u);
        window.open(fileURL);

        //this.responseAlerta(this.response, "/");
      },
      erro => {
        console.log(erro);
      }
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

  listarRotina() {
    this.rotinaService.listarMinhasRotinas(this.skip, this.take).subscribe(
      r => {
        this.listarRotinaModel = r;
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
