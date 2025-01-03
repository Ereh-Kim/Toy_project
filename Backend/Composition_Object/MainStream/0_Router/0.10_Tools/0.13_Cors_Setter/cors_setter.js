import cors from 'cors';

import Pure_Router from '../../0.0_Pure_Router/pure_router.js'

class Cors_Setter extends Pure_Router {

    constructor(){
    super()
    }

    Manage_cors_Routes(){
        this.Pure_Router.use(cors({
            origin: ['http://localhost:3000'],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],  
            allowedHeaders: ['Content-Type'],  
            credentials: true
        }))
    }

}

let cors_setter = new Cors_Setter()
cors_setter.Manage_cors_Routes()
let Cors_Setter_Routes = cors_setter.Pure_Router
export {Cors_Setter, Cors_Setter_Routes}