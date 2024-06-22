import express from "express";
import cors from "cors";
// import pino from 'pino-http';
import contacts from '../db/contacts.js';

const { PORT = 3000 } = process.env;

const setupServer = () => {

    const app = express();
    app.use(cors());
    // app.use(
    //     pino({
    //         transport: {
    //             target: 'pino-pretty',
    //         },
    //     }),
    // );

    app.get('/', (res, req) => {
        req.send([]);
    });

    app.get('/api/contacts', (res,req) => {
        req.json(contacts);
    });


    app.use( (req, res) => {
        res.status(404).json({
            status: 404,
            message: 'Not found'
        });
    });

    app.listen(PORT, () => console.log(`Server running on ${PORT} PORT`));
};

export default setupServer;
