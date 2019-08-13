

export class AlunoModel{

    constructor(
        public id?:string,
        public nome?:string,
        public sobreNome?:string,
        public status:boolean = true,
        public racaCor?:string,        
        public  rm?:string,
        public  ra?:string,
        public  dataNascimento?:Date,
        public  sexo?:string,
      
        public  nacionalidade?:string,
        public  natural?:string,
       
        public  foto?:string,
        public  senha?:string,
        public gemeos?:string,

        public  rua?:string,
        public  numero?:string,
        public  bairro?:string,
        public  complemento?:string,
        public  uf?:string,
        public  cidade?:string,
        public  cep?:string,
       
        public tipoUsuario?:string

    ){}
}