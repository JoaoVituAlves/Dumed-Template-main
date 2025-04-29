import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "DUMED HOSPITALAR - API",
        description: "API criada utilizando o padrão REST para sistema ecommerce DUMED CARE"
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