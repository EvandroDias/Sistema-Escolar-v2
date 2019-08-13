export class FiltroOcorrenciaModel{

    constructor(

        public de?:string,
        public ate?:string,
        public serieId?:string,
        public alunoId?:string,
        public tipoOcorrenciaId?:string,
        public funcionarioId?:string,
        public tipoFiltro:string = "Data",
        public filtro?:string,
        public skip?:number,
        public take?:number,
        public dias:number= 30

     ){
        }
}
