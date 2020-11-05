import Valasztas from "../Valasztas";
describe("Választás osztály unit tesztek", () => {
    const instance1: Valasztas = new Valasztas("1 120 Példa Béla GYEP");
    const instance2: Valasztas = new Valasztas("5 80 Lorem István -");

    it("Telek osztálypéldányok ellenőrzése", async () => {
        expect(instance1).toBeInstanceOf(Valasztas);
        expect(instance2).toBeInstanceOf(Valasztas);
    });

    it("Kerület", async () => {
        expect(instance1.Kerulet).toBe(1);
        expect(instance2.Kerulet).toBe(5);
    });

    it("Szavazatszám", async () => {
        expect(instance1.szavazatSzam).toBe(120);
        expect(instance2.szavazatSzam).toBe(80);
    });

    it("Név", async () => {
        expect(instance1.Nev).toBe("Példa Béla");
        expect(instance2.Nev).toBe("Lorem István");
    });

    it("Párt", async () => {
        expect(instance1.Part).toBe("GYEP");
        expect(instance2.Part).toBe("Független");
    });
});
