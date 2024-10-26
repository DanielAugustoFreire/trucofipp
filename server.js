import express from 'express'
import swaggerUi from 'swagger-ui-express';
import cartaRoute from './routes/cartaRoute.js'
import authRoute from './routes/authRoute.js'
import { createRequire } from "module";
import cors from 'cors';
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");

import path from 'path'
import { fileURLToPath } from 'url'
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
import socketInit from './sockets/chatSocket.js'

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

socketInit(io);


app.use(express.json());

app.use(cors({origin: "http://localhost:3000", credentials: true}));

//página de documentação
app.use('/docs', swaggerUi.serve, swaggerUi.setup(outputJson));
app.use('/carta', cartaRoute);
app.use('/auth', authRoute);


server.listen(5000, function() {
    console.log("backend em execução");
})

export default app;