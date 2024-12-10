import React from "react";
import {Link} from "react-router-dom"

import MyAccount_icon from '../../../1_image_or_icon/Script_icon.jpg'
import MyReviews_icon from '../../../1_image_or_icon/Pen_icon.jpg'
import MyJournals_icon from '../../../1_image_or_icon/Picket_icon.jpg'
import MyAlarms_icon from '../../../1_image_or_icon/Letter_icon.jpg'
import MyOptions_icon from '../../../1_image_or_icon/Filter_icon.jpg'

const Personalized_data_progresser = (props) => {
        

    switch(typeof props.id){
        
        case ('object'): 
        
            const UserData = props.id
        
            return <React.Fragment>
            <div id="Personalized_data_TabNevbar_Container">
            
            <Link className="Personalized_data_TabButton" to={`user/${UserData.id}/account?TabNevBar=opened`}>
            <img className="Personalized_data_TabIcon" src={MyAccount_icon}></img>
            <span>My Account </span></Link>
            
            <Link className="Personalized_data_TabButton" to={`user/${UserData.id}/reviews?TabNevBar=opened`}>
            <img className="Personalized_data_TabIcon" src={MyReviews_icon}></img>            
            <span>My Reviews</span></Link>
            
            <Link className="Personalized_data_TabButton" to={`user/${UserData.id}/journals?TabNevBar=opened`}>
            <img className="Personalized_data_TabIcon" src={MyJournals_icon}></img>            
            <span>My Journals</span></Link>
            
            <Link className="Personalized_data_TabButton" to={`user/${UserData.id}/alarms?TabNevBar=opened`}>
            <img className="Personalized_data_TabIcon" src={MyAlarms_icon}></img>            
            <span>Alarms</span></Link>
            
            <Link className="Personalized_data_TabButton" to={`user/${UserData.id}/options?TabNevBar=opened`}>
            <img className="Personalized_data_TabIcon" src={MyOptions_icon}></img>            
            <span>Options</span></Link>
            
            </div>
        </React.Fragment>

        case ('undefined'): return 'none';
    }

}

export default Personalized_data_progresser;