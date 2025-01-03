import Pure_Router from '../../0.0_Pure_Router/pure_router';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';


class StaticFileSender_Setter extends Pure_Router {

    constructor(){
    super()        
    }

    Manage_StaticFile_Setter(){

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    this.Pure_Router.use(express.static(path.join(__dirname, 'public')))}

}

