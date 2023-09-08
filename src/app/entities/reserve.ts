export class Reserve {
    constructor(
        public _id:string,
        public appartement:string,
        public user:string,
        public date:Date,
        public cin:string,
        public dateRes:Date,
        public ntel:string,
        public remarque:string,
        public status:string,
        public nom:string
    ) { }
}
