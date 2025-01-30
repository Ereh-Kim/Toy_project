import Pure_Router from "../../0.0_Pure_Router/pure_router.js";

import Database_Router_CUCM from "../../0.6_DataBase_Router_ClinetAccountManager/0.6.1_DataBase_Router_ClientUsercreationManager/database_router_CUCM.js";

import multer from 'multer'

class Usercreation_C_Router extends Pure_Router {

    constructor(){
    super()
    } 

    Manage_usercreation_c_Routes(){
 
        const storage = multer.memoryStorage()
        const upload = multer({storage: storage})

        this.Pure_Router.post('/post_review', upload.array('post_pictures'),async (req, res)=>{
            
            const DB = new Database_Router_CUCM()
            const id = Number(`${req.body.id}`)
            console.log(id)

            const PICTURE_BINARY_DATA = [];
             req.files.forEach((element)=>{
                PICTURE_BINARY_DATA.push(element.buffer)
            })

            const star_rating = Number(req.body.star_rating)
            console.log(star_rating)

            await DB.Create_Post(
                
                ['user_id','user_post_text', 'placecode','user_post_pictures',
                'placename','placepicture','star_rating','user_name'],
                
                [id, req.body.post_text, req.body.placecode, PICTURE_BINARY_DATA, 
                req.body.placename, req.body.placepicture, req.body.star_rating, req.body.user_name], 
                'user_post', 'user_post'
            )
            res.end()
        })

    }
 
}

let usercreation_c_router = new Usercreation_C_Router()
usercreation_c_router.Manage_usercreation_c_Routes()

let Usercreation_C_Routes = usercreation_c_router.Pure_Router
export default Usercreation_C_Routes