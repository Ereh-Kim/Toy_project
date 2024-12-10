import Pure_Router from "../0.0_Pure_Router/pure_router.js";

import Database_Router_CAM from "../0.6_DataBase_Router_ClinetAccountManager/database_router_CAM.js";
import Session_Crypto from "../0.10_Tools/0.10.3_Session_Crypto/session_crypto.js";

class Account_Update_Router extends Pure_Router {

    constructor(){
    super()
    }

    Manage_account_update_Routes(){

        this.Pure_Router.patch('/',async (req, res)=>{
            let DB = new Database_Router_CAM()
            let session_crypto = new Session_Crypto()
            let result;

            switch(typeof req.session.data){
                case('string'):
                    let decrypted = await session_crypto.de_crypto(req.session.data)
                    const condition = await JSON.parse(decrypted)

                    switch(condition.status){
                        case('verified'):
                        result = await DB.Update_User(`${req.body}`,[`${req.body}`],`${condition.userinfo.email}`)
                        break;
                    
                        case('unverified'):
                        result = {messsage:'account_update_rejected_insufficient authority'}
                        break;}

                case('undefined'):
                    result = {messsage:'need_login'}}

            res.json(result)

        })
    }
}

let account_update_router = new Account_Update_Router();
account_update_router.Manage_account_update_Routes()
let Account_Update_Routes = account_update_router.Pure_Router
export default Account_Update_Routes