import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AlunoCmbModel } from "src/app/model/aluno/aluno-cmb.model";



@Component({
  selector: "app-tabela-aluno-turma",
  templateUrl: "./tabela-aluno-turma.component.html",
  styleUrls: ["./tabela-aluno-turma.component.css"]
})
export class TabelaAlunoTurmaComponent implements OnInit {

  f: string;
  @Input() mostrar:boolean = false;

  constructor() {}

  @Input() alunoModel: AlunoCmbModel[] = [];
  @Output() respostaAlunoTurma = new EventEmitter();

  ngOnInit() {

  }

  detalheAluno(id){
    this.respostaAlunoTurma.emit(id);
  }




}
