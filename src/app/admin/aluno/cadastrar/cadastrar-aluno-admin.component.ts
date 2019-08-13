import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription, empty } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { BaseFormComponent } from "src/app/shared/base-form/base-form.component";

import { tap, map, switchMap } from "rxjs/operators";

import { MyMaskUtil } from "src/app/shared/directives/my-mask.util";

import { AlunoService } from "src/app/services/aluno/aluno.service";
import { AlunoModel } from "src/app/model/aluno/aluno.model";
import { FuncaoModel } from "src/app/model/funcao/funcao.model";
import { CommandResultModel } from "src/app/model/command-result.model";
import { Uf } from "src/app/model/uf/uf.model";
import { Cidade } from "src/app/model/cidade/cidade.model";
import { ServicosUtilService } from 'src/app/shared/services/servicos-util.services';

@Component({
  selector: "app-cadastrar-admin-aluno",
  templateUrl: "./cadastrar-aluno-admin.component.html",
  styleUrls: ["./cadastrar-aluno-admin.component.css"]
})
export class CadastrarAlunoAdminComponent extends BaseFormComponent
  implements OnInit {
  cep = MyMaskUtil.CEP_MASK_GENERATOR;
  cpf = MyMaskUtil.CPF_MASK_GENERATOR;

  alunoModel = new AlunoModel();
  funcaoModel: FuncaoModel[] = [];
  response = new CommandResultModel();
  mensagem: string = "";

  id: string = null;
  inscricao: Subscription;
  sexos: any[];
  estados: Uf[] = [];
  cidades: Cidade[];
  nacionalidades: any;

  constructor(
    private alunoService: AlunoService,
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
      }
    });

    this.formulario = this.formBuilder.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200)
        ]
      ],
      sobreNome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200)
        ]
      ],
      rm: [null, Validators.required],
      ra: [null],

      nacionalidade: [null, Validators.required],
      dataNascimento: [null],
      sexo: [null, Validators.required],
      natural: [null],
      rua: [null],
      numero: [null],
      bairro: [null],
      racaCor: [null],
      cep: [null],
      uf: [null, Validators.required],
      cidade: [null, Validators.required],
      complemento: [null]
    });

    this.sexos = this.dropdownService.getSexo();

    this.dropdownService.getNascionalidade().subscribe(
      c => {
        this.nacionalidades = c;
      },
      erro => {
        console.log(erro);
      }
    );

    this.dropdownService.getFuncao().subscribe(
      c => {
        this.funcaoModel = c;
      },
      erro => {}
    );

    this.dropdownService.getEstadosBr().subscribe(dados => {
      this.estados = dados;
      console.log(dados);
    });

    this.formulario
      .get("uf")
      .valueChanges.pipe(
        tap(estado => console.log("Novo estado: ", estado)),
        map(estado => this.estados.filter(e => e.sigla === estado)),
        map(estados =>
          estados && estados.length > 0 ? estados[0].id : empty()
        ),
        switchMap((estadoId: number) =>
          this.dropdownService.getCidades(estadoId)
        ),
        tap(console.log)
      )
      .subscribe(cidades => (this.cidades = cidades));
  }

  submit() {
    let valueSubmit = Object.assign(this.alunoModel, this.formulario.value);

    if (this.id != null) {
      this.alterar();
    } else {
      this.salvar(this.alunoModel);
    }
  }

  salvar(valueSubmit) {
    this.alunoModel.gemeos = "Não";

    this.alunoService.salvar(valueSubmit).subscribe(
      u => {
        this.response = u;
        this.responseAlerta(this.response, "/aluno");
      },
      erro => {
        console.log(erro);
      }
    );
  }

  alterar() {
    this.alunoService.alterar(this.alunoModel).subscribe(
      u => {
        this.response = u;
        this.responseAlerta(this.response, "/admin/aluno");
      },
      erro => {}
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
    this.router.navigate([rota]);
  }

  detalhe() {
    this.alunoService.detalhe(this.id).subscribe(
      f => {
        if (f != null) {
          this.alunoModel = f;
          console.log('aluno',f);
        }
      },
      erro => {}
    );
  }
}
