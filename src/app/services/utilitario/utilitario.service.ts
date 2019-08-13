import { Injectable } from '@angular/core';
import { CommandResultModel } from 'src/app/model/command-result.model';


@Injectable({
  providedIn: 'root'
})
export class UtilitarioService {

  msgs = [];
  mensagem:string = "";

  constructor(

  ) { }

  responseAlerta(response:CommandResultModel) {

    var r = new CommandResultModel();
    this.mensagem = "";

    if(response.success){
      this.mensagem += response.message;
    }
    else if (response.success == false && response.data.length > 0) {

        response.data.forEach(item => {
        this.mensagem += item.message;
      });

      //this.showToast("success",this.titulo, this.mensagem);

    } else if (response.success == false && response.data.length <= 0) {
      this.mensagem += response.message;
      //this.showToast("error", this.titulo, this.response.message);

    }
    else if (response.success == false) {
      console.log('passou');

      this.mensagem += response.message;
      //this.showToast("error", this.titulo, this.response.message);

    }

  r.success = response.success;
  r.message = this.mensagem;

    return r;

    }



  obterDataAtual(adcionar:number) {

    let ano = 0;
    let mes = 0;
    let dia = 0;

    const date = new Date();

      ano = date.getFullYear();
      mes = date.getMonth();
      dia = date.getDate();

     mes = mes + adcionar;

     console.log(mes);


    let mesValor = '';
    let diaValor = '';

    mesValor = ((mes < 10) ? '0' : '').concat(mes.toString())
    diaValor = ((dia < 10) ? '0' : '').concat(dia.toString())

    return ano.toString().concat('-').concat(mesValor).concat('-').concat(diaValor);
}

show(severity,summary,detail) {
  return this.msgs = [{severity:severity, summary:summary, detail:detail}];
}

hide() {
  return this.msgs = [];
}

}
