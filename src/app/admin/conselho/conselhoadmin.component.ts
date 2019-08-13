import { Component, OnInit } from "@angular/core";
import { ConselhoModel } from '../../model/conselho/conselho.model';
import { ConselhoService } from '../../services/conselho/conselho.service';
import { FiltroConselhoModel } from '../../model/conselho/filtro-conselho.model';



@Component({
  selector: "app-conselho-admin",
  templateUrl: "./conselho-admin.component.html",
  styleUrls: ["./conselho-admin.component.css"]
})
export class ConselhoAdminComponent implements OnInit {

  conselhoModel: ConselhoModel[] = [];
  _conselhoModel: ConselhoModel[] = [];
  filtroConselhoModel = new FiltroConselhoModel();
  showSpinner:boolean = false;

  //ativarDesativarModel = new AtivarDesativarAlunoModel();

  filtro: string;
  skip: number = 0;
  take: number = 50;
  pagina: number = 0;
  qtdPagina: number = 5;

  constructor(
    private conselhoService: ConselhoService,

  ) { }

  ngOnInit() {
    this.listarTodos();
  }

  imprimir(conselhoId) {

    this.showSpinner = true;

    this.filtroConselhoModel.conselhoId = conselhoId;
    this.conselhoService.imprimir(this.filtroConselhoModel)
      .subscribe(r => {

        var fileURL = URL.createObjectURL(r);
        window.open(fileURL);
        this.showSpinner = false;
      }, erro => {
        this.showSpinner = false;
      });
  }

  paginate(event) {
    this._conselhoModel = [];

    this.pagina = event.page;
    this.qtdPagina = event.rows;

    this._conselhoModel = this.conselhoModel.slice(
      event.first,
      event.first + event.rows
    );

    if (event.page + 1 == event.pageCount) {
      this.skip += this.take;
      this.take = this.take;
      this.listarTodos();
    }
  }

  listarTodos() {

    this.showSpinner = true;

    this.conselhoService.listarTodos(this.skip, this.take).subscribe(
      u => {

        if (u.length > 0) {

          u.forEach(item => {
            this.conselhoModel.push(item);
          });

          this._conselhoModel = this.conselhoModel.slice(0, 5);

        }
        this.showSpinner = false;
      },
      erro => {
        console.log(erro);
        this.showSpinner = false;
      }
    );
  }

  popularConselho(pagina, qtdPorPagina) {
    this._conselhoModel = [];

    for (
      let i = pagina * qtdPorPagina;
      i < pagina * qtdPorPagina + qtdPorPagina;
      i++
    ) {
      if (this.conselhoModel.length == 0) {
        break;
      }

      var o = this.conselhoModel[i];

      if (o != null) {
        this._conselhoModel.push(o);
      }
    }

    if (this.filtro === undefined || this.filtro.trim() === "") {
      return this._conselhoModel;
    }

    return this.conselhoModel.filter(v =>
      v.nomeAluno.toLocaleLowerCase().includes(this.filtro.toLocaleLowerCase())
    );
  }
}
