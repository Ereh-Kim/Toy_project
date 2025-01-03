import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import ToggleButton_img from '../../1_image_or_icon/Door_icon.jpg'


import Personalized_data_progresser from "./TabNevBar_Opened/Personalized_data_progresser"
import Personalized_data_ProfileSection from "./TabNevBar_Opened/Personalized_data_ProfileSection"
import OnOff_Toggler from "./TabNevBar_Toggler/TabNevBar_OnOff_Toggler.js";

import Personalized_data_progresser_Closed from "./TabNevBar_Closed/Personalized_data_progresser";

const Personalized_data_Part = () => {

    const [ UserData, updateUserdata ] = useState();
    const Dependency = useLocation().search
    const Status = new URLSearchParams(Dependency).get('TabNevBar')

    const login_check = async () => {

        let status = await fetch('/login_check')
        let status_data = await status.json()
        
        
        switch(status_data.message){
                
                case(`undefined_user_accessed`):
                updateUserdata({
                        userinfo:{
                                name:'stranger'
                        },
                        status:'unverified'
                })
                break;

                case( undefined ):
                        switch(status_data.status){
                                
                                case('verified'):
                                console.log(status_data,'verified')
                                updateUserdata(status_data)
                                break;

                                case('unverified'):
                                console.log(status_data,'unverified')
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

    },[Status])

    switch(Status){

        case (null): return <React.Fragment>
                <div id="Personalized_data_Container">
                <OnOff_Toggler src={ToggleButton_img} id="ToggleButton"/>
                <Personalized_data_progresser_Closed/>
                </div>
                </React.Fragment>

        case ('opened') : return <React.Fragment>
                <div id="Personalized_data_Container">
                <OnOff_Toggler src={ToggleButton_img} id="ToggleButton"/>
                <Personalized_data_ProfileSection id={UserData}/>
                <Personalized_data_progresser id={UserData}/>
                </div>
                </React.Fragment>

        case ('closed') : return <React.Fragment>
                <div id="Personalized_data_Container">
                <OnOff_Toggler src={ToggleButton_img} id="ToggleButton"/>
                <Personalized_data_progresser_Closed/>
                </div>
                </React.Fragment>

        }
}

export default Personalized_data_Part;