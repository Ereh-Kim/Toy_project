import pg from 'pg'
const { Client } = pg

import dotenv from 'dotenv'
dotenv.config();

export let Database_Router = class Router {

    constructor(){
    let DB = new Client({
        user: `${process.env.DATABASE_ROLE}`,
        password: `${process.env.DATABASE_PASSWORD}`,
        host: `${process.env.DATABASE_HOST}`,
        port: `${process.env.DATABASE_PORT}`,
        database: `${process.env.DATABASE_ACCESSING}`
    })

    DB.connect()
    this.DB = DB
    }
}

export default {Database_Router};