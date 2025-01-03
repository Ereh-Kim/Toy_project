import React, { useState ,useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import MAIN_LOGO_SEARCHBAR from "./Main_Logo_&_SearchBar/Main_Logo_&_SearchBar";
import FILTER_TABBAR_PART from './Filter_Apply_Section/Filter_TabBar_Part'
import GOOGLE_MAP from '../Google_Api_Integation/Google_Map_Api/Google_Map_Api_Components/Google_Map'

import LOGIN_BTN from "../Personalized_Data_Page/Mini_LoginLogout_Btn/Login_Btn";
import LOGOUT_BTN from "../Personalized_Data_Page/Mini_LoginLogout_Btn/Logout_Btn";

export const LocationSearch_filter_Part = () => {

    const [ LoginBtn, updateBtn ] = useState()
    
    const check_login = async () =>{

        let status = await fetch(`/login_check`)
        let status_data = await status.json()
        
        switch(status_data.message){
            
            case(`undefined_user_accessed`):
            updateBtn(<LOGIN_BTN/>);
            break; 

            case( undefined ):
            updateBtn(<LOGOUT_BTN username={status_data.userinfo.name}/>);
            break;

            default:
            return;
        }

    }

    useEffect(()=>{

        check_login()

    },[])

    return <React.Fragment>

            <Routes>
                
                <Route path="/" element={
                    <div id='LocationSearch_filter_Container'>
                    {LoginBtn}
                    {/* <Logout_Btn/> */}
                    <MAIN_LOGO_SEARCHBAR/>
                    <FILTER_TABBAR_PART/>
                    <GOOGLE_MAP/>
                    </div>}>
                </Route>

            </Routes>

    </React.Fragment>
}

export default LocationSearch_filter_Part