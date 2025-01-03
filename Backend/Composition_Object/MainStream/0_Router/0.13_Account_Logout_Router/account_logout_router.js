import Pure_Router from "../0.0_Pure_Router/pure_router.js";

export class Account_Logout_Router extends Pure_Router{

    constructor(){
    super()
    }

    Manage_Account_Logout(){

        this.Pure_Router.get('/',(req,res)=>{

            res.redirect('/logout/sessionset')

        })

    }

}

let account_logout_router = new Account_Logout_Router()
account_logout_router.Manage_Account_Logout()
let Account_Logout_Routes = account_logout_router.Pure_Router
export default Account_Logout_Routes;