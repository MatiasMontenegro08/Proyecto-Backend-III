import { Router } from "express";
import { generateUsers } from "../mocks/mock.user.js";
import userModel from "../dao/models/User.js";
import { generatePets } from "../mocks/mock.user.js";
import petModel from "../dao/models/Pet.js";

const router = Router();

// Ruta para obtener usuarios ficticios
router.get('/mockingusers', async (req, res) => {
    const cantUsers = req.query.cantUsers; // Cantidad de usuarios que se desean generar por query params
    const numUsers = parseInt(cantUsers, 10);

    if (isNaN(numUsers)) return res.status(400).send({ status: "error", message: "Invalid parameters" });

    let users = [];
    for (let i = 0; i < numUsers; i++) {
        users.push(await generateUsers());
    }
    res.send({ status: "success", payload: users });
});

// Ruta para obtener mascotas ficticias
router.get('/mockingpets', async (req, res) => {
    let pets = [];
    for (let i = 0; i < 50; i++) {
        pets.push(generatePets());
    }
    res.send({ status: "success", payload: pets });
});

// Ruta para generar datos ficticios en la base de datos de MongoDB con la cantidad de usuarios y mascotas que se desee por query params
router.post('/generateData', async (req, res) => {
    const { cantUsers, cantPets } = req.query;

    // parsear los parametros a numeros enteros
    const numUsers = parseInt(cantUsers, 10);
    const numPets = parseInt(cantPets, 10);

    // validar que los parametros sean numeros
    if (isNaN(numUsers) || isNaN(numPets)) return res.status(400).send({ status: "error", message: "Invalid parameters" });

    try {
        // generar los datos ficticios
        for (let i = 0; i < numUsers; i++) {
            await userModel.create(await generateUsers());
        }
        for (let i = 0; i < numPets; i++) {
            await petModel.create(await generatePets());
        }
        
        // mostrar los usuarios y mascotas generados
        const users = await userModel.find();
        const pets = await petModel.find();

        res.send({ status: "success", message: "Data generated", payload: { users, pets } });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message});
    }

});

export default router;