import { Database_Router } from "../0.5_DataBase_Router/database_router.js";

export class Database_Router_CAM extends Database_Router {

    constructor(){
    super()
    }

    async Select_User(request, input){

        let DB = await this.DB
        let query = `SELECT * FROM user_info.foodscript_user`
        let query_request = ` WHERE`
        await request.forEach((element,index) => {

            switch(index){
            
            case(0):
            query_request += ` ${element} = $${index+1}`
            return;

            default:
            query_request += ` AND ${element} = $${index+1}`
            return;
            }

        });

        query = query + query_request;
        let result = await DB.query(query, input)

        switch(result.rowCount){

        case(1):
        result = result.rows[0]
        break;

        case(0):
        result = undefined
        break;
        }

        return result
    }


    async Add_User(input){

        let DB = await this.DB
        let query = `INSERT INTO user_info.foodscript_user ( email, name, picture, password, position )`
        let query_request = ` VALUES ( $1, $2, $3, $4, $5 )`
        query = query + query_request + ` RETURNING *`

        let result = await DB.query(query,input)

        return result
    }


    async Delete_User(input){

        let DB = await this.DB
        let query = `DELETE FROM user_info.foodscript_user`
        let query_request = ` WHERE email = $1`
        query = query + query_request + ` RETURNING *`

        let result = await DB.query(query,input)
    
        return result
    }

    
    async Update_User(request, input, edit_input){

        let DB = await this.DB
        
            const EDIT_INPUT_PUSPOSE = edit_input.purpose
            let INTEGREATION_INPUT;

            switch(EDIT_INPUT_PUSPOSE){
                case('INTEGRATION'):
                INTEGREATION_INPUT = await this.Select_User(['id'],[edit_input.user_id])
                const LEGACY = INTEGREATION_INPUT[`${edit_input.target}`]
                const RENEWED_TARGET = input[request.indexOf(`${edit_input.target}`)]

                const TARGET_INDEX = request.indexOf(`${edit_input.target}`)
                input[TARGET_INDEX] = [...LEGACY, ...RENEWED_TARGET]
                break;

                default:
                break;
            }
        
        let query = `UPDATE user_info.foodscript_user `
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
        
            if(request.length === 1){
                query_request_1 = `${element} = $${index+1}`
            }
        
        })

        let query_request_2 = `WHERE id = $${request.length+1}`
        query = query + query_request_1 + query_request_2 + ` RETURNING *`

        let result = await DB.query(query, input)
        
        return result
    }

}

export default Database_Router_CAM;