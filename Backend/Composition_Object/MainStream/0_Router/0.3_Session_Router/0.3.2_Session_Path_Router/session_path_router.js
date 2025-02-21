import { Session_Router } from '../session_router.js'

import Session_Crypto from '../../0.10_Tools/0.10.3_Session_Crypto/session_crypto.js'

import { google_certificater } from '../../0.2_Google_Certification_Router/google_certification_router.js'
import { local_certificater } from '../../0.7_Local_Certification_Router/local_certification_router.js'
import { account_updater } from '../../0.12_Account_Update_Router/0.12_account_update_router.js'

class Session_Path_Router extends Session_Router {

        constructor(){
        super()
        }

        async Patch_SessionData(path,data,message,destiny){

        this.Pure_Router.patch(`${path}`,async (req,res)=>{
            
            const session_crypto = new Session_Crypto()
            const input = await session_crypto.en_crypto(JSON.stringify(data))

            console.log(data + 'data is in ' + path + input)

            res.json({
                message: `${message}`,
                redirectUrl: `${destiny}`,
                user_info: input
            })
        })

        }

        async Clear_SessionData_Partial(path,message,destiny){

        this.Pure_Router.get(`${path}`,async (req,res)=>{
            
            let refined_session_data = req.session
            delete refined_session_data.data

            console.log(refined_session_data, 'logout_check')

            res.send(`<script>
                alert('${message}')
                window.location=\"${destiny}\"
                </script>`)
        })

        }


        async Manage_session_path_Routes(){

            console.log(local_certificater + 'data is in ' + '/locallogin')

        await this.Patch_SessionData(`/googlelogin`,google_certificater, 'Google Login Completed','/homepage')
        await this.Patch_SessionData(`/locallogin`,local_certificater, 'Food Script Login Completed','/homepage')
        await this.Patch_SessionData(`/loginrejected`,local_certificater, 'You should check your email & password again','/login/foodscript-login')
        await this.Patch_SessionData(`/update_AccountData`,account_updater, 'Your Account got updated', '/search')
        await this.Clear_SessionData_Partial(`/logout`,'logout 확인','/homepage')

        }
    }

let Session_Path = new Session_Path_Router()
Session_Path.Manage_session_path_Routes()

let Session_Path_Routes = Session_Path.Pure_Router
export {Session_Path, Session_Path_Routes}