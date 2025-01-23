import Pure_Router from "../../0.0_Pure_Router/pure_router.js"

import Database_Router_CUCM from "../../0.6_DataBase_Router_ClinetAccountManager/0.6.1_DataBase_Router_ClientUsercreationManager/database_router_CUCM.js"

class Usercreation_R_Router extends Pure_Router {

    constructor(){
    super()
    }

    Manage_Loading_PostData_API(){

        this.Pure_Router.get('/read_reviews/:user_id', async (req,res)=>{

            const DB = new Database_Router_CUCM();
            const INPUT = Number(req.params.user_id)

            const result = await DB.Select_Post(['user_id'],[INPUT],'user_post','user_post',10)
            res.json({result:result})
        })

    }

}

let usercreation_r_router = new Usercreation_R_Router()
usercreation_r_router.Manage_Loading_PostData_API()

let Usercreation_R_Routes = usercreation_r_router.Pure_Router
export default Usercreation_R_Routes;