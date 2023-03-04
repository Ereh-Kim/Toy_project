import MainPage_Routes from '../../0_Router/0.1_MainPage_Router/mainpage_router.js';
import Pure_Server from '../../2_Server/2.0_Pure_Server/pure_server.js';


    export class Service_LocatorClass extends Pure_Server {

        constructor(){
        super()
        }

        Inject_Dependency()
        {
        
        this.Pure_Server.use('/homepage',MainPage_Routes)

        }

    }

export default Service_LocatorClass;