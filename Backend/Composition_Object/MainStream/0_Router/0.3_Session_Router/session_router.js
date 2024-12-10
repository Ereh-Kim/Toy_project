import Pure_Router from '../0.0_Pure_Router/pure_router.js'

import Session_Crypto from '../0.10_Tools/0.10.3_Session_Crypto/session_crypto.js'

import { google_certificater } from '../0.2_Google_Certification_Router/google_certification_router.js'
import { local_certificater } from '../0.7_Local_Certification_Router/local_certification_router.js'

import session from 'express-session'

class Session_Router extends Pure_Router {

        constructor(){
        super()
        }

        Add_Session(name){

        this.Pure_Router.use(
            session({
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

        async Add_SessionData(path,data,destiny){

        this.Pure_Router.get(`${path}`,async (req,res)=>{

            const session_crypto = new Session_Crypto()
            const input = await session_crypto.en_crypto(JSON.stringify(data))

            req.session.data = input
            res.redirect(destiny)
        
        })}


        async Manage_session_Routes(){

        this.Add_Session('local_session')
        
        this.Add_SessionData(`/googlelogin/sessionset`,google_certificater,'/homepage')
        this.Add_SessionData(`/locallogin/sessionset`,local_certificater, '/homepage')

        this.Add_SessionData(`/loginrejected/sessionset`,local_certificater, '/homepage')

        }
    }

let Session = new Session_Router()
Session.Manage_session_Routes()

let Session_Routes = Session.Pure_Router
export {Session_Routes, Session_Router}