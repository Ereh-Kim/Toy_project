import Pure_Router from '../0.0_Pure_Router/pure_router.js'

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

    class SearchPage_Router extends Pure_Router {

        constructor(){
        super()
        }

        Manage_MainPage_Routes(){

            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);            

            this.Pure_Router.use(express.static(path.join(__dirname, '../../../../../Frontend/MainService_LocateSeacher_onprocess','build')))

            this.Pure_Router.get('/foodscript-login',(req, res)=>{

                const ClientPage_path = path.join(__dirname, '../../../../../Frontend/MainService_LocateSeacher_onprocess/build', 'index.html')
                res.sendFile(ClientPage_path)

            })

            this.Pure_Router.get('/',(req, res)=>{

                const ClientPage_path = path.join(__dirname, '../../../../../Frontend/MainService_LocateSeacher_onprocess/build', 'index.html')
                res.sendFile(ClientPage_path)

            })
        
            this.Pure_Router.get('/location/**',(req, res)=>{

                const ClientPage_path = path.join(__dirname, '../../../../../Frontend/MainService_LocateSeacher_onprocess/build', 'index.html')
                res.sendFile(ClientPage_path)

            })

            this.Pure_Router.get(['/reviewer','/business'],(req, res)=>{

                const ClientPage_path = path.join(__dirname, '../../../../../Frontend/MainService_LocateSeacher_onprocess/build', 'index.html')
                res.sendFile(ClientPage_path)

            })

            this.Pure_Router.get(['/user/**'],(req, res)=>{

                const ClientPage_path = path.join(__dirname, '../../../../../Frontend/MainService_LocateSeacher_onprocess/build', 'index.html')
                res.sendFile(ClientPage_path)

            })
        }
    }

let SearchPage = new SearchPage_Router()
SearchPage.Manage_MainPage_Routes()

export let SearchPage_Routes = SearchPage.Pure_Router
export default SearchPage_Routes