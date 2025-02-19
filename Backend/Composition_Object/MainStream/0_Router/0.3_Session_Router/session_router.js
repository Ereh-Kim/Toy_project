import Pure_Router from '../0.0_Pure_Router/pure_router.js'

import session from 'express-session'
import {createClient} from 'redis';
import {RedisStore} from 'connect-redis';
import fs from 'fs'
import path from 'path'

class Session_Router extends Pure_Router {

        constructor(){
        super()
        }

        
        async Add_Session(name){

            // const certPath = path.join('public', 'redis_ca.pem');
            // const cert = fs.readFileSync(certPath);

            let redisClient = createClient({
                url: process.env.REDISCLOUD_URL,
                
            })
            redisClient.on('error', (err) => {
                console.error('Redis connection error:', err);
              });

              redisClient.on('connect', () => {
                console.log('Connected to Redis Cloud');
              });

            redisClient.connect().catch(console.error)

            let redisStore = new RedisStore({
                client: redisClient
            })

        this.Pure_Router.use(
            session({
            store: redisStore,
            secret:"ereh0325",
            name:`${name}`,
            resave:false,
            saveUninitialized: false,
            rolling: true,
            proxy: true,
            cookie: {
                    maxAge: 1000 * 60 * 60 * 6,
                    // secure: true,
                    // httpOnly: true,
                    // domain: '.foodscript.co.kr',
                    // sameSite: 'None'
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