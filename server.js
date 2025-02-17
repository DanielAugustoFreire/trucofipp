import express from 'express'
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';


import cartaRoute from './routes/cartaRoute.js'
import authRoute from './routes/authRoute.js'
import jogoRoute from './routes/jogoRoute.js'
import salaRoute from './routes/salaRoute.js'
import equipeRoute from './routes/equipeRoute.js'
import participanteRoute from './routes/participanteRoute.js'
import rodadaRoute from './routes/rodadaRoute.js'
import movimentacaoRoute from './routes/movimentacaoRoute.js'

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
import { Server } from 'socket.io';
import socketInit from './sockets/chatSocket.js'

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

socketInit(io);


app.use(express.json());
app.use(cookieParser());

app.use(cors({origin: "http://localhost:3000", credentials: true}));

//página de documentação
app.use('/docs', swaggerUi.serve, swaggerUi.setup(outputJson));
app.use('/carta', cartaRoute);
app.use('/auth', authRoute);
app.use('/sala', salaRoute);
app.use('/jogo', jogoRoute);
app.use('/equipe', equipeRoute);
app.use('/participante', participanteRoute);
app.use('/rodada', rodadaRoute);
app.use('/movimento', movimentacaoRoute);

server.listen(5000, function() {
    console.log("backend em execução");
})

export default app;