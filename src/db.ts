import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const pool = new Pool({
    user: 'postgres',
    password: process.env.PS_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'node_postgres_shop'
})

export default pool
