import Users from "../../src/dao/Users.dao.js";
import mongoose from "mongoose";
import { expect } from "chai";
import { describe, it } from "mocha";

try {
    await mongoose.connect('mongodb+srv://matihandball08:CoderCoder@cluster0.vvdsk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
} catch (error) {
    console.log("Error de conexión a la base de datos:", error);
}

const usersDao = new Users();

describe("Test de Users Dao", function() {
    this.timeout(8000); // 8 segundos de timeout para cada test

    // before, after, beforeEach, afterEach son funciones de mocha que se ejecutan antes o después de cada test
    afterEach(async () => {
        await mongoose.connection.collection("users").deleteMany({email: 'prueba@test.com'}); // Limpia la colección de usuarios después de cada test
    }); 

    // Test para obtener todos los usuarios
    it("El dao de usuarios al ejecutar el método get deberá retornar un array", async () => {
        const resultado = await usersDao.get();
        expect(Array.isArray(resultado)).to.be.true; // Verifica que el resultado sea un array

        if(Array.isArray(resultado)) {
            resultado.forEach(u => {
                expect(u).to.have.property("_id");
                expect(mongoose.isValidObjectId(u._id)).to.be.true; // Verifica que _id sea un ObjectId válido
                expect(u).to.have.property("email");
            });
        }
    });

    it("El dao, si ejecuto el método save, graba un usuario en la base de datos", async () => {
        const userMock = {
            first_name: "Juan",
            last_name: "Pérez",
            email: "prueba@test.com",
            password: "123456",
        }
        const resultado = await usersDao.save(userMock);
        expect(resultado).to.have.property("_id"); // Verifica que el resultado tenga la propiedad _id
        expect(resultado).to.has.property("email").and.to.be.equal(userMock.email); // Verifica que el email sea igual al del mock
    });
});

/* Los test deben ser puntuales, no realizar un solo test donde se evaluen muchas funciones, es mejor realizar un test por cada funcion, asi si algo falla podes saber exactamente que parte es la que falla. */