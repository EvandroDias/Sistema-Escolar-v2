import { Component, OnInit } from "@angular/core";
import { BaseFormComponent } from "src/app/shared/base-form/base-form.component";
import { Subscription } from "rxjs";
import { DepartamentoService } from "src/app/services/departamento/departamento.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { DepartamentoModel } from "src/app/model/departamento/departamento.model";
import { CommandResultModel } from "src/app/model/command-result.model";

@Component({
  selector: "app-cadastrar-departamento-admin",
  templateUrl: "./cadastrar-departamento-admin.component.html",
  styleUrls: ["./cadastrar-departamento-admin.component.css"]
})
export class CadastrarDepartamentoAdminComponent extends BaseFormComponent
  implements OnInit {
  departamentoModel = new DepartamentoModel();
  response = new CommandResultModel();
  inscricao: Subscription;
  mensagem: string = "";
  id: string = null;

  constructor(
    private departamentoService: DepartamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
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
      ]
    });
  }

  submit() {
    if (this.id != null) {
      this.alterar();
    } else {
      this.salvar(this.departamentoModel);
    }
  }

  salvar(valueSubmit) {
    this.departamentoService.salvar(valueSubmit).subscribe(
      u => {
        this.response = u;
        this.responseAlerta(this.response, "/departamento");
      },
      erro => {
        console.log(erro);
      }
    );
  }

  alterar() {
    this.departamentoService.alterar(this.departamentoModel).subscribe(
      u => {
        this.response = u;
        this.responseAlerta(this.response, "/departamento");
      },
      erro => {}
    );
  }

  detalhe() {
    this.departamentoService.detalhe(this.id).subscribe(
      f => {
        if (f != null) {
          this.departamentoModel = f;
        }
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
}
