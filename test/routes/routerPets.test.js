import { expect } from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";
import mongoose from "mongoose";

try {
    await mongoose.connect('mongodb+srv://matihandball08:CoderCoder@cluster0.vvdsk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
} catch (error) {
    console.log("Error de conexión a la base de datos:", error);
}

const request = supertest("http://localhost:8080");

describe("Test de la ruta /api/pets", function() {
    this.timeout(8000); // 8 segundos de timeout para cada test

    describe("Pruebas básicas", () => {
        
        after(async () => {
            await mongoose.connection.collection('pets').deleteMany({specie:"testing"}) // Limpia la colección de mascotas antes de cada test
        });

        it("Si ejecuto la ruta /api/pets, método POST, graba una mascota en la base de datos", async () => {
            const petMock = {
                name: "Covito",
                specie: "testing",
                birthDate: "2019-12-12",
            }

            const resultado = await request.post('/api/pets').send(petMock); // Envía la petición POST con el mock de mascota

            expect(resultado.status).to.be.equal(200); // Verifica que el status sea 200
        });
    });
});