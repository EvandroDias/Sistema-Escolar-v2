import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OcorrenciaModel } from "src/app/model/ocorrencia/ocorrencia.model";

@Component({
  selector: "app-tabela-ocorrencia",
  templateUrl: "./tabela-ocorrencia.component.html",
  styleUrls: ["./tabela-ocorrencia.component.css"]
})
export class TabelaOcorrenciaComponent implements OnInit {

  f: string;
  @Input() mostrar:boolean = false;

  constructor() {}

  @Input() ocorrenciaModel: OcorrenciaModel[] = [];
  @Output() excluir = new EventEmitter();

  ngOnInit() {
    this.obterOcorrencia();
  }

Desativar(id){
  this.excluir.emit(id);
}

  obterOcorrencia() {
    if (
      this.ocorrenciaModel.length === 0 ||
      this.f === undefined ||
      this.f.trim() === ""
    ) {
      return this.ocorrenciaModel;
    }

    return this.ocorrenciaModel.filter(v =>
      v.nomeAluno.toLocaleUpperCase().includes(this.f.toLocaleUpperCase())
    );
  }
}
