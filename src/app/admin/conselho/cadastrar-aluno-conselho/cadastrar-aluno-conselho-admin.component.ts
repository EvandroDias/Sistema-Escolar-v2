import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { BaseFormComponent } from "src/app/shared/base-form/base-form.component";

import { AlunoCmbModel } from "src/app/model/aluno/aluno-cmb.model";

import { CommandResultModel } from "src/app/model/command-result.model";

import { AlunoService } from "src/app/services/aluno/aluno.service";
import { AlunoConselhoModel } from "src/app/model/conselho/aluno-conselho.model";
import { AlunoConselhoService } from "src/app/services/aluno-conselho/aluno-conselho.service";
import { UtilitarioService } from "src/app/services/utilitario/utilitario.service";
import { MessageService } from "primeng/api";


@Component({
  selector: "app-cadastrar-aluno-conselho-admin",
  templateUrl: "./cadastrar-aluno-conselho-admin.component.html",
  styleUrls: ["./cadastrar-aluno-conselho-admin.component.css"]
})
export class CadastrarAlunoConselhoAdminComponent extends BaseFormComponent implements OnInit {

  alunoConselhoModel = new AlunoConselhoModel();
  alunosConselhoModel: AlunoConselhoModel[] = [];
  alunoCmbModel: AlunoCmbModel[] = [];
  response = new CommandResultModel();
  mensagem = "";

  id: string = null;
  serieId: string = null;
  inscricao: Subscription;
  showSpinner = false;

  constructor(
    private alunoConselhoService: AlunoConselhoService,
    private alunoService: AlunoService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private utilitarioService: UtilitarioService,
    private messageService: MessageService,

  ) {
    super();
  }

  ngOnInit() {

    this.inscricao = this.route.params.subscribe((params: any) => {
      this.id = params["id"];
      this.serieId = params["serieId"];
      console.log('serieId', this.serieId);

      this.listarAlunos();
      this.listarAluno(this.serieId);
      //if (this.id != null) {
      // this.detalhe();
      //} else {
      //  this.conselhoModel.dataConselho = this.dataHoje();
      // }
    });

    this.formulario = this.formBuilder.group({

      alunoId: [null, Validators.required],
      conselhoId: [null, Validators.required],
      descricao: [null, Validators.required],

    });


  }

  resetar() {
    this.alunoConselhoModel.alunoConselhoId = null;
  }


  listarAluno(id) {

    this.showSpinner = true;

    this.alunoService.listarPorSerieId(id).subscribe(
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

  submit() {

    // let valueSubmit = Object.assign(this.alunoConselhoModel, this.formulario.value);

    if (this.alunoConselhoModel.alunoConselhoId != null) {
      this.alterar();
    } else {
      this.salvar(this.alunoConselhoModel);
    }


  }

  listarAlunos() {
    this.alunoConselhoService.listarTodos(this.id).subscribe(
      r => {
        this.alunosConselhoModel = r;
      },
      erro => {
        console.log(erro);
      }
    );
  }

  salvar(valueSubmit) {


    valueSubmit.conselhoId = this.id;

    this.alunoConselhoService.salvar(valueSubmit).subscribe(
      u => {

        this.response = this.utilitarioService.responseAlerta(u);
        let tipo = this.response.success == true ? "success" : "error";

        this.showToast("f", tipo, "Aluno", this.response.message);

       // this.response = u;
      //  this.responseAlerta(this.response, "/");

        if (this.response.success) {
          this.listarAlunos();
          this.alunoConselhoModel.alunoConselhoId = null;
          this.alunoConselhoModel.descricao = "";
        }
      },
      erro => {
        console.log(erro);
      }
    );
  }

  alterar() {

    console.log('alterar', this.alunoConselhoModel);

    this.alunoConselhoService.alterar(this.alunoConselhoModel).subscribe(
      u => {
        //this.response = u;
        //this.responseAlerta(this.response, "/");
        this.response = this.utilitarioService.responseAlerta(u);
        let tipo = this.response.success == true ? "success" : "error";

        this.showToast("f", tipo, "Aluno", this.response.message);

        if (this.response.success) {
          this.listarAlunos();
          this.alunoConselhoModel.descricao = "";
          this.alunoConselhoModel.alunoConselhoId = null;
        }

      },
      erro => { }
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

  responseAlerta(response, rota) {
    if (response.success == false && this.response.data.length >= 0) {

      response.data.forEach(item => {
        this.mensagem += item.message;

      });

      alert(this.mensagem);
    }
    else if (response.success == false && response.data.length <= 0) {
      alert(response.message);
    } else {
      alert(response.message);
    }
    //this.router.navigate([rota]);
  }

  detalhe(id) {
    this.alunoConselhoService.detalhe(id).subscribe(
      f => {
        if (f != null) {
          this.alunoConselhoModel = f;
          console.log(f);
        }
      },
      erro => { }
    );
  }
}
