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
                username: 'default',
                password: 'Fl52rbEQM4o9rUJjmbfHoQsBcJDG9zIH',
                socket: {
                    host: 'redis-18716.c270.us-east-1-3.ec2.redns.redis-cloud.com',
                    port: 18716
                }
            })

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