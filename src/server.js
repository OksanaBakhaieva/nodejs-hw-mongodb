import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';


const port = env('PORT', '3000');

const setupServer = () => {

    const app = express();
    app.use(
        express.json({
            type: ['application/json', 'application/vnd.api+json'],
            limit: '100kb',
        }),
    );
    app.use(cors());
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );
    app.use('/contacts', contactsRouter);

    app.use(notFoundHandler);
    app.use(errorHandler);

    app.listen(port, () => console.log(`Server running on ${port} PORT`));
};

export default setupServer;
