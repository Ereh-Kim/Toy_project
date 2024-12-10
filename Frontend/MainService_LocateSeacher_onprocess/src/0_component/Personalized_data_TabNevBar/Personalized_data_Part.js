import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

import ToggleButton_img from '../../1_image_or_icon/Door_icon.jpg'


import Personalized_data_progresser from "./TabNevBar_Opened/Personalized_data_progresser"
import Personalized_data_ProfileSection from "./TabNevBar_Opened/Personalized_data_ProfileSection"
import OnOff_Toggler from "./TabNevBar_Toggler/TabNevBar_OnOff_Toggler.js";

import Personalized_data_progresser_Closed from "./TabNevBar_Closed/Personalized_data_progresser";

const Personalized_data_Part = () => {

    const [ UserData, updateUserdata ] = useState();
    const Status = new URLSearchParams(document.location.search).get('TabNevBar')
    const Dependency = useLocation().search

    useEffect(()=>{
        axios.get('https://dummyjson.com/users').then(
            
            (result)=>{ 
                const CertifiedUsers = result.data.users[0]
                updateUserdata(CertifiedUsers)

                // 해당 부분은 개인정보 인증 이후에 서버단에서 정제한 후의 데이터를 전송하는 것으로 기획
                // 차우선적으로 프론트단에서 정제하여 다룰 수 있게끔만 한 것임
             }
        )
        
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