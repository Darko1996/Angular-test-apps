export interface IContact {
    first_name: string;
    last_name: string;
    emails: string[];
    phones: number[];
    photo?: any;
}

export class Contact implements IContact {
    constructor(public first_name, public last_name, public emails, public phones, public photo?) {}
}
