import express from 'express';

    export let Pure_Server = class Server {

        constructor(){
            let Pure_Server = express();
            this.Pure_Server = Pure_Server;
        }

        Listen_to_Port( port )
        { 
            try{
                this.Pure_Server.listen( process.env.PORT || port, ()=>{ console.log(`listening to 8080`) } )
            }
            catch(e){
                console.error(` Server has trouble with Port so Server can't work properly `)
            }
        }

    }

export default Pure_Server;