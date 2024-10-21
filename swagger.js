import swaggerAutogen from "swagger-autogen";


const doc = {
    info: {
        title: "API RESTful - Plataforma de Streaming",
        description: "API criada utilizando o padrão REST na disciplina de Programação Fullstack 2"
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