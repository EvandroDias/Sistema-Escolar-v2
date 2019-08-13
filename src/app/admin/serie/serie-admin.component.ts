import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SerieService } from 'src/app/services/serie/serie.service';
import { SerieModel } from 'src/app/model/serie/serie.model';
import { DadosModel } from 'src/app/model/dados-model';
import { AtivarDesativarModel } from 'src/app/Model/ativar-desativar.model';
import { CommandResultModel } from 'src/app/model/command-result.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UtilitarioService } from 'src/app/services/utilitario/utilitario.service';



@Component({
  selector: 'app-serie-admin',
  templateUrl: './serie-admin.component.html',
  styleUrls: ['./serie-admin.component.css']
})
export class SerieAdminComponent implements OnInit {

  serieModel: SerieModel[] = [];
  _serieModel: any[];
  dadosModel = new DadosModel();
  ativarDesativarModel = new AtivarDesativarModel();
  response = new CommandResultModel();


  constructor(
    private serieService:SerieService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private utilitarioService: UtilitarioService
  ) { }

  ngOnInit() {
    this.listarTodos();
  }

  listarTodos(){

    this.dadosModel.showSpinner = true;

    this.serieService.listarTodos(this.dadosModel.status,this.dadosModel.skip,this.dadosModel.take)
    .subscribe(u=>{

       if (u.length > 0) {

            u.forEach(item => {

            this.serieModel.push(item);

            });

            this._serieModel = this.serieModel.slice(0, 5);

          }

          this.dadosModel.showSpinner = false;

    },erro=>{
      console.log(erro);
      this.dadosModel.showSpinner = false;
    });
  }


 paginate(event) {
    this._serieModel = [];

    this.dadosModel.pagina = event.page;
    this.dadosModel.qtdPagina = event.rows;

    this._serieModel = this.serieModel.slice(
      event.first,
      event.first + event.rows
    );

    if (event.page + 1 == event.pageCount) {
      this.dadosModel.skip += this.dadosModel.take;
      this.dadosModel.take = this.dadosModel.take;
      this.listarTodos();
    }
  }

  alterou(event) {
    this.dadosModel.status = event;
    this.dadosModel.skip = 0;
    this.dadosModel.take = 50;
    this._serieModel = [];
    this.serieModel = [];

    this.listarTodos();
  }



  obter() {
    if (
      this.serieModel.length === 0 ||
      this.dadosModel.filtro === undefined ||
      this.dadosModel.filtro.trim() === ""
    ) {
      return this.serieModel;
    }

    return this.serieModel.filter(v =>
      v.nome
        .toLocaleLowerCase()
        .includes(this.dadosModel.filtro.toLocaleLowerCase())
    );
  }

  confirm(id: string, status: boolean) {
    var mensagem: string = "";

    if (status) {
      mensagem = "Deseja reamente desativar essa série?";
    } else {
      mensagem = "Deseja reamente ativar essa série?";
    }

    this.confirmationService.confirm({
      message: mensagem,
      accept: () => {
        this.ativarDesativar(id, status);
      }
    });
  }



  ativarDesativar(id, status) {
    this.ativarDesativarModel.id = id;

    this.serieService
      .ativarDesativar(this.ativarDesativarModel)
      .subscribe(
        u => {
          this.response = this.utilitarioService.responseAlerta(u);
          let tipo = this.response.success == true ? "success" : "error";

          this.showToast("f", tipo, "Série", this.response.message);

          setTimeout(() => {
            this._serieModel = [];
            this.serieModel = [];
            this.listarTodos();
          }, 1000);
        },
        erro => {}
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








}
