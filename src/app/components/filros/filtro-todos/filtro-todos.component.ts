import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";


import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { TipoOcorrenciaCmbModel } from "src/app/model/tipo-ocorrencia/tipo-ocorrencia.model";
import { FiltroOcorrenciaModel } from "src/app/model/ocorrencia/filtro-ocorrencia.model";



@Component({
  selector: "app-filtro-todos",
  templateUrl: "./filtro-todos.component.html",
  styleUrls: ["./filtro-todos.component.css"]
})
export class FiltroTodosComponent implements OnInit {
  @Input() tipoOcorrenciaCmbModel: TipoOcorrenciaCmbModel[] = [];
  @Input() filtro: FiltroOcorrenciaModel;
  @Input() mostrarBotaoImprimir = true;
  @Input() mostrarBotaoImprimirTotal = true;
  @Input() habilitarBotaoImprimir = false;
  @Output() respostaOcorrencia = new EventEmitter();
  @Output() Imprimir = new EventEmitter();
  ocorrenciaModel: any;

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,

  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      de: [null, [Validators.required]],
      tipoOcorrenciaId: [null, [Validators.required]]
    });
  }

  filtrar() {
    this.respostaOcorrencia.emit(this.filtro);
  }

  imprimir() {
    this.Imprimir.emit(this.filtro);
  }
}
