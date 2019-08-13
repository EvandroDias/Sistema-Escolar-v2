import { Component, OnInit } from '@angular/core';
import { TurmaService } from '../../services/turma/turma.service';
import { TurmaModel } from '../../model/turma/turma.model';
import { DadosModel } from '../../model/dados-model';

@Component({
  selector: 'app-turma-admin',
  templateUrl: './turma-admin.component.html',
  styleUrls: ['./turma-admin.component.css']
})
export class TurmaAdminComponent implements OnInit {

  turmaModel: TurmaModel[] = [];
  _turmaModel: any[];
  dadosModel = new DadosModel();

  constructor(
    private turmaService: TurmaService,
  ) { }

  ngOnInit() {
   this.listarTodos();
  }

  paginate(event) {
    this._turmaModel = [];

    this.dadosModel.pagina = event.page;
    this.dadosModel.qtdPagina = event.rows;

    this._turmaModel = this.turmaModel.slice(
      event.first,
      event.first + event.rows
    );

    if (event.page + 1 == event.pageCount) {
      this.dadosModel.skip += this.dadosModel.take;
      this.dadosModel.take = this.dadosModel.take;
      this.listarTodos();
    }
  }

  listarTodos() {
    this.dadosModel.showSpinner = true;

    this.turmaService
      .listarTodos(this.dadosModel.status, this.dadosModel.skip, this.dadosModel.take)
      .subscribe(
        u => {
          if (u != null) {
            if (u.length > 0) {
              u.forEach(item => {
                this.turmaModel.push(item);
              });

              this._turmaModel = this.turmaModel.slice(0, 5);

              console.log(this.turmaModel);

            }
          }

          this.dadosModel.showSpinner = false;
        },
        erro => {
          console.log(erro);
          this.dadosModel.showSpinner = false;
        }
      );
  }

}
