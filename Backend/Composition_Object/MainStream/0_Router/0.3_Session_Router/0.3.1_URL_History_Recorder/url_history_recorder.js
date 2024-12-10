import { Session_Router } from "../session_router.js";

class url_history_recorder extends Session_Router {

    constructor(){
    super()
    this.url_history = [];
    }

    async Manage_url_history(){

        this.Pure_Router.use(async (req,res,next)=>{
            let length = this.url_history.length

            switch(length){
                case(3):
                this.url_history.unshift(req.originalUrl)
                this.url_history.pop()
                break;
                
                default:
                this.url_history.unshift(req.originalUrl)
                break;
            }

            req.session.url_history = this.url_history

            next()
        })
    }
}

let url_history_recorder_router = new url_history_recorder();
url_history_recorder_router.Manage_url_history();
let URL_History_Recorder_Routes = url_history_recorder_router.Pure_Router
export default URL_History_Recorder_Routes;