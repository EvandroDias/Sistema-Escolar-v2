import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { BaseFormComponent } from "src/app/shared/base-form/base-form.component";

import { FuncionarioCmbModel } from "src/app/model/funcionario/funcionario-cmb.model";

import { AlunoCmbModel } from "src/app/model/aluno/aluno-cmb.model";
import { SerieCmbModel } from "src/app/model/serie/serie-cmb.model";
import { CommandResultModel } from "src/app/model/command-result.model";

import { SerieService } from "src/app/services/serie/serie.service";

import { FuncionarioService } from "src/app/services/funcionario/funcionario.service";
import { ServicosUtilService } from 'src/app/shared/services/servicos-util.services';
import { TurmaModel } from '../../../model/turma/turma.model';
import { BimestreModel } from "src/app/model/bimestre/bimestre.model";
import { TurmaService } from "src/app/services/turma/turma.service";
import { AnoModel } from '../../../model/ano/ano.model';
import { AnoService } from "src/app/services/ano/ano.service";
import { DepartamentoModel } from 'src/app/model/departamento/departamento.model';
import { EscolaService } from '../../../services/escola/escola.service';
import { EscolaModel } from '../../../model/escola/escola.model';
import { DepartamentoService } from "src/app/services/departamento/departamento.service";



@Component({
  selector: "app-cadastrar-turma-admin",
  templateUrl: "./cadastrar-turma-admin.component.html",
  styleUrls: ["./cadastrar-turma-admin.component.css"]
})
export class CadastrarTurmaAdminComponent extends BaseFormComponent
  implements OnInit {

  turmaModel = new TurmaModel();
  funcionarioCmbModel: FuncionarioCmbModel[] = [];
  coordenadorCmbModel: FuncionarioCmbModel[] = [];
  diretorCmbModel: FuncionarioCmbModel[] = [];
  bimestreModel: BimestreModel[] = [];
  alunoCmbModel: AlunoCmbModel[] = [];
  serieCmbModel: SerieCmbModel[] = [];
  departamentoCmbModel: DepartamentoModel[] = [];
  anoCmbModel: AnoModel[] = [];
  escolaCmbModel: EscolaModel[] = [];
  response = new CommandResultModel();
  mensagem: string = "";
  showSpinner:boolean = false;
  periodos: any[] = [];
  ensinos: any[] = [];
  id: string = null;
  inscricao: Subscription;

  constructor(
    private turmaService: TurmaService,
    private escolaService: EscolaService,
    private departamentoService: DepartamentoService,
    private serieService: SerieService,
    private anoService: AnoService,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dropdownService: ServicosUtilService
  ) {
    super();
  }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe((params: any) => {
      this.id = params["id"];

      if (this.id != null) {
        this.detalhe();
      } else {
        //this.turmaModel.dataTurma = this.dataHoje();
      }
    });

    this.formulario = this.formBuilder.group({

      funcionarioId: [null, Validators.required],
      departamentoId: [null, Validators.required],
      nomeCoordenador: [null, Validators.required],
      nomeDiretor: [null, Validators.required],
      serieId: [null, Validators.required],
      anoId: [null, Validators.required],
      periodo: [null, Validators.required],
      ensino: [null, Validators.required],
      escolaId: [null, Validators.required],
      qtdAulas1Bimestre: [null, Validators.required],
      qtdAulas2Bimestre: [null, Validators.required],
      qtdAulas3Bimestre: [null, Validators.required],
      qtdAulas4Bimestre: [null, Validators.required],
    });


    this.listarDiretor();
    this.listarFuncionario();
    this.listarSerie();
    this.listarCoordenador();
    this.listarDepartamento();
    this.listarAno();
    this.listarEscola();
    this.periodos = this.dropdownService.getPeriodo();
    this.ensinos = this.dropdownService.getEnsino();
  }

  dataHoje() {
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    return [dia, mes, ano].join("/");
  }

  listarAno() {
    this.anoService.listar(true).subscribe(
      r => {
        this.anoCmbModel = r;
      },
      erro => {
        console.log(erro);
      }
    );
  }
  listarDepartamento() {
    this.departamentoService.listar().subscribe(
      r => {
        this.departamentoCmbModel = r;
      },
      erro => {
        console.log(erro);
      }
    );
  }
  listarEscola() {
    this.escolaService.listarTodos().subscribe(
      r => {
        this.escolaCmbModel = r;
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

  listarDiretor() {
    this.funcionarioService.listarFuncao("Diretor(a)").subscribe(
      r => {
        this.diretorCmbModel = r;
      },
      erro => {
        console.log(erro);
      }
    );
  }

  listarCoordenador() {
    this.funcionarioService.listarFuncao("Coordenador(a)").subscribe(
      r => {
        this.coordenadorCmbModel = r;
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


  submit() {
    let valueSubmit = Object.assign(
      this.turmaModel,
      this.formulario.value
    );

    if (this.id != null) {
      this.alterar();
    } else {
      this.salvar(this.turmaModel);
    }
  }

  salvar(valueSubmit) {

    console.log(valueSubmit);


    this.showSpinner = true;

    this.turmaService.salvar(valueSubmit).subscribe(
      u => {
        this.response = u;
        this.responseAlerta(this.response, "/");
        this.showSpinner = false;
      },
      erro => {
        console.log(erro);
        this.showSpinner = false;
      }
    );
  }

  alterar() {

    this.showSpinner = true;

    this.turmaService.alterar(this.turmaModel).subscribe(
      u => {
        this.response = u;
        this.responseAlerta(this.response, "/");
        this.showSpinner = false;
      },
      erro => {
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

  detalhe() {

    this.showSpinner = true;

    this.turmaService.detalhe(this.id).subscribe(
      f => {
        if (f != null) {
          this.turmaModel = f;

        }
        this.showSpinner = false;
      },
      erro => {
        this.showSpinner = false;
      }
    );
  }
}
