import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { AlunoCmbModel } from "src/app/model/aluno/aluno-cmb.model";
import { TipoOcorrenciaCmbModel } from "src/app/model/tipo-ocorrencia/tipo-ocorrencia.model";
import { FiltroOcorrenciaModel } from "src/app/model/ocorrencia/filtro-ocorrencia.model";




@Component({
  selector: "app-filtro-aluno",
  templateUrl: "./filtro-aluno.component.html",
  styleUrls: ["./filtro-aluno.component.css"]
})
export class FiltroAlunoComponent implements OnInit {
  submit() {
    this.filtrar();
  }
  f: FormGroup;

  @Input() alunoCmbModel: AlunoCmbModel[] = [];
  @Input() tipoOcorrenciaCmbModel: TipoOcorrenciaCmbModel[] = [];
  @Input() filtro: FiltroOcorrenciaModel;
  @Input() mostrarBotaoImprimir = true;
  @Input() mostrarBotaoImprimirTotal = true;
  @Input() habilitarBotaoImprimir = false;
  @Output() respostaOcorrencia = new EventEmitter();
  @Output() Imprimir = new EventEmitter();


  constructor(
    private formBuilder: FormBuilder,

  ) {}

  ngOnInit() {
    this.f = this.formBuilder.group({
      de: [null, [Validators.required]],
      alunoId: [null, [Validators.required]]
    });
  }

  filtrar() {
    this.respostaOcorrencia.emit(this.filtro);
  }

  imprimir() {
    this.Imprimir.emit(this.filtro);
  }

}
