import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { BaseFormComponent } from "src/app/shared/base-form/base-form.component";

import { TipoOcorrenciaService } from "src/app/services/tipoOcorrencia/tipo-ocorrencia.service";
import { OcorrenciaModel } from "src/app/model/ocorrencia/ocorrencia.model";
import { FuncionarioCmbModel } from "src/app/model/funcionario/funcionario-cmb.model";
import { TipoOcorrenciaCmbModel } from "src/app/model/tipo-ocorrencia/tipo-ocorrencia.model";
import { AlunoCmbModel } from "src/app/model/aluno/aluno-cmb.model";
import { SerieCmbModel } from "src/app/model/serie/serie-cmb.model";
import { CommandResultModel } from "src/app/model/command-result.model";
import { OcorrenciaService } from "src/app/services/ocorrencia/ocorrencia.service";
import { SerieService } from "src/app/services/serie/serie.service";
import { AlunoService } from "src/app/services/aluno/aluno.service";
import { FuncionarioService } from "src/app/services/funcionario/funcionario.service";
import { ServicosUtilService } from 'src/app/shared/services/servicos-util.services';
import { MessageService } from "primeng/api";

@Component({
  selector: "app-cadastrar-ocorrencia-admin",
  templateUrl: "./cadastrar-ocorrencia-admin.component.html",
  styleUrls: ["./cadastrar-ocorrencia-admin.component.css"],
  providers: [MessageService]
})
export class CadastrarOcorrenciaAdminComponent extends BaseFormComponent
  implements OnInit {

  ocorrenciaModel = new OcorrenciaModel();
  funcionarioCmbModel: FuncionarioCmbModel[] = [];
  tipoOcorrenciaCmbModel: TipoOcorrenciaCmbModel[] = [];
  alunoCmbModel: AlunoCmbModel[] = [];
  serieCmbModel: SerieCmbModel[] = [];
  periodos: any[] = [];
  response = new CommandResultModel();
  mensagem: string = "";

  id: string = null;
  inscricao: Subscription;

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
    private ocorrenciaService: OcorrenciaService,
    private serieService: SerieService,
    private alunoService: AlunoService,
    private tipoOcorrenciaService: TipoOcorrenciaService,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dropdownService: ServicosUtilService,
    private messageService: MessageService
  ) {
    super();
  }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe((params: any) => {
      this.id = params["id"];

      if (this.id != null) {
        this.detalhe();
      } else {
        this.ocorrenciaModel.dataOcorrencia = this.dataHoje();
      }
    });

    this.formulario = this.formBuilder.group({
      titulo: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200)
        ]
      ],
      descricao: [null],
      periodo: [null, Validators.required],
      alunoId: [null, Validators.required],
      funcionarioId: [null, Validators.required],
      serieId: [null, Validators.required],
      tipoOcorrenciaId: [null, Validators.required],
      dataOcorrencia: [null, Validators.required]
    });

    this.periodos = this.dropdownService.getPeriodo();
    //this.listarAluno();
    this.listarFuncionario();
    this.listarSerie();
    this.listarTipoOcorrencia();
  }

  dataHoje() {
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    return [dia, mes, ano].join("/");
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

  listarAluno(id) {
    this.alunoService.listarPorSerieId(id).subscribe(
      r => {
        this.alunoCmbModel = r;
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

  submit() {
    let valueSubmit = Object.assign(
      this.ocorrenciaModel,
      this.formulario.value
    );

    if (this.id != null) {
      this.alterar();
    } else {
      this.salvar(this.ocorrenciaModel);
    }
  }

  salvar(valueSubmit) {
    this.ocorrenciaService.salvar(valueSubmit).subscribe(
      u => {
        this.response = u;
        this.responseAlerta(this.response);
      },
      erro => {
        console.log(erro);
      }
    );
  }

  alterar() {
    this.ocorrenciaService.alterar(this.ocorrenciaModel).subscribe(
      u => {
        this.response = u;
        this.responseAlerta(this.response);
      },
      erro => { }
    );
  }

  responseAlerta(response: any) {
    if (response.success == false) {
      this.showToast("ocorrencia", "error", "Ocorrência", response.message);
    } else {
      this.showToast("ocorrencia", "success", "Ocorrência", response.message);

      this.formulario.reset();
    }

    // this.formulario.reset();
  }

  showToast(key, tipo, titulo, mensagem) {
    this.messageService.add({
      key: key,
      severity: tipo,
      summary: titulo,
      detail: mensagem
    });
  }

  /*responseAlerta(response, rota) {
    if (response.success == false && this.response.data.length >= 0) {
      response.data.forEach(item => {
        this.mensagem += item.message;
      });

      alert(this.mensagem);
    } else if (response.success == false && response.data.length <= 0) {
      alert(response.message);
    } else {
      alert(response.message);
      this.formulario.reset();
    }
    //this.router.navigate([rota]);
  }*/

  detalhe() {
    this.ocorrenciaService.detalhe(this.id).subscribe(
      f => {
        if (f != null) {
          this.ocorrenciaModel = f;
          console.log(f);
        }
      },
      erro => { }
    );
  }
}
