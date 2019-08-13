import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SerieCmbModel } from 'src/app/model/serie/serie-cmb.model';
import { TipoOcorrenciaCmbModel } from 'src/app/model/tipo-ocorrencia/tipo-ocorrencia.model';
import { FiltroOcorrenciaModel } from 'src/app/model/ocorrencia/filtro-ocorrencia.model';



@Component({
  selector: 'app-filtro-serie',
  templateUrl: './filtro-serie.component.html',
  styleUrls: ['./filtro-serie.component.css'],

})
export class FiltroSerieComponent implements OnInit {

  submit() {
    throw new Error("Method not implemented.");
  }


  @Input() serieCmbModel: SerieCmbModel [] = [];
  @Input() tipoOcorrenciaCmbModel: TipoOcorrenciaCmbModel[] = [];
  @Input() filtro: FiltroOcorrenciaModel;
  @Input() mostrarBotaoImprimir = true;
  @Input() mostrarBotaoImprimirTotal = true;
  @Input() habilitarBotaoImprimir = false;
  @Input() habilitarBotaoImprimirTotal = false;
  @Output() respostaOcorrencia = new EventEmitter();
  @Output() Imprimir = new EventEmitter();
  @Output() ImprimirTotal = new EventEmitter();

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,

    ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      de: [null, [Validators.required]],
      serieId: [null, [Validators.required]],
  });


  }

  filtrar() {
    this.respostaOcorrencia.emit(this.filtro);
  }

  imprimir() {
    this.Imprimir.emit(this.filtro);
  }
  imprimirTotal() {
    this.ImprimirTotal.emit(this.filtro);
  }


}
