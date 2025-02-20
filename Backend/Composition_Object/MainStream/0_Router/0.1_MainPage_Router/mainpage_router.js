import Pure_Router from '../0.0_Pure_Router/pure_router.js'

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

    class MainPage_Router extends Pure_Router {

        constructor(){
        super()
        }

        Manage_MainPage_Routes(){

            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);

            this.Pure_Router.use(express.static(path.join(__dirname, '../../../../../Frontend/Homepage_onprocess','build')))

            this.Pure_Router.get('/',(req, res)=>{

                const ClientPage_path = path.join(__dirname, '../../../../../Frontend/Homepage_onprocess/build', 'index.html')
                console.log(req.session + " session data")
                console.log(req.protocol + ' protocol')
                console.log(req.headers + ' headers')
                res.sendFile(ClientPage_path)
                

            })

            this.Pure_Router.get('/*',(req, res)=>{

                const ClientPage_path = path.join(__dirname, '../../../../../Frontend/Homepage_onprocess/build', 'index.html')
                res.sendFile(ClientPage_path)
                console.log(req.session + " session data")
                console.log(req.protocol + ' protocol')
                console.log(req.headers + ' headers')

            })

        }
    }

let MainPage = new MainPage_Router()
MainPage.Manage_MainPage_Routes()

export let MainPage_Routes = MainPage.Pure_Router
export default MainPage_Routes