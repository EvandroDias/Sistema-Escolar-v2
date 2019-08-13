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
import { ConselhoModel } from '../../../model/conselho/conselho.model';
import { BimestreModel } from "src/app/model/bimestre/bimestre.model";
import { ConselhoService } from "src/app/services/conselho/conselho.service";
import { BimestreService } from "src/app/services/bimestre/bimestre.service";
import { AnoModel } from '../../../model/ano/ano.model';
import { AnoService } from "src/app/services/ano/ano.service";



@Component({
  selector: "app-cadastrar-conselho-admin",
  templateUrl: "./cadastrar-conselho-admin.component.html",
  styleUrls: ["./cadastrar-conselho-admin.component.css"]
})
export class CadastrarConselhoAdminComponent extends BaseFormComponent
  implements OnInit {

  conselhoModel = new ConselhoModel();
  funcionarioCmbModel: FuncionarioCmbModel[] = [];
  coordenadorCmbModel: FuncionarioCmbModel[] = [];
  diretorCmbModel: FuncionarioCmbModel[] = [];
  bimestreModel: BimestreModel[] = [];
  alunoCmbModel: AlunoCmbModel[] = [];
  serieCmbModel: SerieCmbModel[] = [];
  anoCmbModel: AnoModel[] = [];
  response = new CommandResultModel();
  mensagem: string = "";
  showSpinner:boolean = false;

  id: string = null;
  inscricao: Subscription;

  constructor(
    private conselhoService: ConselhoService,
    private serieService: SerieService,
    private anoService: AnoService,
    private bimestreService: BimestreService,
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
        this.conselhoModel.dataConselho = this.dataHoje();
      }
    });

    this.formulario = this.formBuilder.group({

      funcionarioId: [null, Validators.required],
      nomeCoordenador: [null, Validators.required],
      nomeDiretor: [null, Validators.required],
      serieId: [null, Validators.required],
      anoId: [null, Validators.required],
      bimestreId: [null, Validators.required],
      dataConselho: [null, Validators.required]
    });


    this.listarDiretor();
    this.listarFuncionario();
    this.listarSerie();
    this.listarBimestre();
    this.listarCoordenador();
    this.listarAno();
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


  listarBimestre() {
    this.bimestreService.listar(true).subscribe(
      r => {
        this.bimestreModel = r;
      },
      erro => {
        console.log(erro);
      }
    );
  }

  submit() {
    let valueSubmit = Object.assign(
      this.conselhoModel,
      this.formulario.value
    );

    if (this.id != null) {
      this.alterar();
    } else {
      this.salvar(this.conselhoModel);
    }
  }

  salvar(valueSubmit) {

    this.showSpinner = true;

    this.conselhoService.salvar(valueSubmit).subscribe(
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

    this.conselhoService.alterar(this.conselhoModel).subscribe(
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

    this.conselhoService.detalhe(this.id).subscribe(
      f => {
        if (f != null) {
          this.conselhoModel = f;

        }
        this.showSpinner = false;
      },
      erro => {
        this.showSpinner = false;
      }
    );
  }
}
