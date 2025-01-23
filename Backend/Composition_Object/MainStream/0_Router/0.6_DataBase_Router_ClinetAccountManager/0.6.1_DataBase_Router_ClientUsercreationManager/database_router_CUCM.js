import { Database_Router } from "../../0.5_DataBase_Router/database_router.js";

import Database_Router_CAM from "../database_router_CAM.js";

export class Database_Router_CUCM extends Database_Router {

    constructor(){
    super()
    }

    async Select_Post( request, input, table, schema, limit ){
        
        let DB = this.DB_usercreation
        let query = `SELECT * FROM "${schema}".${table}`

        let query_request_1 = ` WHERE`
        await request.forEach((element,index) => {

            switch(index){
            
            case(0):
            query_request_1 += ` ${element} = $${index+1}`
            break;

            default:
            query_request_1 += ` AND ${element} = $${index+1}`
            break;
            }

            if(request.length === 1){
                ` ${element} = $${index+1}`
            }
        });

        let query_request_2 = ` LIMIT ${limit}`

        query = query + query_request_1 + query_request_2;
        
        let result = await DB.query(query, input)

        switch(result.rowCount === 0){

        case(false):
        result = result.rows
        break;

        case(true):
        result = undefined
        break;
        }

        return result
    }

    async Update_Post( request, input, section){

        let DB = await this.DB_usercreation
        let query = `UPDATE user_creation.${section} `
        let query_request_1 = `SET `
        request.forEach((element, index)=>{
            switch(index){
                case(request.length-1):
                query_request_1 += `${element} = $${index+1} `
                return;

                default:
                query_request_1 += `${element} = $${index+1}, `
                break;
            }
        })

        let query_request_2 = `WHERE id = $${request.length+1}`
        query = query + query_request_1 + query_request_2 + ` RETURNING *`
        
        let result = await DB.query(query,input)
        
        return result
    }

    async Create_Post( request, input, table, schema){
        
        let DB = await this.DB_usercreation

        let query = `INSERT INTO "${schema}".${table}`
        
        let query_request_1 = ` `
        request.forEach((element, index)=>{
            switch(index){
                case(0):
                query_request_1 = query_request_1+` (${element}, `
                return;

                case(request.length-1):
                query_request_1 = query_request_1+` ${element})`
                return;

                default:
                query_request_1 = query_request_1+` ${element},`
            }
        })
        
        let query_request_2 = ` VALUES `
        request.forEach((element, index)=>{
            const CASE = `${index}-${element}`
            switch(CASE){
                case(`0-${element}`):
                query_request_2 = query_request_2+` ($${index+1},`
                return;

                case(`${request.length-1}-${element}`):
                query_request_2 = query_request_2+` $${index+1})`
                return;

                case(`${index}-post_pictures`):
                query_request_2 = query_request_2+` $${index+1}::bytea[],`
                return;

                default:
                query_request_2 = query_request_2+` $${index+1},`
            }
        })

        query = query + query_request_1 + query_request_2 + ` RETURNING *`
        
        console.log(query)
        let result = await DB.query(query,input)

        return result

    }

    async Delete_Post(section){

        let DB = await this.DB_usercreation
        let query = `DELETE FROM user_creation.${section}`
        let query_request = ` WHERE serial_num = $1`
        query = query + query_request + ` RETURNING *`

        let result = await DB.query(query,input)
    
        return result

    }

}

export default Database_Router_CUCM;