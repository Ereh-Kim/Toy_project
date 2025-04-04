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

        async Create_MemoryStorage(){
            
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

            return redisStore
        }
        
        async Add_Session(name){

            // const certPath = path.join('public', 'redis_ca.pem');
            // const cert = fs.readFileSync(certPath);

        if(process.env.PRODUCTION_ENV === 'production'){
        var redisStore = await this.Create_MemoryStorage()}
        
        this.Pure_Router.use(
            session({
            store: process.env.PRODUCTION_ENV === 'production'
                   ? redisStore
                   : undefined ,
            secret: `${process.env.SESSION_SECRET}`,
            name: `${name}`,
            resave:false,
            saveUninitialized: true,
            rolling: true,
            proxy: true,
            secure: process.env.PRODUCTION_ENV === 'production'
            ? true
            : false,
            cookie: {
                    maxAge: 1000 * 60 * 60 * 6,
                    secure: process.env.PRODUCTION_ENV === 'production'
                   ? true
                   : false,
                    httpOnly: process.env.PRODUCTION_ENV === 'production'
                    ? true
                    : false,
                    domain: process.env.PRODUCTION_ENV === 'production'
                    ? '.foodscript.co.kr'
                    : '',
                    sameSite: process.env.PRODUCTION_ENV === 'production'
                    ? 'lax'
                    : 'lax'
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