import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ConselhoModel } from "src/app/model/conselho/conselho.model";


@Component({
  selector: "app-tabela-conselho",
  templateUrl: "./tabela-conselho.component.html",
  styleUrls: ["./tabela-conselho.component.css"]
})
export class TabelaConselhoComponent implements OnInit {

  f: string;
  @Input() mostrar:boolean = false;
  @Output() retornoConselhoId = new EventEmitter();

  constructor() {}

  @Input() conselhoModel: ConselhoModel[] = [];

  ngOnInit() {
    this.obterOcorrencia();
  }

  imprimir(conselhoId){
    this.retornoConselhoId.emit(conselhoId);
  }

  obterOcorrencia() {
    if (
      this.conselhoModel.length === 0 ||
      this.f === undefined ||
      this.f.trim() === ""
    ) {
      return this.conselhoModel;
    }

    return this.conselhoModel.filter(v =>
      v.nomeAluno.toLocaleUpperCase().includes(this.f.toLocaleUpperCase())
    );
  }
}
