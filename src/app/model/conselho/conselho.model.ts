export class ConselhoModel{

  constructor(
      public  conselhoId?:string,
      public  dataConselho?:string,
      public  funcionarioId?:string,
      public  nomeAluno?:string,
      public  nomeDiretor?:string,
      public  nomeFuncionario?:string,
      public  nomeTipoConselho?:string,
      public  nomeSerie?:string,
      public  nomeBimestre?:string,
      public  nomeAno?:string,
      public  bimestreId?:string,
      public  serieId?:string,
      public  anoId?:string,
      public  dataCadastro?:Date,
      public  status?:boolean,
      public  nomeCoordenador?:string

   ){
      }
}
