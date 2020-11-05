import fs from "fs";
import Valasztas from "./Valasztas";

export default class Megoldas {
    private _szavazatok: Valasztas[] = [];
    public get Szavazatok(): Valasztas[] {
        return this._szavazatok;
    }
    public kiÍr(): void {
        this._szavazatok.forEach(x => {
            console.log(x);
        });
    }

    public get jeloltekSzama(): number {
        const kepviselokSzama = this._szavazatok.length;
        return kepviselokSzama;
    }

    public kepviseloKereso(nev: string): string {
        let kinev: string = "";
        let vissza: string = "Ilyen nevű képviselőjelölt nem szerepel a nyilvántartásban!";
        this._szavazatok.forEach(x => {
            const kepviseloNeve = x.Nev;
            if (kepviseloNeve.toUpperCase() == nev.toUpperCase()) {
                kinev = x.Nev;
                vissza = kinev + " " + x.szavazatSzam.toString() + " szavazatot kapott.";
            }
        });
        return vissza;
    }
    private _szavazok: number;
    public get szavazokSzama(): number[] {
        const szavazasraJogosult: number = 12345;
        this._szavazok = 0;
        this._szavazatok.forEach(x => {
            this._szavazok += x.szavazatSzam;
        });
        const szavazokAranya = +((this._szavazok / szavazasraJogosult) * 100).toFixed(2);
        return [this._szavazok, szavazokAranya];
    }

    public get szavazatokAranya(): string[] {
        let gyepDB: number = 0;
        let hepDB: number = 0;
        let tiszDB: number = 0;
        let zepDB: number = 0;
        let fuggDB: number = 0;
        this._szavazatok.forEach(x => {
            if (x.Part == "GYEP") {
                gyepDB += x.szavazatSzam;
            } else if (x.Part == "HEP") {
                hepDB += x.szavazatSzam;
            } else if (x.Part == "TISZ") {
                tiszDB += x.szavazatSzam;
            } else if (x.Part == "ZEP") {
                zepDB += x.szavazatSzam;
            } else {
                fuggDB += x.szavazatSzam;
            }
        });

        const s: string[] = [];
        s[0] = "Gyümölcsevők Pártja= " + ((gyepDB / this._szavazok) * 100).toFixed(2) + " %";
        s[1] = "Húsevők Pártja= " + ((hepDB / this._szavazok) * 100).toFixed(2) + " %";
        s[2] = "Tejivók Szövetsége= " + ((tiszDB / this._szavazok) * 100).toFixed(2) + " %";
        s[3] = "Zöldségevők Pártja= " + ((zepDB / this._szavazok) * 100).toFixed(2) + " %";
        s[4] = "Független jelöltek= " + ((fuggDB / this._szavazok) * 100).toFixed(2) + " %";
        return s;
    }

    public get legtobbSzavazat(): string[] {
        let legtobb: string[] = [];
        let eddigiLegtobb = 0;
        this._szavazatok.forEach(x => {
            if (eddigiLegtobb < x.szavazatSzam) {
                eddigiLegtobb = x.szavazatSzam;
                legtobb = [];

                legtobb.push(x.Nev + " " + x.Part);
            } else if (eddigiLegtobb == x.szavazatSzam) {
                legtobb.push(x.Nev + " " + x.Part);
            }
        });
        return legtobb;
    }
    public get keruletek(): string[] {
        const valasztoKerulet: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
        const nyertesek: string[] = ["", "", "", "", "", "", "", ""];
        this._szavazatok.forEach(x => {
            if (x.szavazatSzam > valasztoKerulet[x.Kerulet - 1]) {
                valasztoKerulet[x.Kerulet - 1] = x.szavazatSzam;

                nyertesek[x.Kerulet - 1] = x.Kerulet + ".kerület: " + x.Nev + " " + x.Part;
            }
        });
        fs.writeFileSync("kepviselok.txt", nyertesek.join("\r\n"));
        return nyertesek;
    }

    constructor() {
        this._szavazok = 0;
        fs.readFileSync("szavazatok.txt")
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim();
                if (aktSor != "") {
                    this._szavazatok.push(new Valasztas(aktSor));
                }
            });
    }
}
