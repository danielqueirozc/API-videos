// import {createServer} from 'node:http';

// // req = receber os dados da req que o usuario esta fazendo para o meu server

// const server = createServer((req, res) => {
//     res.write("deu certo");

//     return res.end();
// });

// server.listen(3000);

import { fastify } from 'fastify';

// import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();

// const database = new DatabaseMemory();
const database = new DatabasePostgres();

server.post('/videos', async (req, res) => {
    const { title, description, duration } = req.body;
    // request body = corpo da req metodos POST, PUT

    await database.create({
        title,
        description,
        duration
    })

    return res.status(201).send();
});

// posso ter 2 rotas com o mesmo nome, desde que o metodo seja diferente
server.get('/videos', async (request) => {
    const search = request.query.search;

    const videos = await database.list(search);
    return videos;
})

server.put('/videos/:id', async (req, res) => {
    const videoId = req.params.id;

    const { title, description, duration } = req.body;


    await database.update(videoId, {
        title,
        description,
        duration
    });

    return res.status(204).send();

    // status(204) = nao tem conteudo mas deu certo
})

server.delete('/videos/:id', async (req, res) => {
    const videoId = req.params.id;
    await database.delete(videoId);

    return res.status(204).send();
})

server.listen({
    port: process.env.PORT ?? 3000
});