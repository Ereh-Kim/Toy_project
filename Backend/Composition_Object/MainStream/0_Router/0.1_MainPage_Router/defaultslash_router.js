import Pure_Router from "../0.0_Pure_Router/pure_router.js";

    class DefaultSlash_Router extends Pure_Router {

        constructor(){
            super()
        }

        Manage_DefaultSlash_Routes(){

            this.Pure_Router.get('/',(req, res)=>{

                res.redirect('/search')          
            
            })

        }

    }

let DefaultSlash = new DefaultSlash_Router()
DefaultSlash.Manage_DefaultSlash_Routes()

export let DefaultSlash_Routes = DefaultSlash.Pure_Router
export default DefaultSlash_Routes;