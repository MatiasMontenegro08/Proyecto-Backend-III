import { fakerES_MX as faker } from "@faker-js/faker";
import bcrypt from 'bcrypt';

export const generateUsers = async () => {
    const password = "coder123";
    const hashedPassword = await bcrypt.hash(password, 10);
    let pets = [];
    const role = ["user", "admin"];
    let first_name = faker.person.firstName();
    let last_name = faker.person.lastName();

    return {
        first_name: first_name,
        last_name: last_name,
        email: faker.internet.email({firstName: first_name, lastName: last_name}),
        password: hashedPassword,
        role: faker.helpers.arrayElement(role),
        pets: pets
    }
}

export const generatePets = () => {
    const species = ["dog", "cat", "bird", "fish"];
    const specie = faker.helpers.arrayElement(species);
    let name;

    // Seleccionar un nombre de animal dependiendo de la especie
    switch (specie) {
        case "dog":
            name = faker.animal.dog();
            break;
        case "cat":
            name = faker.animal.cat();
            break;
        case "bird":
            name = faker.animal.bird();
            break;
        case "fish":
            name = faker.animal.fish();
            break;
        default:
            name = "Unknown";
    }

    return {
        specie: specie,
        name: name,
        birthDate: faker.date.birthdate({ mode: 'age', min: 0, max: 10 }),
        adopted: faker.datatype.boolean(),
        owner: faker.database.mongodbObjectId(),
        image: faker.image.url(),
    }
}