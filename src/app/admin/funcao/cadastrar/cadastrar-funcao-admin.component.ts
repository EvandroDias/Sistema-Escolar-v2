import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { FuncaoService } from 'src/app/services/funcao/funcao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FuncaoModel } from 'src/app/model/funcao/funcao.model';
import { CommandResultModel } from 'src/app/model/command-result.model';

@Component({
  selector: 'app-cadastrar-funcao-admin',
  templateUrl: './cadastrar-funcao-admin.component.html',
  styleUrls: ['./cadastrar-funcao-admin.component.css']
})
export class CadastrarFuncaoAdminComponent extends BaseFormComponent implements OnInit {

  funcaoModel  = new FuncaoModel();
  response = new CommandResultModel();
  inscricao: Subscription;
  mensagem:string = '';
  id: string = null;

  constructor(
    private funcaoService:FuncaoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {super() }

  ngOnInit() {

    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        if(this.id != null){
           this.detalhe();
        }

      }
    );

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],

  });
  }

  submit() {

         if(this.id != null){
            this.alterar();
         }else{
           this.salvar(this.funcaoModel);
         }
      }

      salvar(valueSubmit){

        this.funcaoService.salvar(valueSubmit)
        .subscribe(u=>{

            this.response = u;
            this.responseAlerta(this.response,'/funcao')


        },erro=>{
          console.log(erro);

        });

      }

      alterar()
      {
       this.funcaoService.alterar(this.funcaoModel)
        .subscribe(u=>{

          this.response = u;
          this.responseAlerta(this.response,'/funcao');

        },erro=>{

        })
      }

      detalhe(){
        this.funcaoService.detalhe(this.id)
          .subscribe(f=>{

          if(f != null){
            this.funcaoModel = f

           }


        },erro=>{

        });
      }

      responseAlerta(response,rota){
        if(response.success == false && this.response.data.length >= 0){

           response.data.forEach(item=>{
           this.mensagem += item.message;

          });

          alert(this.mensagem);
        }
        else if(response.success == false && response.data.length <= 0){
          alert(response.message);
        }else{
          alert(response.message);
        }
        this.router.navigate([rota]);
      }

}
