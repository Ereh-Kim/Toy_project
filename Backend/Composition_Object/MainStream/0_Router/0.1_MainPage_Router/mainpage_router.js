import Pure_Router from '../0.0_Pure_Router/pure_router.js'


    class MainPage_Router extends Pure_Router {

        constructor(){
        super()
        }

        Manage_MainPage_Routes(){

            
            this.Pure_Router.get('/',(req, res)=>{
                req.session.text ='text'
                
                
                console.log(req.session,'from homepage')
            
                res.send('homepage')
            })
        
            this.Pure_Router.get('/text',(req,res)=>{
                console.log(req.session,'from text')
                res.send('text')
            })

            this.Pure_Router.get('/test',(req,res)=>{
                console.log(req.session,'from test')
                res.send('test')
            })
        }
    }

let MainPage = new MainPage_Router()
MainPage.Manage_MainPage_Routes()

export let MainPage_Routes = MainPage.Pure_Router
export default MainPage_Routes