import PureRouter from '../../0.0_Pure_Router/pure_router.js'

import Session_Crypto from '../../0.10_Tools/0.10.3_Session_Crypto/session_crypto.js';

class Login_Checker_Api extends PureRouter {

    constructor(){
    super()
    }

    async Check_verified(access){
        switch(access.status){
            case('verified'):
            return access;

            case('unverified'):

                switch(access.temporary_certification){
                    case('verified'):
                    return access;

                    case('unverified'):
                    const stranger = {
                    userinfo:{
                    id: 'undefined',
                    email: 'undefined',
                    name: 'undefined',
                    picture: 'undefined',
                    position: 'undefined'},
                    ...access}
                    return stranger;
                }
        }
    }

    async Manage_Login_Check(){

        const session_crypto = new Session_Crypto()

        this.Pure_Router.get('/',async (req,res)=>{

            console.log(req.session.data , 'from client side')
            let condition = req.session
            let result;

            switch(typeof condition.data){
                case('undefined'):
                result = {message: 'undefined_user_accessed'}
                break;

                case('string'):
                let decrypted = await session_crypto.de_crypto(req.session.data)
                condition = JSON.parse(decrypted)
                result = condition
                break;
            }

            res.json(result)
        })

    }

}

let login_checker_api = new Login_Checker_Api()
login_checker_api.Manage_Login_Check()
let Login_checker_api_Routes = login_checker_api.Pure_Router;
export {Login_checker_api_Routes,Login_Checker_Api};