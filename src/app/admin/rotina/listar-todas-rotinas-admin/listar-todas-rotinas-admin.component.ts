import { Component, OnInit } from "@angular/core";
import { RotinaService } from "src/app/services/rotina/rotina.service";
import { HorarioRotinaService } from "src/app/services/horario-rotina/horario-rotina.service";
import { ListarRotinaModel } from "src/app/model/rotina/listar-rotina.model";
import { ImprimirRotinaModel } from "src/app/model/rotina/imprimir-rotina.model";

@Component({
  selector: "app-listar-todas-rotinas-admin",
  templateUrl: "./listar-todas-rotinas-admin.component.html",
  styleUrls: ["./listar-todas-rotinas-admin.component.css"]
})
export class ListarTodasRotinasAdminComponent implements OnInit {
  rotinasModel: ListarRotinaModel[] = [];
  horarioRotinaModel: any;
  index: boolean = false;
  showSpinner: boolean = false;
  imprimirRotinaModel = new ImprimirRotinaModel();
  msgs = [];

  constructor(
    private rotinaService: RotinaService,
    private horarioRotinaService: HorarioRotinaService
  ) {}

  ngOnInit() {
    this.listarTodas();
  }

  listarTodas() {
    this.rotinaService.listarTodos(0, 100).subscribe(
      r => {
        console.log(r);
        this.rotinasModel = r;
      },
      erro => {
        console.log(erro);
      }
    );
  }

  imprimir(rotinaId) {
    this.imprimirRotinaModel.rotinaId = rotinaId;

    this.rotinaService.imprimir(this.imprimirRotinaModel).subscribe(
      u => {
        //this.response = u;
        console.log(u);

        var fileURL = URL.createObjectURL(u);
        window.open(fileURL);

        //this.responseAlerta(this.response, "/");
      },
      erro => {
        console.log(erro);
      }
    );
  }

  listarHorario(rotinaId) {
    this.msgs = [];
    this.horarioRotinaModel = [];

    this.horarioRotinaService.listarTodos(rotinaId).subscribe(
      r => {

        this.horarioRotinaModel = r;

       console.log(r);




        if (r == null) {
          this.show("error", "", "Nenhuma rotina foi encontrada!!");
        }
      },
      erro => {}
    );
  }

  trocou(event){
    console.log('trocou',event);

  }

  openPrev(id,event) {

    console.log(event.index);

   this.index = !this.index;

    console.log(this.index);

    //if (this.index) {
      console.log('passou');

      this.showSpinner = true;

      setTimeout(() => {
        this.showSpinner = false;
      }, 1000);

      this.listarHorario(id);
  //  }

    console.log(this.index);
  }

  show(severity, summary, detail) {
    this.msgs.push({ severity: severity, summary: summary, detail: detail });
  }

  hide() {
    this.msgs = [];
  }
}
