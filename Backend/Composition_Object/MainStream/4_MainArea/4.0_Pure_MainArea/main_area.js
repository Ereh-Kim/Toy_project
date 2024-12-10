import Main_Server from "../../2_Server/2.1_Main_Server/main_server.js";

class MainArea {

    constructor
    ()
    {}

    Run(){
        
    let MainServer = new Main_Server()
    MainServer.Supply_Settled_Server()

    }

}

       let Application_MainArea = new MainArea;
           Application_MainArea.Run();
