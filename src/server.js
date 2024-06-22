import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';

import { getContacts } from './services/contact-services.js';

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

    // app.get('/', (req, res) => {
    //     req.send([]);
    // });

    app.get('/api/contacts', async (req, res) => {
        const result = await getContacts();
        res.json(result);
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
