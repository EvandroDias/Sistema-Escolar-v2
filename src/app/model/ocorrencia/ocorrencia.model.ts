export class OcorrenciaModel{

    constructor(
        public  ocorrenciaId?:string,
        public  titulo?:string,
        public  descricao?:string,
        public  dataOcorrencia?:string,
        public  funcionarioId?:string,
        public  nomeAluno?:string,
        public  nomeFuncionario?:string,
        public  nomeTipoOcorrencia?:string,
        public  nomeSerie?:string,
        public  tipoOcorrenciaId?:string,
        public  serieId?:string,
        public  periodo?:string,
        public  alunoId?:string,
        public  dataCadastro?:Date,
        public  status?:boolean,
        public  visualizada?:boolean
     ){
        }
}
