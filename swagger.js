import swaggerAutogen from "swagger-autogen";


const doc = {
    info: {
        title: "API REST - TRUCOFIPP",
        description: "API PARA O JOGO DE TRUCO",
    },
    host: 'localhost:5000',
    components: {
        schemas: {
        },
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
}

const outputJson = "./swagger-output.json";
const routes = ['./server.js']

swaggerAutogen({openapi: '3.0.0'})(outputJson, routes, doc)
.then( async () => {
    await import('./server.js');
})