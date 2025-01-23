import React, {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";

import My_Account from "./Personailized_Data_ReflectZone/My_Account";
import My_Reviews from "./Personailized_Data_ReflectZone/My_Reviews";
import My_Journals from './Personailized_Data_ReflectZone/My_Journals';
import My_Options from './Personailized_Data_ReflectZone/My_Options';
import My_Alarms from './Personailized_Data_ReflectZone/MY_Alarms'



export const Personalized_Data_Page_integrator = () => {

    const [ UserData, updateUserdata ] = useState(
        {
            userinfo:{
                    name:'stranger'
            },
            status:'unverified'
    }
    );    

    const login_check = async () => {

        let status = await fetch('/login_check')
        let status_data = await status.json()
        
        switch(status_data.message){
                
                case(`undefined_user_accessed`):
                break;

                case( undefined ):
                        switch(status_data.status){
                                
                                case('verified'):
                                updateUserdata(status_data)
                                break;

                                case('unverified'):
                                updateUserdata(status_data)
                                break;

                                default:
                                break;
                        }
                break;

                default:
                break;
        }


    }

    useEffect(()=>{
        login_check()
    },[])

    return <React.Fragment>

        <Routes>
            <Route 
            path="user/:userid/account"
            element={<My_Account
                id={UserData}
            />}
            />
            
            <Route
            path="user/:userid/reviews"
            element={<My_Reviews
                id={UserData}
            />}
            />

            <Route
            path="user/:userid/journals"
            element={<My_Journals/>}
            />

            <Route
            path="user/:userid/alarms"
            element={<My_Alarms/>}
            />

            <Route
            path="user/:userid/options"
            element={<My_Options/>}
            />

        </Routes>
    </React.Fragment>

}

export default Personalized_Data_Page_integrator