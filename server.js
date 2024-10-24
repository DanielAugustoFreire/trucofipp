import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import swaggerUi from 'swagger-ui-express';
import cartaRoute from './routes/cartaRoute.js'
import authRoute from './routes/authRoute.js'
import { createRequire } from "module";
import cors from 'cors';
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");

const app = express();

app.use(express.json());

app.use(cors({origin: "http://localhost:3000", credentials: true}));

//página de documentação
app.use('/docs', swaggerUi.serve, swaggerUi.setup(outputJson));
app.use('/carta', cartaRoute);
app.use('/auth', authRoute);


app.listen(5000, function() {
    console.log("backend em execução");
})

export default app;