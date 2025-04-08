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

describe("Test del adoption.router", function() {
    this.timeout(8000); 

    describe("ruta /api/adoptions", () => {
        it("Si ejecuto la ruta /api/adoptions, método GET, debería retornar un objeto JSON, con las propiedades status y payload (array)", async () => {
            const resultado = await request.get('/api/adoptions');
            expect(resultado.body).to.be.an('object'); // Verifica que el resultado sea un objeto
            expect(resultado.body).to.have.property('status'); // Verifica que el objeto tenga la propiedad 'status'
            expect(resultado.body.status).to.be.equal('success'); // Verifica que el status sea 'success'
            expect(resultado.body).to.have.property('payload'); // Verifica que el objeto tenga la propiedad 'payload'
            expect(resultado.body.payload).to.be.an('array'); // Verifica que el payload sea un array
        });
    
        it("Si ejecuto la ruta /api/adoptions, método GET, debería retornar un código status 200", async () => {
            const resultado = await request.get('/api/adoptions');
            expect(resultado.status).to.be.equal(200); // Verifica que el status sea success
        });
    });

    describe("ruta /api/adoptions/:aid", () => {
        this.timeout(8000);

        it("")
    });
});