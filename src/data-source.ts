import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from 'dotenv'
// import { User } from "./entity/User"

dotenv.config()

console.log(process.env.PS_PASSWORD)

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: process.env.PS_PASSWORD,
    database: "typeorm_shop",

    synchronize: true,
    logging: false,
    entities: ["src/entity/*.ts"],
    migrations: [],
    subscribers: [],
})
