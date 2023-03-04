import Pure_Router from '../0.0_Pure_Router/pure_router.js'

    class MainPage_Router extends Pure_Router {

        constructor(){
        super()
        }

        Manage_MainPage_Routes(){

            this.Pure_Router.get('/',(req, res)=>{
                res.send('hi')
            })
        }
    }

let MainPage = new MainPage_Router()
MainPage.Manage_MainPage_Routes()

export let MainPage_Routes = MainPage.Pure_Router
export default MainPage_Routes