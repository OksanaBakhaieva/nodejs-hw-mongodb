import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';
import contacts from './db/contacts.js';

const port = env('PORT', '3000');

const setupServer = () => {

    const app = express();
    const logger = pino({
        transport: {
            target: 'pino-pretty',
        }
    });

    app.use(logger);
    app.use(cors());

    app.get('/', (res, req) => {
        req.send([]);
    });

    app.get('/api/contacts', (res,req) => {
        req.json(contacts);
    });

    app.use((req, res) => {
        res.status(404).json({
            status: 404,
            message: 'Not found'
        });
    });

    app.listen(port, () => console.log(`Server running on ${port} PORT`));
};

export default setupServer;
