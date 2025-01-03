import Pure_Router from "../0.0_Pure_Router/pure_router.js";

import bodyParser from "body-parser";

 class Body_Parser_Router extends Pure_Router {

    constructor(){
    super()
    }

    Manage_body_parser_Routes(){

    this.Pure_Router.use(
        bodyParser.urlencoded({
            extended: true
        })
    )

    }

}

let Body_Parser = new Body_Parser_Router()
Body_Parser.Manage_body_parser_Routes()

export let Body_Parser_Routes = Body_Parser.Pure_Router
export default Body_Parser_Routes