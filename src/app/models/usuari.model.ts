

export class Usuari {

    static fromFirebase( { email, nom, uid }) {

        return new Usuari( uid, nom, email );

    }


    constructor(
        public uid: string,
        public nom: string,
        public email: string
    ) {}
}