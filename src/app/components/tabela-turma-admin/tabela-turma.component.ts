import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabela-turma',
  templateUrl: './tabela-turma.component.html',
  styleUrls: ['./tabela-turma.component.css']
})
export class TabelaTurmaComponent implements OnInit {

  pagina: number = 0;
  qtdPorPagina: number = 5;
  filtro: string;

  constructor() {

  }

  @Input() listarTurmaModel: any = [];
  _listarTurmaModel: any = [];
  cont: number = 0;
  ativar: boolean = false;

  ngOnInit() {

    if (this.cont != 0) {
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

    this._listarTurmaModel = [];

    for (let i = (this.pagina * this.qtdPorPagina); i < (this.pagina * this.qtdPorPagina + this.qtdPorPagina); i++) {
      if (i >= this.listarTurmaModel.length) {
        break;
      }
      this._listarTurmaModel.push(this.listarTurmaModel[i]);
    }

    if (this.filtro === undefined
      || this.filtro.trim() === '') {
      return this._listarTurmaModel;
    }

    return this.listarTurmaModel.filter(
      v => v.nomeAluno.toLocaleLowerCase().includes(this.filtro.toLocaleLowerCase())
    );


  }

  obterOcorrencia() {

    if (this.listarTurmaModel.length === 0 || this.filtro === undefined
      || this.filtro.trim() === '') {
      return this.listarTurmaModel;
    }

    return this.listarTurmaModel.filter(
      v => v.nome.toLocaleLowerCase().includes(this.filtro.toLocaleLowerCase())
    );
  }

}
