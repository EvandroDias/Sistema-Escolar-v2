import { OnInit, Component } from "@angular/core";
import { BaseFormComponent } from "src/app/shared/base-form/base-form.component";

import { Subscription } from "rxjs";
import { DisciplinaService } from "src/app/services/disciplina/disciplina.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { DisciplinaModel } from "src/app/model/disciplina/disciplina.model";
import { CommandResultModel } from "src/app/model/command-result.model";

@Component({
  selector: "app-cadastrar-disciplina-admin",
  templateUrl: "./cadastrar-disciplina-admin.component.html",
  styleUrls: ["./cadastrar-disciplina-admin.component.css"]
})
export class CadastrarDisciplinaAdminComponent extends BaseFormComponent
  implements OnInit {
  disciplinaModel = new DisciplinaModel();
  response = new CommandResultModel();
  inscricao: Subscription;
  mensagem: string = "";
  id: string = null;

  constructor(
    private disciplinaService: DisciplinaService,
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
      this.salvar(this.disciplinaModel);
    }
  }

  salvar(valueSubmit) {
    this.disciplinaService.salvar(valueSubmit).subscribe(
      u => {
        this.response = u;
        this.responseAlerta(this.response, "/disciplina");
      },
      erro => {
        console.log(erro);
      }
    );
  }

  alterar() {
    this.disciplinaService.alterar(this.disciplinaModel).subscribe(
      u => {
        this.response = u;
        this.responseAlerta(this.response, "/disciplina");
      },
      erro => {}
    );
  }

  detalhe() {
    this.disciplinaService.detalhe(this.id).subscribe(
      f => {
        if (f != null) {
          this.disciplinaModel = f;
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
