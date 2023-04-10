import { Client } from "pg";

export const client: Client = new Client({
    user: 'lukki',
    host: 'localhost',
    port: 5432,
    password: 'luck6975',
    database: 'movie'
})

export const startDatabase = async (): Promise<void> => {
    await client.connect()
    console.log("DataBase connected")
}
