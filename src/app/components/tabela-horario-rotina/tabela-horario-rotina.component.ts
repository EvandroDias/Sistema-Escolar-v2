import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabela-horario-rotina',
  templateUrl: './tabela-horario-rotina.component.html',
  styleUrls: ['./tabela-horario-rotina.component.css']
})
export class TabelaHorarioRotinaComponent implements OnInit {

  pagina: number = 0;
  qtdPorPagina: number = 5;
  filtro: string;

  constructor() {

   }

  @Input() listarHorarioRotinaModel:any = [];
  _listarHorarioRotinaModel:any = [];
  cont:number = 0;
  ativar:boolean = false;

  ngOnInit() {

    if(this.cont != 0){
      this.pagina = 0;
      this.qtdPorPagina = 5;
      this.ativar = true;
      this.popularOcorrencia();
    }

    this.cont++;
    console.log(this.cont);


  }

  paginar($event: any) {
    this.pagina = $event - 1;
		this.popularOcorrencia();
}

popularOcorrencia() {

  this._listarHorarioRotinaModel = [];

  for (let i = ( this.pagina * this.qtdPorPagina ); i < (this.pagina * this.qtdPorPagina + this.qtdPorPagina); i++) {
    if (i >= this.listarHorarioRotinaModel.length) {
      break;
    }
    this._listarHorarioRotinaModel.push(this.listarHorarioRotinaModel[i]);
  }

  if (this.filtro === undefined
    || this.filtro.trim() === ''){
       return this._listarHorarioRotinaModel;
    }

    return this.listarHorarioRotinaModel.filter(
       v => v.nomeAluno.toLocaleLowerCase().includes(this.filtro.toLocaleLowerCase())
    );


}

obterOcorrencia(){

  if (this.listarHorarioRotinaModel.length === 0 || this.filtro === undefined
  || this.filtro.trim() === ''){
    return this.listarHorarioRotinaModel;
  }

  return this.listarHorarioRotinaModel.filter(
     v => v.nome.toLocaleLowerCase().includes(this.filtro.toLocaleLowerCase())
  );
}

}
