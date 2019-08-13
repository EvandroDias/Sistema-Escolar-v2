import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Api_Url } from "src/app/shared/util/URLAPI";
import { TurmaModel } from 'src/app/model/turma/turma.model';
import { ItemTurmaAlunoModel } from '../../model/itemTurmaAluno/itemTurmaAluno.model';



@Injectable({
    providedIn: 'root'
  })
  export class TurmaService {

    constructor(private http:HttpClient) { }



    listarTodos(status,skip,take){

      return this.http.get<TurmaModel[]>(`${Api_Url}api/Turma/v1/listar-todos/${status}/${skip}/${take}`);
    }
    listarPorTurmaId(turmaId){

      return this.http.get<TurmaModel[]>(`${Api_Url}api/Turma/v1/listar-por-turmaid/${turmaId}`);
    }

    salvar(turmaModel:any){

      return this.http.post(Api_Url+'api/turma/v1/salvar',turmaModel);
    }

    salvarAluno(itemTurmaModel:any){

      return this.http.post(Api_Url+'api/turma/v1/salvar-aluno',itemTurmaModel);
    }
    alterarAluno(itemTurmaModel:any){

      return this.http.post(Api_Url+'api/turma/v1/alterar-aluno',itemTurmaModel);
    }

    alterar(turmaModel:TurmaModel){

      return this.http.post(Api_Url+'api/turma/v1/alterar',turmaModel);
    }

    detalhe(id:string){

      return this.http.get<TurmaModel>(Api_Url+'api/turma/v1/detalhe/'+id);
    }
    detalheAluno(alunoId:string,turmaId:string){

      return this.http.get<ItemTurmaAlunoModel>(Api_Url+'api/turma/v1/detalhe-aluno/'+alunoId+'/'+turmaId);
    }
  }

