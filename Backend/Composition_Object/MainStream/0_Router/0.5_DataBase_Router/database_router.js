import pg from 'pg'
const { Pool, Client } = pg

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv' 
dotenv.config();

export let Database_Router = class Router {

    constructor(){

    let MasterDB = new Client({
        connectionString: process.env.DATABASE_URL,
        
        ssl: true
        
        
    })

    let DB = new Client({
        connectionString: process.env.DATABASE_URL,
        
        ssl: true
        
        
    })

    let DB_usercreation = new Client({
        connectionString: process.env.DATABASE_URL,
        
        ssl: true
        
        
    })
    MasterDB.connect()
    DB.connect()
    DB_usercreation.connect()

    this.MasterDB = MasterDB
    this.DB = DB
    this.DB_usercreation = DB_usercreation
    }

    async Define_Connection(connection){

        const DB = connection

        const manager_data = await DB.query(`SELECT current_user`)
        const manager = manager_data.rows[0].current_user

        return manager;
    }

    async Creating_Schema(schema, current_connenction){

        const CREATING_SCHEMA = `
        SELECT check_schema('${schema}')`;

        const result = this[`${current_connenction}`].query(CREATING_SCHEMA)
        return result

    }

    async Granting_Schema_Authority(schema, current_connenction, target_role){

        const GRANT_SCHEMA_AUTHORITY = `
            DO $$
            DECLARE
                schema_name TEXT := '${schema}';
            BEGIN    
                EXECUTE format('GRANT CREATE ON SCHEMA %I TO %I', schema_name, '${target_role}');         
            END $$;
            `;

        const result = this[`${current_connenction}`].query(GRANT_SCHEMA_AUTHORITY)
        return result
    }

    async Creating_Table(schema, current_connenction){
       
        const CREATING_TABLES = `
        DO $$
        DECLARE
            schema_name TEXT := '${schema}';
        BEGIN
                EXECUTE format('CREATE TABLE %I.user_comment (id INTEGER,
                                                            comment TEXT,
                                                            timestamp TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                                                            serial_num INTEGER DEFAULT nextval(''public.user_comment_serial_num''),
                                                            
                                                            CONSTRAINT fk_user_id FOREIGN KEY (id) REFERENCES user_info.foodscript_user(id)
                                                            ON UPDATE CASCADE
                                                            ON DELETE CASCADE
                                                            )', schema_name );
            
                EXECUTE format('CREATE TABLE %I.user_post (id INTEGER,
                                                            post_text TEXT,
                                                            post_pictures bytea[],
                                                            timestamp TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                                                            serial_num INTEGER DEFAULT nextval(''public.user_post_serial_num''),
                                                            
                                                            CONSTRAINT fk_user_id FOREIGN KEY (id) REFERENCES user_info.foodscript_user(id)
                                                            ON UPDATE CASCADE
                                                            ON DELETE CASCADE
                                                        )', schema_name );
        END $$;
        `;

        const result = this[`${current_connenction}`].query(CREATING_TABLES)
        return result
    }

    async Granting_Table_Authority(schema, current_connenction, target_role) {
        
        const GRANT_TABLES_AUTHORITY = `
        DO $$
        BEGIN
            EXECUTE format('GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA %I TO %I', '${schema}', '${target_role}');    
        END $$
        `;

        const result = this[`${current_connenction}`].query(GRANT_TABLES_AUTHORITY)
        return result

    }

}

export default {Database_Router};