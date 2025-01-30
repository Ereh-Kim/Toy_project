import Pure_Router from "../../0.0_Pure_Router/pure_router.js"

import Database_Router_CUCM from "../../0.6_DataBase_Router_ClinetAccountManager/0.6.1_DataBase_Router_ClientUsercreationManager/database_router_CUCM.js"

class Usercreation_D_Router extends Pure_Router {

    constructor(){
    super()
    }

    Manage_Delete_Post_API(){

        this.Pure_Router.delete('/delete_post', async (req,res)=>{

            const DB = new Database_Router_CUCM();
            const INPUT = req.body.id

            const result = await DB.Delete_Post( INPUT ,'user_post','user_post')
            res.json({result:result})
        })
    }

}

let usercreation_d_router = new Usercreation_D_Router()
usercreation_d_router.Manage_Delete_Post_API()

let Usercreation_D_Routes = usercreation_d_router.Pure_Router
export default Usercreation_D_Routes