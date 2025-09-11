import Pure_Router from "../../0.0_Pure_Router/pure_router.js";

import Database_Router_CUCM from "../../0.6_DataBase_Router_ClinetAccountManager/0.6.1_DataBase_Router_ClientUsercreationManager/database_router_CUCM.js";

class Userreply_C_Router extends Pure_Router {

    constructor(){
    super()
    }

    Manage_userreply_c_Routes(){
        this.Pure_Router.post('/post_reply',async (req,res)=>{
            
            const DB = new Database_Router_CUCM();
            const id = Number(`${req.body.user_id}`)
            const parent_id = Number(`${req.body.parent_post_id}`)
            

            switch(req.body.source){
                case('google'):
                    const result = await DB.Create_Post([
                        'user_id','user_comment','parent_post'
                    ],[
                        id, req.body.user_comment, parent_id],
                    'user_comment_google', 'user_comment')
                    res.end()
                    break;
                case('origin'):
                    const result2 = await DB.Create_Post([
                        'user_id','user_comment','parent_post'
                    ],[
                        id, req.body.user_comment, parent_id],
                    'user_comment', 'user_comment')
                    res.end()
                    break;
                default:
                    return
            }
            
        })
    }

}

let userreply_c_router = new Userreply_C_Router()
userreply_c_router.Manage_userreply_c_Routes()

let Usercreation_C_Routes = userreply_c_router.Pure_Router
export default Usercreation_C_Routes;