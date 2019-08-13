import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { Subscription } from 'rxjs';
import { SerieService } from 'src/app/services/serie/serie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SerieModel } from 'src/app/model/serie/serie.model';
import { CommandResultModel } from 'src/app/model/command-result.model';

@Component({
  selector: 'app-cadastrar-serie-admin',
  templateUrl: './cadastrar-serie-admin.component.html',
  styleUrls: ['./cadastrar-serie-admin.component.css']
})
export class CadastrarSerieAdminComponent extends BaseFormComponent implements OnInit {

  serieModel  = new SerieModel();
  response = new CommandResultModel();
  inscricao: Subscription;
  mensagem:string = '';
  id: string = null;

  constructor(
    private serieService:SerieService,
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
           this.salvar(this.serieModel);
         }
      }

      salvar(valueSubmit){

        this.serieService.salvar(valueSubmit)
        .subscribe(u=>{

            this.response = u;
            this.responseAlerta(this.response,'/serie')


        },erro=>{
          console.log(erro);

        });

      }

      alterar()
      {
       this.serieService.alterar(this.serieModel)
        .subscribe(u=>{

          this.response = u;
          this.responseAlerta(this.response,'/serie');

        },erro=>{

        });
      }

      detalhe(){
        this.serieService.detalhe(this.id)
          .subscribe(f=>{

          if(f != null){
            this.serieModel = f

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
