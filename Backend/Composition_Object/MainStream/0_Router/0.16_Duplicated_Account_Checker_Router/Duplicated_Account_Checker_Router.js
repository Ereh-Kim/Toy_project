import Pure_Router from "../0.0_Pure_Router/pure_router.js";
import {Database_Router_DC} from '../0.6_DataBase_Router_ClinetAccountManager/0.6.2_DataBase_Router_Duplicate_Checker/database_router_DC.js'

class Duplicated_Account_Checker_Router extends Pure_Router {

    constructor(){
        super()
    }

    Manage_Duplicated_Resource(){

        this.Pure_Router.get('/account_name', async (req,res)=>{
    
            let DB = new Database_Router_DC
            
            let result = await DB.Check_duplicated_resource(req.query.name,'foodscript_user','user_info')



            res.send(result)

        })

    }

}

let duplicated_Account_Checker_Router = new Duplicated_Account_Checker_Router();
duplicated_Account_Checker_Router.Manage_Duplicated_Resource()

export let Duplicated_Account_Checker_Routes = duplicated_Account_Checker_Router.Pure_Router
export default {Duplicated_Account_Checker_Routes};