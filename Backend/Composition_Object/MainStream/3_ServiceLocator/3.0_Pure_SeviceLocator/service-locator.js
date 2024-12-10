import Pure_Server from '../../2_Server/2.0_Pure_Server/pure_server.js';

import MainPage_Routes from '../../0_Router/0.1_MainPage_Router/mainpage_router.js';
import {Google_certificater_Routes} from '../../0_Router/0.2_Google_Certification_Router/google_certification_router.js';
import {Local_Certificater_Routes} from '../../0_Router/0.7_Local_Certification_Router/local_certification_router.js';

import {Account_Register_Routes} from '../../0_Router/0.8_Account_Register_Router/account_register_router.js';

import {Session_Routes} from '../../0_Router/0.3_Session_Router/session_router.js';
import Body_Parser_Routes from '../../0_Router/0.4_Body_Parser_Router/body_parser.js';

import URL_History_Recorder_Routes from '../../0_Router/0.3_Session_Router/0.3.1_URL_History_Recorder/url_history_recorder.js';

import {Login_checker_api_Routes} from '../../0_Router/0.9_API/0.9.1_Login_Checker_API/login_checker_api.js';

import Account_Delete_Routes from '../../0_Router/0.11_Account_Delete_Router/0.11_account_delete_router.js';

    export class Service_LocatorClass extends Pure_Server {

        constructor(){
        super()
        }

        Inject_Dependency()
        {
        
        this.Pure_Server.use(Session_Routes)
        this.Pure_Server.use(Body_Parser_Routes)
        this.Pure_Server.use(URL_History_Recorder_Routes)

        this.Pure_Server.use('/homepage',MainPage_Routes)

        this.Pure_Server.use('/login/google',Google_certificater_Routes)
        this.Pure_Server.use('/login',Local_Certificater_Routes)

        this.Pure_Server.use('/registeration',Account_Register_Routes)

        this.Pure_Server.use('/login_check', Login_checker_api_Routes)
        
        this.Pure_Server.use('/delete', Account_Delete_Routes)
        }

    }

export default Service_LocatorClass;