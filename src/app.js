import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import __dirname from './utils/index.js';

// Swagger
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(`mongodb+srv://matihandball08:CoderCoder@cluster0.vvdsk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

// Swagger config

// Este option podria ser un archivo aparte
const option = {
    definition:{
        openapi: "3.0.0",
        info: {
            title: "Pet API",
            version: "1.0.0",
            description: "Documentation for the Pet API"
        }
    },
    apis: ["./src/docs/**/*.yaml"]
}

// y luego importarlo y utilizarlo como parametro
const swaggerSpec = swaggerJSDoc(option);
// Swagger UI config
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec));

// Express config
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter);


app.listen(PORT,()=>console.log(`Listening on ${PORT}`))