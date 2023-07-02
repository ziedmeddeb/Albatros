export class Calendrier {
    constructor(
        public _id: string,
        public appartement:string,
        public availabilities:{dateDeb:Date,dateFin:Date,available:boolean,price:number}[])
        {

        }

      

}
