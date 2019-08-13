import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';


import { TipoOcorrenciaService } from 'src/app/services/tipoOcorrencia/tipo-ocorrencia.service';
import { TipoOcorrenciaCmbModel } from 'src/app/model/tipo-ocorrencia/tipo-ocorrencia.model';
import { CommandResultModel } from 'src/app/model/command-result.model';
import { Location } from '@angular/common';



@Component({
  selector: 'app-cadastrar-tipo-ocorrencia-admin',
  templateUrl: './cadastrar-tipo-ocorrencia-admin.component.html',
  styleUrls: ['./cadastrar-tipo-ocorrencia-admin.component.css'],

})
export class CadastrarTipoOcorrenciaAdminComponent extends BaseFormComponent implements OnInit {

  tipoOcorrenciaModel = new TipoOcorrenciaCmbModel();
  response = new CommandResultModel();
  inscricao: Subscription;
  mensagem: string = '';
  id: string = null;

  constructor(
    private tipoOcorrenciaService: TipoOcorrenciaService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location
  ) { super() }

  ngOnInit() {

    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        if (this.id != null) {
          this.detalhe();
        }

      }
    );

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],

    });
  }

  voltar(){
    this.location.back();
  }

  submit() {

    if (this.id != null) {
      this.alterar();
    } else {
      this.salvar(this.tipoOcorrenciaModel);
    }
  }

  salvar(valueSubmit) {

    this.tipoOcorrenciaService.salvar(valueSubmit)
      .subscribe(u => {

        this.response = u;
        this.responseAlerta(this.response, '/tipo-ocorrencia')


      }, erro => {
        console.log(erro);

      });

  }

  alterar() {
    this.tipoOcorrenciaService.alterar(this.tipoOcorrenciaModel)
      .subscribe(u => {

        this.response = u;
        this.responseAlerta(this.response, '/tipo-ocorrencia');

      }, erro => {

      })
  }

  detalhe() {
    this.tipoOcorrenciaService.detalhe(this.id)
      .subscribe(f => {

        if (f != null) {
          this.tipoOcorrenciaModel = f

        }


      }, erro => {

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
    this.router.navigate([rota]);
  }


}
