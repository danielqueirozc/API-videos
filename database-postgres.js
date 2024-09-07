import { randomUUID } from "crypto";
import { sql } from "./db.js";

export class DatabasePostgres {

    async list(search) {
        let videos;

        if (search) {
            videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`;
            // ilike = insensitive like (ignora maiúsculas e minúsculas) / ver se o titulo contem uma string
            // %% = ver se o titulo contem a palavra independente se esta no começo, meio ou no fim
            // await = aguardar a resposta = uma promise = awiat vai aguardar ser feito para pular para a proxima linha ou funcao
        } else {
            videos = await sql`select * from videos`;
        }

        return videos;
    }

    async create(video) {
       const videosId = randomUUID(); 

       const { title, description, duration } = video;

       await sql`insert into videos (id, title, description, duration) values (${videosId}, ${title}, ${description}, ${duration})`;
    }

    async update(id, video) {
        const { title, description, duration } = video;

        await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} where id = ${id}`
    }

    async delete(id) {
        await sql`delete from videos where id = ${id}`
    }
}