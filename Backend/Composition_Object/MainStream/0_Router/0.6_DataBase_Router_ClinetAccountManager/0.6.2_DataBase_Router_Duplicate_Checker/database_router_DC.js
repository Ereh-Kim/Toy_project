import { Database_Router } from "../../0.5_DataBase_Router/database_router.js";

export class Database_Router_DC extends Database_Router {

    constructor(){
    super()
    }

    async Check_duplicated_resource(section, input, table, schema ){

        let DB = this.DB
        let query = `SELECT ${section} FROM ${schema}.${table}`

        let query_request_1 = ` WHERE ${section} = $1`

        query = query + query_request_1 
        let result  = await DB.query(query, [input])

        switch(result.rowCount === 0){

            case(false):
            result = result.rows
            break;
    
            case(true):
            result = []
            break;
            }
    
            return result
    }

    

}

export default Database_Router_DC;