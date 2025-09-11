import Pure_Router from "../../0.0_Pure_Router/pure_router.js";

import Database_Router_CUCM from "../../0.6_DataBase_Router_ClinetAccountManager/0.6.1_DataBase_Router_ClientUsercreationManager/database_router_CUCM.js";

import { image_file_loader } from "../../0.10_Tools/0.10.7_Image_File_Loader/image_file_loader.js";

class Userreply_R_Router extends Pure_Router {

    constructor(){
    super()
    }

    Manage_userreply_r_Routes(){
        this.Pure_Router.get('/read_reply/:parent_post/:post_origin',async (req,res)=>{

            const DB = new Database_Router_CUCM()

            let reply_result;

            switch(req.params.post_origin){
                case('google'):
                    reply_result = await DB.Select_Post(['parent_post'],[Number(req.params.parent_post)],'user_comment_google', 'user_comment', 10)
                break;

                case('foodscript'):
                    reply_result = await DB.Select_Post(['parent_post'],[Number(req.params.parent_post)],'user_comment', 'user_comment', 10)
                break;

            }
            
            
            res.json({result:reply_result})
        })

        this.Pure_Router.get('/read_replyer/:section/:replyer_id', async(req, res)=>{

            const DB = new Database_Router_CUCM()

            let replyer;

            replyer = await DB.Select_Post(['id'],[Number(req.params.replyer_id)],'foodscript_user','user_info',1)
            
            switch(req.params.section){
                
                case('profile_picture'):
                const data = replyer[0].picture
                image_file_loader.Add_HTTP_Image_Router(`/user/${req.params.replyer_id}/profile_img`, data, 'single', 0)
                break;

                default:
                break;
            }

            // replyer = replyer[0].picture


            res.json({
                url: `/imagedata/user/${req.params.replyer_id}/profile_img/0`,
                name: replyer[0].name
            })
            
        })

        // this.Pure_Router.get('/')

    }

}

let userreply_c_router = new Userreply_R_Router()
userreply_c_router.Manage_userreply_r_Routes()

let Userreply_C_Routes = userreply_c_router.Pure_Router
export default Userreply_C_Routes
