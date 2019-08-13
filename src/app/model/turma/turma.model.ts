export class TurmaModel{
  constructor(
        public turmaId?:string,
        public  ensino ?:string,
        public  usuarioId ?:string,
        public  serieId ?:string,
        public  nomeSerie ?:string,
        public  departamentoId ?:string,
        public  nomeSala ?:string,
        public  anoId ?:string,
        public  nomeAno ?:string,
        public  escolaId ?:string,
        public  nomeEscola ?:string,
        public  periodo ?:string,
        public  nomeCoordenador ?:string,
        public  nomeDiretor ?:string,
        public  funcionarioId ?:string,
        public  nomeProfessor ?:string,
        public  qtdAulas1Bimestre ?:number,
        public  qtdAulas2Bimestre ?:number,
        public  qtdAulas3Bimestre ?:number,
        public  qtdAulas4Bimestre ?:number,
  ) {

  }
}
