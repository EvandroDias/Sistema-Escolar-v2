export class CommandResultModel{
  constructor(
      public success?:boolean,
      public message?: string,
      public data?:any[]
  ){}
}
