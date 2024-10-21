import express from 'express'
import swaggerUi from 'swagger-ui-express';
import counteudoRoute from './routes/conteudoRoute.js'
import authRoute from './routes/authRoute.js'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");

const app = express();

app.use(express.json());

//página de documentação
app.use('/docs', swaggerUi.serve, swaggerUi.setup(outputJson));
app.use('/conteudos', counteudoRoute);
app.use('/auth', authRoute);


app.listen(5000, function() {
    console.log("backend em execução");
})

export default app;