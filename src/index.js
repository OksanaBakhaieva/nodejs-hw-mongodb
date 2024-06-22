import initMongoCollection from "../db/initMongoCollection.js";
import setupServer from "./server.js";

const bootstrap = async () => {
    await initMongoCollection();
    setupServer();
};

bootstrap();
