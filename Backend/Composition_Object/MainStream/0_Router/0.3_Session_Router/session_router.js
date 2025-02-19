import Pure_Router from '../0.0_Pure_Router/pure_router.js'

import Session_Crypto from '../0.10_Tools/0.10.3_Session_Crypto/session_crypto.js'

import { google_certificater } from '../0.2_Google_Certification_Router/google_certification_router.js'
import { local_certificater } from '../0.7_Local_Certification_Router/local_certification_router.js'
import { account_updater } from '../0.12_Account_Update_Router/0.12_account_update_router.js'

import session from 'express-session'
import redis from 'redis'
import { RedisStore } from 'connect-redis'
import fs from 'fs'
import path from 'path'

class Session_Router extends Pure_Router {

        constructor(){
        super()
        }

        
        async Add_Session(name){

            // const certPath = path.join('public', 'redis_ca.pem');
            // const cert = fs.readFileSync(certPath);

            const redisClient = redis.createClient({
                username: 'default',
                password: 'cnivn8o4EEYHEtcH0EW0LZoVYFcSlrd9',
                socket: {
                    host: 'redis-19543.c90.us-east-1-3.ec2.redns.redis-cloud.com',
                    port: 19543
                }
            });
            await redisClient.connect()

        this.Pure_Router.use(
            session({
            store: new RedisStore({ client: redisClient }),
            secret:"ereh0325",
            name:`${name}`,
            resave:false,
            saveUninitialized: false,
            rolling: true,
            cookie: {
                    maxAge: 1000 * 60 * 60 * 6,
                    secure: true,
                    httpOnly: true,
                    sameSite: true
            }})
        )}


        async Manage_session_Routes(){

        await this.Add_Session('local_session')
        
        }
    }

let Session = new Session_Router()
Session.Manage_session_Routes()

let Session_Routes = Session.Pure_Router
export {Session_Routes, Session_Router}