import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AlunoConselhoModel } from "src/app/model/conselho/aluno-conselho.model";



@Component({
  selector: "app-tabela-aluno-conselho",
  templateUrl: "./tabela-aluno-conselho.component.html",
  styleUrls: ["./tabela-aluno-conselho.component.css"]
})
export class TabelaAlunoConselhoComponent implements OnInit {

  f: string;
  @Input() mostrar:boolean = false;

  constructor() {}

  @Input() conselhoModel: AlunoConselhoModel[] = [];
  @Output() respostaAlunoConselho = new EventEmitter();

  ngOnInit() {
    this.obterOcorrencia();
  }

  detalhes(id){
    this.respostaAlunoConselho.emit(id);
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
