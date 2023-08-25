export class Notification {
    constructor(
        public endpoint: string,
        public p256dh:string,
        public auth:string,
        public role:string,
    )
    {}
}
