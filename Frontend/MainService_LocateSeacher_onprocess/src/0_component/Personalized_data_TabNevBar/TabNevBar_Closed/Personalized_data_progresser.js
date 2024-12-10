import React from "react";

import OnOff_Toggler from "../TabNevBar_Toggler/TabNevBar_OnOff_Toggler";

import MyAccount_icon from '../../../1_image_or_icon/Script_icon.jpg'
import MyReviews_icon from '../../../1_image_or_icon/Pen_icon.jpg'
import MyJournals_icon from '../../../1_image_or_icon/Picket_icon.jpg'
import MyAlarms_icon from '../../../1_image_or_icon/Letter_icon.jpg'
import MyOptions_icon from '../../../1_image_or_icon/Filter_icon.jpg'

export const Personalized_data_progresser = () => {

    return <React.Fragment>
    
    <OnOff_Toggler className="Personalized_data_TabButton_Closed" src={MyAccount_icon} />
    <OnOff_Toggler className="Personalized_data_TabButton_Closed" src={MyReviews_icon} />
    <OnOff_Toggler className="Personalized_data_TabButton_Closed" src={MyJournals_icon} />
    <OnOff_Toggler className="Personalized_data_TabButton_Closed" src={MyAlarms_icon} />
    <OnOff_Toggler className="Personalized_data_TabButton_Closed" src={MyOptions_icon} />

    </React.Fragment>

}

export default Personalized_data_progresser