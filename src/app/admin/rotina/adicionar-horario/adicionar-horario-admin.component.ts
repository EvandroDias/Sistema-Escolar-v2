import { Component, OnInit } from "@angular/core";
import { DiaSemanaService } from "src/app/services/dia-semana/dia-semana.service";
import { BaseFormComponent } from "src/app/shared/base-form/base-form.component";
import { FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { MessageService } from "primeng/components/common/messageservice";
import { CadastrarHorarioRotinaModel } from "src/app/model/horario-rotina/cadastrar-horario-rotina.model";
import { AlterarHorarioRotinaModel } from "src/app/model/horario-rotina/alterar-horario-rotina.model";
import { DiaSemanaModel } from "src/app/model/dia-da-semana/diaSemana.model";
import { CommandResultModel } from "src/app/model/command-result.model";
import { ServicosUtilService } from 'src/app/shared/services/servicos-util.services';
import { HorarioRotinaService } from "src/app/services/horario-rotina/horario-rotina.service";

@Component({
  selector: "app-adicionar-horario-admin",
  templateUrl: "./adicionar-horario-admin.component.html",
  styleUrls: ["./adicionar-horario-admin.component.css"],
  providers: [MessageService]
})
export class AdicionarHorarioAdminComponent extends BaseFormComponent implements OnInit {

  cadastrarHorarioRotinaModel = new CadastrarHorarioRotinaModel();

  mensagem: string = "";
  aulaModel: any;
  horarioRotinaModel: any;
  inscricao: Subscription;
  admin: boolean = false;
  diaSemanaModel: DiaSemanaModel[] = [];
  response = new CommandResultModel();
  showSpinner: boolean = false;


  ckeConfig: any;


  submit() {
    let valueSubmit = Object.assign(
      this.cadastrarHorarioRotinaModel,
      this.formulario.value
    );

    if (this.cadastrarHorarioRotinaModel.horarioRotinaId == null || this.cadastrarHorarioRotinaModel.horarioRotinaId == undefined
    ) {
      console.log('salvar');

      this.salvar();
    } else {
      console.log('alterar');

      this.alterar();
    }
  }

  constructor(
    private diaSemanaService: DiaSemanaService,
    private dropdownService: ServicosUtilService,
    private horarioRotinaService: HorarioRotinaService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private messageService: MessageService
  ) {
    super();

    this.inscricao = this.route.params.subscribe((params: any) => {
      this.cadastrarHorarioRotinaModel.rotinaId = params["id"];
      this.admin = params["admin"];
    });
  }

  ngOnInit() {

    this.ckeConfig = {
      allowedContent: false,
      autoGrow_bottomSpace: 1,
      forcePasteAsPlainText: true,
      width: '100%',
      enterMode: '1',
      toolbar: [
        { name: 'document', items: ['Source', '-'] },
        { name: 'clipboard', items: ['Undo', 'Redo'] },
        { name: 'paragraph', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight'] },
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', '-'] },
        { name: 'styles', items: ['Font', 'FontSize'] },
        { name: 'colors', items: ['TextColor'] },
      ]
    };

    this.listarDiaSemana();
    this.listarAula();

    this.formulario = this.formBuilder.group({
      aula: [null, [Validators.required]],
      //diaSemanaId: [null, [Validators.required]],
      conteudo: [null, [Validators.required]]
    });
  }



  onChange($event: any): void {
    console.log("onChange");
    //this.log += new Date() + "<br />";
  }

  voltar() {
    this.location.back();
  }

  limpar() {
    this.formulario.reset();
    this.formulario.clearValidators();
    //this.cadastrarHorarioRotinaModel = new CadastrarHorarioRotinaModel();
  }

  detalhes(id) {

    if (this.admin) {
      this.detalheAdmin(id);
    }
    else {
      this.detalhe(id);
    }
  }

  detalheAdmin(id) {
    console.log(id);

    this.horarioRotinaService.detalheAdmin(id).subscribe(
      r => {
        this.cadastrarHorarioRotinaModel = r;
      },
      erro => { }
    );
  }

  detalhe(id) {
    console.log(id);

    this.horarioRotinaService.detalhe(id).subscribe(
      r => {
        console.log(r);

        this.cadastrarHorarioRotinaModel = r;
      },
      erro => { }
    );
  }

  alterar() {
    this.showSpinner = true;
    this.horarioRotinaService.alterar(this.cadastrarHorarioRotinaModel).subscribe(
      r => {

        this.response = r;
        this.responseAlerta(this.response);

        this.listarHorario(this.cadastrarHorarioRotinaModel.rotinaId,this.cadastrarHorarioRotinaModel.diaSemanaId);
        this.showSpinner = false;
        this.cadastrarHorarioRotinaModel.horarioRotinaId = null;
        this.limpar();

      },
      erro => {
        this.showSpinner = false;
      }
    );
  }

  atualizarDiasSemanaId(diaSemanaId) {
    //this.limpar();
    this.cadastrarHorarioRotinaModel.diaSemanaId = diaSemanaId;
    this.listarHorario(this.cadastrarHorarioRotinaModel.rotinaId, diaSemanaId);
  }

  salvar() {
    this.showSpinner = true;
    this.horarioRotinaService.salvar(this.cadastrarHorarioRotinaModel)
      .subscribe(
        r => {
          this.response = r;
          this.responseAlerta(this.response);
          this.listarHorario(this.cadastrarHorarioRotinaModel.rotinaId, this.cadastrarHorarioRotinaModel.diaSemanaId);
          this.showSpinner = false;
          this.limpar();
        },
        erro => {
          console.log(erro);
          this.showSpinner = false;
        }
      );

  }

  listarHorario(rotinaId, diaSemanaId) {
    this.horarioRotinaService.listar(rotinaId, diaSemanaId).subscribe(
      r => {
        this.horarioRotinaModel = r;
      },
      erro => { }
    );
  }

  listarAula() {
    this.dropdownService.getAula().subscribe(
      r => {
        this.aulaModel = r;
      },
      erro => { }
    );
  }

  listarDiaSemana() {
    this.diaSemanaService.listarTodos().subscribe(
      r => {
        this.diaSemanaModel = r;
        this.cadastrarHorarioRotinaModel.diaSemanaId = this.diaSemanaModel[0].diaSemanaId;
        this.listarHorario(
          this.cadastrarHorarioRotinaModel.rotinaId,
          this.cadastrarHorarioRotinaModel.diaSemanaId
        );
      },
      erro => {
        console.log(erro);
      }
    );
  }

  responseAlerta(response: any) {

    if (response.success == false) {
      this.showToast("rotina", "error", "Rotina", response.message);
    } else {

      this.cadastrarHorarioRotinaModel.conteudo = null;
      this.showToast("rotina", "success", "Rotina", response.message);
     this.formulario.reset();
    }
    //this.formulario.reset();
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
