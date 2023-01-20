import pool from 'pg'
const { Pool } = pool

export const database = new Pool({
    user: "postgres",
    password: "mautauaj1",
    host: 'localhost',
    port: 5432,
    database: 'tkdn_costumer',
})