import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from 'helmet';

dotenv.config();

// start up an instance of express app
const app: Express = express();

// :: middlewares ::

app.use(helmet());
app.use(cors());

// parse incoming requests of any type
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());



export default app;
