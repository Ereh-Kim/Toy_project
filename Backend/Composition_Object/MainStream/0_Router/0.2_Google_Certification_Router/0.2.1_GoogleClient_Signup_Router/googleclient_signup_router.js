import Pure_Router from "../../0.0_Pure_Router/pure_router.js";

import { Password_Genarator } from "../0.10_Tools/0.10.1_Password_Genagrator_API/password_genarator_api.js";
import { File_Reader } from "../0.10_Tools/0.10.2_File_Reader_API/file_reader.js";

import { google_certification_router } from "../google_certification_router.js";
import Database_Router_CAM from "../../0.6_DataBase_Router_ClinetAccountManager/database_router_CAM.js";

export class GoogleClient_Signup_Router extends Pure_Router {

    Manage_GoogleClient_Signup(){

        this.Pure_Router.get('/',async(req,res)=>{

            let UserInfo;

            // const G_Certificater = new google_certification_router
            // await G_Certificater.Register_verified_UserInfo(UserInfo, 'verified', 'verified', 'google')
            
            // let password_genarator = new Password_Genarator();
            // let file_reader = new File_Reader();

            // const DB = new Database_Router_CAM
            // let condition = await DB.Create_NewUser(UserInfo.email, 
            //     [`${UserInfo.email}`,
            //      `${UserInfo.name}`,
            //       await file_reader.read_file(`./public/Profile_Stranger_icon.jpg`),
            //       `${password_genarator.genarate_password(8)}`,
            //       `reviewer`])
            
            //     switch(condition){
                    
            //         case('Need_To_Find'):
            //         res.redirect('/login')
            //         return;

            //         default:
            //             const approved_session = await fetch(`${process.env.DOMAIN}/googlelogin/sessionset`,{
            //                 method: 'PATCH'
            //             })
            //             const approved_session_data = await approved_session.json()
                        
            //             req.session.data = approved_session_data.user_info
            //             res.write(`<script>alert('${approved_session_data.message}')</script>`)
            //             res.write(`<script>window.location=\"${approved_session_data.redirectUrl}\"</script>`);
            //             res.end()
            //         break;
            //     }

        })
    
    }

}