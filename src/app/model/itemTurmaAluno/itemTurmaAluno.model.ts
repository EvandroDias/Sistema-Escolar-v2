export class ItemTurmaAlunoModel{


  constructor(
      public turmaId?: string,
      public alunoId?: string,
      public numero?:number,
      public status:string = "Ativo"
   ){
      }
}
