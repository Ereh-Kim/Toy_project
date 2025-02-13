import Pure_Router from '../0.0_Pure_Router/pure_router.js'

import Session_Crypto from '../0.10_Tools/0.10.3_Session_Crypto/session_crypto.js'

import { google_certificater } from '../0.2_Google_Certification_Router/google_certification_router.js'
import { local_certificater } from '../0.7_Local_Certification_Router/local_certification_router.js'
import { account_updater } from '../0.12_Account_Update_Router/0.12_account_update_router.js'

import session from 'express-session'
import redis from 'redis'
import { RedisStore } from 'connect-redis'

class Session_Router extends Pure_Router {

        constructor(){
        super()
        }

        Add_Session(name){

        const redisClient = redis.createClient({
            url: process.env.REDIS_URL
        })

        this.Pure_Router.use(
            session({
            store: new RedisStore({ client: redisClient }),
            secret:"ereh0325",
            name:`${name}`,
            resave:false,
            saveUninitialized: false,
            rolling: true,
            cookie: {maxAge: 1000 * 60 * 60 * 6
                    // ,secure:true
                    // ,httpOnly: true
                    // ,sameSite: true
            }})
        )}

        async Patch_SessionData(path,data,message,destiny){

        this.Pure_Router.patch(`${path}`,async (req,res)=>{
            
            const session_crypto = new Session_Crypto()
            const input = await session_crypto.en_crypto(JSON.stringify(data))

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


        async Manage_session_Routes(){

        this.Add_Session('local_session')
        
        this.Patch_SessionData(`/googlelogin/sessionset`,google_certificater, 'Google Login Completed','/homepage')
        this.Patch_SessionData(`/locallogin/sessionset`,local_certificater, 'Food Script Login Completed','/homepage')
        this.Patch_SessionData(`/loginrejected/sessionset`,local_certificater, 'You should check your email & password again','/login/foodscript-login')
        this.Patch_SessionData(`/update_AccountData/sessionset`,account_updater, 'Your Account got updated', '/search')
        this.Clear_SessionData_Partial(`/logout`,'logout 확인','/homepage')

        }
    }

let Session = new Session_Router()
Session.Manage_session_Routes()

let Session_Routes = Session.Pure_Router
export {Session_Routes, Session_Router}