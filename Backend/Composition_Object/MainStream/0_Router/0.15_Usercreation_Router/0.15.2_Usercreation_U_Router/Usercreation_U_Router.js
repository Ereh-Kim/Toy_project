import Pure_Router from "../../0.0_Pure_Router/pure_router.js";
import { image_file_loader } from "../../0.10_Tools/0.10.7_Image_File_Loader/image_file_loader.js";

import Database_Router_CUCM from "../../0.6_DataBase_Router_ClinetAccountManager/0.6.1_DataBase_Router_ClientUsercreationManager/database_router_CUCM.js";

import multer, { memoryStorage } from 'multer'

class Usercreation_U_Router extends Pure_Router {

    constructor(){
    super()
    }

    Manage_Patching_PostData_API(){

        const storage = multer.memoryStorage()
        const upload = multer({storage: storage})

        this.Pure_Router.patch('/review/:review_id', upload.array('patch_pictures'), async (req,res)=>{
            
            const DB = new Database_Router_CUCM()
            
            const PICTURE_BINARY_DATA = [];

            req.files.forEach((element)=>{
                PICTURE_BINARY_DATA.push(element.buffer)
            })

            PICTURE_BINARY_DATA.forEach((e, index)=>{
                image_file_loader.Add_HTTP_Image_Router(
                    `/review/${req.body.review_id}`,
                    e, 'single', index
                )
            })

            await DB.Update_Post(
                
                ['user_post_pictures','user_post_text','star_rating'],
                
                [PICTURE_BINARY_DATA, req.body.patch_text, req.body.patch_star_rating, req.body.review_id, req.body.user_id],
                
                'user_post','user_post'
            ).then((res)=>{
                console.log(res)
            })

            console.log(req.files)
            console.log(req.files.length, 'req.files')
            
            



        })


    }

}

let usercreation_u_router = new Usercreation_U_Router()
usercreation_u_router.Manage_Patching_PostData_API()

let Usercreation_U_Routes = usercreation_u_router.Pure_Router
export default Usercreation_U_Routes;