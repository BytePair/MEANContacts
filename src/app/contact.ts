export class Contact {
    // _id will be auto-generated on the server side
    _id?: string;
    name: string;
    email: string;
    phone: {
        mobile: string;
        work: string;
    }
}
