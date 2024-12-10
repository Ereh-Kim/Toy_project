import React from "react";
import { Route, Routes } from "react-router-dom";

import My_Account from "./Personailized_Data_ReflectZone/My_Account";
import My_Reviews from "./Personailized_Data_ReflectZone/My_Reviews";
import My_Journals from './Personailized_Data_ReflectZone/My_Journals';
import My_Options from './Personailized_Data_ReflectZone/My_Options';
import My_Alarms from './Personailized_Data_ReflectZone/MY_Alarms'



export const Personalized_Data_Page_integrator = () => {

    return <React.Fragment>

        <Routes>
            <Route 
            path="user/:userid/account"
            element={<My_Account/>}
            />
            
            <Route
            path="user/:userid/reviews"
            element={<My_Reviews/>}
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