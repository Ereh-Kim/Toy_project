import Pure_Router from '../0.0_Pure_Router/pure_router.js'

import session from 'express-session'
import Redis from 'redis';
import * as connectRedis from 'connect-redis';
import fs from 'fs'
import path from 'path'

class Session_Router extends Pure_Router {

        constructor(){
        super()
        }

        
        async Add_Session(name){

            // const certPath = path.join('public', 'redis_ca.pem');
            // const cert = fs.readFileSync(certPath);

            const RedisStore = connectRedis(session)

            const client = Redis.createClient({
                username: 'default',
                password: 'Fl52rbEQM4o9rUJjmbfHoQsBcJDG9zIH',
                socket: {
                    host: 'redis-18716.c270.us-east-1-3.ec2.redns.redis-cloud.com',
                    port: 18716
                }
            });

            client.on('error', err => console.log('Redis Client Error', err));

            await client.connect();

            await client.set('foo', 'bar');
            const result = await client.get('foo');
            console.log(result)

        this.Pure_Router.use(
            session({
            store: new RedisStore({client: client}),
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