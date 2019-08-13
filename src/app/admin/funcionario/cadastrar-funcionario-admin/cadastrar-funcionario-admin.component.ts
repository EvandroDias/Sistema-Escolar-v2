import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription, empty } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { BaseFormComponent } from "src/app/shared/base-form/base-form.component";

import { tap, map, switchMap } from "rxjs/operators";

import { FuncionarioService } from "src/app/services/funcionario/funcionario.service";
import { FuncionarioModel } from "src/app/model/funcionario/funcionario.model";
import { FuncaoModel } from "src/app/model/funcao/funcao.model";
import { CommandResultModel } from "src/app/model/command-result.model";
import { Cidade } from "src/app/model/cidade/cidade.model";
import { Uf } from "src/app/model/uf/uf.model";
import { ServicosUtilService } from "src/app/shared/services/servicos-util.services";
import { FormValidations } from "./../../../shared/form-validations";
import { MyMaskUtil } from "src/app/shared/directives/my-mask.util";
import { Location } from '@angular/common';

@Component({
  selector: "app-cadastrar-funcionario-admin",
  templateUrl: "./cadastrar-funcionario-admin.component.html",
  styleUrls: ["./cadastrar-funcionario-admin.component.css"]
})
export class CadastrarFuncionarioAdminComponent extends BaseFormComponent
  implements OnInit {
  celular = MyMaskUtil.PHONE_MASK_GENERATOR_BIG;
  telefone = MyMaskUtil.PHONE_MASK_GENERATOR;
  cep = MyMaskUtil.CEP_MASK_GENERATOR;
  cpf = MyMaskUtil.CPF_MASK_GENERATOR;

  registrarModel = new FuncionarioModel();
  funcaoModel: FuncaoModel[] = [];
  tipoUsuarioModel: any[];
  response = new CommandResultModel();
  mensagem: string = "";
  showSpinner: boolean = false;

  id: string = null;
  inscricao: Subscription;
  sexos: any[];
  estados: Uf[] = [];
  cidades: Cidade[];
  nacionalidades: any;

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dropdownService: ServicosUtilService,
    private location: Location
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
      rg: [null, Validators.required],
      cpf: [
        null,
        [
          Validators.required,
          Validators.maxLength(14),
          Validators.min(14),
          FormValidations.cpfValido
        ]
      ],
      telefoneFixo: [null],
      celular: [
        null,
        [Validators.required, Validators.maxLength(15), Validators.min(15)]
      ],
      nacionalidade: [null, Validators.required],
      dataNascimento: [null],
      sexo: [null, Validators.required],
      natural: [null],
      rua: [null],
      numero: [null],
      bairro: [null],
      funcao: [null, Validators.required],
      cep: [null],
      uf: [null, Validators.required],
      cidade: [null, Validators.required],
      tipoUsuario: [null, Validators.required],
      complemento: [null],
      email: [null, [Validators.required, Validators.email]]
    });

    this.sexos = this.dropdownService.getSexo();

    this.tipoUsuarioModel = this.dropdownService.getTipoUsuario();

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
      erro => { }
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
    let valueSubmit = Object.assign(this.registrarModel, this.formulario.value);

    if (this.id != null) {
      this.alterar();
    } else {
      this.salvar(this.registrarModel);
    }
  }

  salvar(valueSubmit) {
    this.funcionarioService.salvar(valueSubmit).subscribe(
      u => {
        this.response = u;

        if (this.response.success) {
          this.formulario.reset();
        }
        this.responseAlerta(this.response, null);
      },
      erro => {
        console.log(erro);
      }
    );
  }

  alterar() {
    this.funcionarioService.alterar(this.registrarModel).subscribe(
      u => {
        this.response = u;

        if (this.response.success) {
          this.location.back();
        }
        this.responseAlerta(this.response, null);
      },
      erro => { }
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

    if (rota != null)
      this.router.navigate([rota]);
  }

  detalhe() {
    this.showSpinner = true;

    this.funcionarioService.detalhe(this.id).subscribe(
      f => {
        if (f != null) {
          this.registrarModel = f;
          console.log(f);
        }

        this.showSpinner = false;
      },
      erro => {
        this.showSpinner = false;
      }
    );
  }
}
