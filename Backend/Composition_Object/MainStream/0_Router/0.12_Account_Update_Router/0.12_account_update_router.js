import Pure_Router from "../0.0_Pure_Router/pure_router.js";

import Database_Router_CAM from "../0.6_DataBase_Router_ClinetAccountManager/database_router_CAM.js";
import Session_Crypto from "../0.10_Tools/0.10.3_Session_Crypto/session_crypto.js";

import {Buffer} from 'buffer'

class Account_Update_Router extends Pure_Router {

    constructor(){
    super()
    }

    Register_Updated_userinfo(input){
        
        this.userinfo = input
        this.status = 'verified'
        this.authorization = 'foodscript(local)'

    }

    Manage_account_update_Routes(){

        this.Pure_Router.patch('/', async (req, res)=>{
            let DB = new Database_Router_CAM()
            let session_crypto = new Session_Crypto()
            let result;

            if(Object.keys(req.body).length === 0){
                result={messsage: 'no other changes detected by user'}
            }
            else{
            switch(typeof req.session.data){
                
                case('string'):
                    let decrypted = await session_crypto.de_crypto(req.session.data)
                    const condition = await JSON.parse(decrypted)

                    switch(condition.status){
                        case('verified'):
             
                            let request = Object.keys(req.body)
                            let input = Object.values(req.body)

                            input.push(`${condition.userinfo.id}`)

                            if(request.includes('picture')){
                            input[request.indexOf('picture')] = Buffer.from(req.body.picture, 'base64')}
                        
                        result = await DB.Update_User(request, input)
                        this.Register_Updated_userinfo(result.rows[0])
                        console.log(result.rows[0])
                        break;
                    
                        case('unverified'):
                        result = {messsage:'account_update_rejected_insufficient authority'}
                        break;}
                    break;

                case('undefined'):
                    result = {messsage:'need_login'}
                    break;
                }

            }
            res.redirect(`/update_AccountData/sessionset`)


        })
    }
}

let account_updater = new Account_Update_Router();
account_updater.Manage_account_update_Routes()
let Account_Update_Routes = account_updater.Pure_Router
export { Account_Update_Routes, account_updater}