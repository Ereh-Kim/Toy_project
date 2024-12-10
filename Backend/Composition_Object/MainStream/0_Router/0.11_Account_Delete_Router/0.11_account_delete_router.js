import Pure_Router from "../0.0_Pure_Router/pure_router.js";

import Database_Router_CAM from "../0.6_DataBase_Router_ClinetAccountManager/database_router_CAM.js";
import Session_Crypto from "../0.10_Tools/0.10.3_Session_Crypto/session_crypto.js";

class Account_Delete_Router extends Pure_Router {

    constructor(){
    super()
    }

    Manage_account_delete_Routes(){

        this.Pure_Router.delete('/',async (req, res)=>{
            let DB = new Database_Router_CAM()
            let session_crypto = new Session_Crypto()
            let result;

            switch(typeof req.session.data){
                case('string'):
                    let decrypted = await session_crypto.de_crypto(req.session.data)
                    const condition = await JSON.parse(decrypted)

                    switch(condition.status){
                        case('verified'):
                        result = await DB.Delete_User([`${condition.userinfo.email}`])
                        break;
                    
                        case('unverified'):
                        result = {messsage:'account_delete_rejected_insufficient authority'}
                        break;
                        }
                case('undefined'):
                    result = {messsage:'need_login'}

            }

            res.json(result)

        })
    }
}

let account_delete_router = new Account_Delete_Router();
account_delete_router.Manage_account_delete_Routes()
let Account_Delete_Routes = account_delete_router.Pure_Router
export default Account_Delete_Routes