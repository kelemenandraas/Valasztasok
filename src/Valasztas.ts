export default class Valasztas {
    private _Kerulet: number;
    private _szavazatSzam: number;
    private _Nev: string;
    public _Part: string;

    public get Kerulet(): number {
        return this._Kerulet;
    }
    public get szavazatSzam(): number {
        return this._szavazatSzam;
    }
    public get Nev(): string {
        return this._Nev;
    }
    public get Part(): string {
        return this._Part;
    }

    constructor(s: string) {
        let m: string[] = s.split(" ");
        this._Kerulet = parseInt(m[0]);
        this._szavazatSzam = parseInt(m[1]);
        this._Nev = m[2] + " " + m[3];
        if (m[4] == "-") {
            this._Part = "Független";
        } else {
            this._Part = m[4];
        }
    }
}
