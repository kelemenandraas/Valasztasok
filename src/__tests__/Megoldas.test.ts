import fs from "fs";
import Megoldas from "../Megoldas";

describe("Megoldás osztály unit tesztek", () => {
    const instance: Megoldas = new Megoldas();
    it("Megoldás osztálypéldány ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(Megoldas);
    });
    it("2. feladat Képviselőjelöltek száma:", async () => {
        expect(instance.jeloltekSzama).toBe(instance.Szavazatok.length);
    });
    it("4. feladat Részvételi arány:", async () => {
        const s1: number[] = instance.szavazokSzama;
        expect(s1[0]).toBe(4713);
    });
    it("6. feladat: maximum megtalálása(legalább 1)", async () => {
        expect(instance.legtobbSzavazat.length).toBeGreaterThan(0);
    });

    it("7. feladat: pontosan 8 sor visszadása", async () => {
        expect(fs.readFileSync("./kepviselok.txt").toString().split("\n").length).toBe(8);
    });
});
