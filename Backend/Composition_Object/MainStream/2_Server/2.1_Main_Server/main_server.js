import Service_LocatorClass from "../../3_ServiceLocator/3.0_Pure_SeviceLocator/service-locator.js";

    export class Main_Server extends Service_LocatorClass {

        constructor(){
        super()
        }

        Supply_Settled_Server(){
            super.Inject_Dependency()
            super.Listen_to_Port(8080)
        }
       
    }

export default Main_Server