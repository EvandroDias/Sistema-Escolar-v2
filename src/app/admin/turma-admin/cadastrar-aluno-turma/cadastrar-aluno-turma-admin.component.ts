import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { BaseFormComponent } from "src/app/shared/base-form/base-form.component";

import { AlunoCmbModel } from "src/app/model/aluno/aluno-cmb.model";

import { CommandResultModel } from "src/app/model/command-result.model";

import { AlunoService } from "src/app/services/aluno/aluno.service";
import { TurmaService } from "src/app/services/turma/turma.service";
import { TurmaModel } from '../../../model/turma/turma.model';
import { ItemTurmaAlunoModel } from '../../../model/itemTurmaAluno/itemTurmaAluno.model';
import { ServicosUtilService } from "src/app/shared/services/servicos-util.services";




@Component({
  selector: "app-cadastrar-aluno-turma-admin",
  templateUrl: "./cadastrar-aluno-turma-admin.component.html",
  styleUrls: ["./cadastrar-aluno-turma-admin.component.css"]
})
export class CadastrarAlunoTurmaAdminComponent extends BaseFormComponent implements OnInit {



  itemTurmaAlunoModel = new ItemTurmaAlunoModel();
  alunoCmbModel: AlunoCmbModel[] = [];
  alunosCadastrados: AlunoCmbModel[] = [];
  turmaModel = new TurmaModel();
  response = new CommandResultModel();
  mensagem: string = "";
  status: any[] = [];
  id: string = null;
  serieId: string = null;
  inscricao: Subscription;
  showSpinner: boolean = false;
  alterando: boolean = false;

  constructor(
    private turmaService: TurmaService,
    private alunoService: AlunoService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dropdownService: ServicosUtilService

  ) {
    super();

    this.inscricao = this.route.params.subscribe((params: any) => {
      this.itemTurmaAlunoModel.turmaId = params["id"];
      this.listarAluno();
      this.detalhe(this.itemTurmaAlunoModel.turmaId);

    });
  }


  ngOnInit() {


    this.formulario = this.formBuilder.group({

      alunoId: [null, Validators.required],
      turmaId: [this.itemTurmaAlunoModel.turmaId, Validators.required],
      numero: [null, [Validators.required, Validators.minLength(1)]],
      status: [null, [Validators.required]]

    });
    this.status = this.dropdownService.getStatus();

  }

  submit() {

    if (this.alterando) {
      console.log('alterar');
      this.alterarAluno(this.itemTurmaAlunoModel);

    } else {
      this.salvar(this.itemTurmaAlunoModel);
    }


  }

  cancelou() {
    this.itemTurmaAlunoModel.alunoId = null;
    this.itemTurmaAlunoModel.status = "Ativo";
    this.itemTurmaAlunoModel.numero = null;
    this.alterando = false;
    this.mensagem = "";
  }

  detalheAluno(event) {
    this.showSpinner = true;

    this.turmaService.detalheAluno(event, this.itemTurmaAlunoModel.turmaId).subscribe(
      f => {
        if (f != null) {
          console.log("detalhe",f);
          this.itemTurmaAlunoModel = f;
          this.alterando = true;
        }
        this.showSpinner = false;
      },
      erro => {
        this.showSpinner = false;
      }
    );
  }

  listarAlunosCadastrados(turmaId) {

    this.alunosCadastrados = [];

    this.alunoService.listarPorTurmaId(turmaId).subscribe(
      r => {
        this.alunosCadastrados = r;
        console.log(this.alunosCadastrados.length);

      },
      erro => {
        console.log(erro);

      }
    );
  }

  detalhe(id) {

    this.showSpinner = true;

    this.turmaService.detalhe(id).subscribe(
      f => {
        if (f != null) {
          console.log(f);
          this.turmaModel = f;
          this.listarAlunosCadastrados(this.turmaModel.turmaId);
        }
        this.showSpinner = false;
      },
      erro => {
        this.showSpinner = false;
      }
    );
  }

  alterarAluno(valueSubmit) {

    this.mensagem = "";

    this.showSpinner = true;

    this.turmaService.alterarAluno(valueSubmit).subscribe(
      u => {
        this.response = u;
        this.responseAlerta(this.response, "/");
        this.showSpinner = false;
        this.listarAlunosCadastrados(this.turmaModel.turmaId);
        this.cancelou();
      },
      erro => {
        console.log(erro);
        this.showSpinner = false;
        this.alterando = false;
        this.mensagem = "";
      }
    );
  }

  salvar(valueSubmit) {

    this.mensagem = "";

    this.showSpinner = true;

    this.turmaService.salvarAluno(valueSubmit).subscribe(
      u => {
        this.response = u;
        this.responseAlerta(this.response, "/");
        this.showSpinner = false;
        this.listarAlunosCadastrados(this.turmaModel.turmaId);
        this.resetar();
      },
      erro => {
        console.log(erro);
        this.showSpinner = false;
        this.cancelou();
      }
    );
  }

  listarAluno() {

    this.showSpinner = true;

    this.alunoService.listarCmb().subscribe(
      r => {
        this.alunoCmbModel = r;
        this.showSpinner = false;
      },
      erro => {
        console.log(erro);
        this.showSpinner = false;
      }
    );
  }




  responseAlerta(response, rota) {
    if (response.success == false && this.response.data.length >= 0) {
      response.data.forEach(item => {
        this.mensagem += item.message;
      });

      alert(this.mensagem);
    } else if (response.success == false && response.data.length <= 0) {
      alert(response.message);
    } else {
      alert(response.message);

    }
    //this.router.navigate([rota]);
  }


}
