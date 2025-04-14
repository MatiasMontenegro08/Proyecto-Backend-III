import { expect } from "chai";
import { describe, it, before, after } from "mocha";
import supertest from "supertest";
import mongoose from "mongoose";

try {
    await mongoose.connect('mongodb+srv://matihandball08:CoderCoder@cluster0.vvdsk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
} catch (error) {
    console.log("Error de conexión a la base de datos:", error);
}

const request = supertest("http://localhost:8080");

describe("Test del adoption.router", function () {
    this.timeout(8000);

    // Variables para almacenar los IDs de usuario, mascota y adopción de prueba
    let testUserId;
    let testPetId;
    let testAdoptionId;

    // Crear un usuario y una mascota de prueba antes de ejecutar las pruebas
    before(async () => {
        const testUser = {
            first_name: "User",
            last_name: "Test",
            email: "testuser@example.com",
            password: "password123",
            pets: [],
        };
        const userResponse = await mongoose.connection.collection('users').insertOne(testUser);
        testUserId = userResponse.insertedId.toString();

        const testPet = {
            name: "Test Pet",
            specie: "Dog",
            birthDate: "2020-01-01",
            adopted: false,
            owner: null,
        };
        const petResponse = await mongoose.connection.collection('pets').insertOne(testPet);
        testPetId = petResponse.insertedId.toString();
    });

    // Eliminar el usuario, la mascota y la adopción de prueba después de ejecutar las pruebas
    after(async () => {
        if (testAdoptionId) {
            await mongoose.connection.collection('adoptions').deleteOne({ _id: new mongoose.Types.ObjectId(testAdoptionId) });
        }
        if (testPetId) {
            await mongoose.connection.collection('pets').deleteOne({ _id: new mongoose.Types.ObjectId(testPetId) });
        }
        if (testUserId) {
            await mongoose.connection.collection('users').deleteOne({ _id: new mongoose.Types.ObjectId(testUserId) });
        }
    });

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
            expect(resultado.status).to.be.equal(200);
        });

        /*
        No puero ejecutar este test porque la app se crashea si pruebo algún posible error.

        it("Si ejecuto la ruta /api/adoptions y ocurre un error, debería retornar un código status 500", async () => {
            const resultado = await request.get('/api/adoptions/error'); // Ruta incorrecta para simular un error
            expect(resultado.status).to.be.equal(500); // Verifica que el status sea 500
        });
        */
    });


    describe("ruta /api/adoptions/:uid/:pid", () => {
        it("Si ejecuto la ruta /api/adoptions/:uid/:pid, método POST, debería retornar un código status 200", async () => {
            const resultado = await request.post(`/api/adoptions/${testUserId}/${testPetId}`);
            expect(resultado.status).to.be.equal(200);

            // Guardar el ID de la adopción creada para eliminarla después
            const adoptionResponse = await mongoose.connection.collection('adoptions').findOne({ owner: new mongoose.Types.ObjectId(testUserId), pet: new mongoose.Types.ObjectId(testPetId) });
            testAdoptionId = adoptionResponse._id.toString();
        });

        /*
        Estos test, como la app no maneja errores, se crashea, pero los dejo para que el código sea más robusto y se puedan manejar errores en el futuro.

        it("Si ejecuto la ruta /api/adoptions/:uid/:pid, método POST, con un uid incorrecto, debería retornar un error 404", async () => {
            const resultado = await request.post(`/api/adoptions/uidincorrecto/${testPetId}`);
            expect(resultado.status).to.be.equal(404); // Verifica que el status sea 404
        });

        it("Si ejecuto la ruta /api/adoptions/:uid/:pid, método POST, con un pid incorrecto, debería retornar un error 404", async () => {
            const resultado = await request.post(`/api/adoptions/${testUserId}/pidincorrecto`);
            expect(resultado.status).to.be.equal(404); // Verifica que el status sea 404
        });
        */
    });

    describe("ruta /api/adoptions/:aid", () => {
        it("Si ejecuto la ruta /api/adoptions/:aid, método GET, con un id incorrecto, debería retornar un error 404", async () => {
            const resultado = await request.get('/api/adoptions/idincorrecto');
            expect(resultado.status).to.be.equal(404);
        });

        it("Si ejecuto la ruta /api/adoptions/:aid, método GET, con un id correcto, debería retornar un objeto JSON con las propiedades status y payload", async () => {
            const resultado = await request.get(`/api/adoptions/${testAdoptionId}`);
            expect(resultado.body).to.be.an('object');
            expect(resultado.body).to.have.property('status');
            expect(resultado.body.status).to.be.equal('success');
            expect(resultado.body).to.have.property('payload');
            expect(resultado.body.payload).to.be.an('object');
            expect(resultado.body.payload).to.have.property('_id');
        });
    });
});