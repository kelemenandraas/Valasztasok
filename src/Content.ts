import fs from "fs";
import http from "http";
import url from "url";
import Megoldas from "./Megoldas";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Választások</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->

        const megold = new Megoldas();
        //megold.kiÍr();
        res.write("2. feladat:\n");
        res.write(`A helyhatósági választáson ${megold.jeloltekSzama} képviselőjelölt indult.\n`);
        res.write("3. feladat:\n");
        const nev: string = params.nev as string;
        res.write(`Adja meg egy képviselő nevét! <input type='text' value='' name='nev' value=${nev} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        if (nev != null) {
            res.write(`${megold.kepviseloKereso(nev)}\n`);
        }
        res.write("4. feladat:\n");
        res.write(`A választáson ${megold.szavazokSzama[0]} állampolgár, a jogosultak ${megold.szavazokSzama[1]}%-a vett részt.\n`);

        res.write("5. feladat:\n");
        for (let index = 0; index < megold.szavazatokAranya.length; index++) {
            res.write(`${megold.szavazatokAranya[index]}\n`);
        }

        res.write("6.feladat:\n");
        for (let index = 0; index < megold.legtobbSzavazat.length; index++) {
            res.write(`${megold.legtobbSzavazat[index]}\n`);
        }
        res.write("7.feladat:\n");
        megold.keruletek.forEach(element => {
            res.write(`${element} \n`);
        });
        res.write("<a href='https://github.com/kelemenandraas/Valasztasok'>Git</a>&nbsp;&nbsp;&nbsp;");
        res.write("<a href='https://valasztasok-13aka.herokuapp.com/'>Heroku</a>");
        // <---- Fejezd be a kódolást

        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
