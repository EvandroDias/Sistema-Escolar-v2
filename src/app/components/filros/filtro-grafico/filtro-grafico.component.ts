import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OcorrenciaService } from 'src/app/services/ocorrencia/ocorrencia.service';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { TipoOcorrenciaService } from 'src/app/services/tipoOcorrencia/tipo-ocorrencia.service';
import {Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AlunoCmbModel } from 'src/app/model/aluno/aluno-cmb.model';
import { SerieCmbModel } from 'src/app/model/serie/serie-cmb.model';
import { TipoOcorrenciaCmbModel } from 'src/app/model/tipo-ocorrencia/tipo-ocorrencia.model';
import { FiltroOcorrenciaModel } from 'src/app/model/ocorrencia/filtro-ocorrencia.model';


@Component({
  selector: 'app-filtro-grafico',
  templateUrl: './filtro-grafico.component.html',
  styleUrls: ['./filtro-grafico.component.css']
})
export class FiltroGraficoComponent  implements OnInit {

  submit() {
    this.filtrar();
  }
  f: FormGroup;

 @Input() alunoCmbModel: AlunoCmbModel [] = [];
 @Input() serieCmbModel: SerieCmbModel [] = [];
 @Input() tipoOcorrenciaCmbModel :TipoOcorrenciaCmbModel[] = [];
 @Input() filtro = new FiltroOcorrenciaModel();

 @Input() mostrarBotaoImprimir = true;
 @Input() mostrarBotaoImprimirTotal = true;
 @Output() respostaOcorrencia = new EventEmitter();
 @Output() Imprimir = new EventEmitter();


  constructor(
    private formBuilder: FormBuilder,
    private ocorrenciaService:OcorrenciaService,
    private alunoService:AlunoService,
    private tipoOcorrenciaService:TipoOcorrenciaService
    ) { }

  ngOnInit() {

    this.f = this.formBuilder.group({
      de: [null, [Validators.required]],
      alunoId: [null, [Validators.required]],
  });

  //this.listarAluno();
  //this.listarTipoOcorrencia();

  }

  listarTipoOcorrencia(){
    this.tipoOcorrenciaService.listarCmb()
    .subscribe(r=>{
      this.tipoOcorrenciaCmbModel = r;
    },erro=>{
      console.log(erro);

    })
  }
  listarAluno(){
    this.alunoService.listarCmb()
    .subscribe(r=>{
      this.alunoCmbModel = r;
    },erro=>{
      console.log(erro);

    })
  }

  filtrar(){
    console.log(this.filtro);

    this.ocorrenciaService.grafico(this.filtro)
    .subscribe(r=>{
      console.log(r);
      //this.lineChartData = r;
      this.respostaOcorrencia.emit(r);

    },erro=>{
      console.log(erro);

    });
  }

  imprimir(){

this.Imprimir.emit(true);
  }

}
