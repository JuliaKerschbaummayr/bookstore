export class ErrorMessage {
    constructor(
        public forControl: string,
        public forValidator: string,
        public text: string
    ) { }
}

export const ManageOrderDetailErrorMessages = [
    new ErrorMessage('status', 'rightstatus', 'Mögliche Werte: Offen, Bezahlt, Storniert, Versendet')
];
