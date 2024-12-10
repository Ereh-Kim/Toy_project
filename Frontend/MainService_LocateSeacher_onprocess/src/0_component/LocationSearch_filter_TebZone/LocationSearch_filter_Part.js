import React from "react";
import { Route, Routes } from "react-router-dom";

import Main_Logo_SearchBar from "./Main_Logo_&_SearchBar/Main_Logo_&_SearchBar";
import Filter_TabBar_Part from './Filter_Apply_Section/Filter_TabBar_Part'
import Google_Map from '../Google_Api_Integation/Google_Map_Api/Google_Map_Api_Components/Google_Map'

import Login_Btn from "../Personalized_Data_Page/Mini_LoginLogout_Btn/Login_Btn";
import Logout_Btn from "../Personalized_Data_Page/Mini_LoginLogout_Btn/Logout_Btn";

export const LocationSearch_filter_Part = () => {

    return <React.Fragment>

            <Routes>
                
                <Route path="/" element={
                    <div id='LocationSearch_filter_Container'>
                    <Login_Btn/>
                    {/* <Logout_Btn/> */}
                    <Main_Logo_SearchBar/>
                    <Filter_TabBar_Part/>
                    <Google_Map/>
                    </div>}>
                </Route>

            </Routes>

    </React.Fragment>
}

export default LocationSearch_filter_Part