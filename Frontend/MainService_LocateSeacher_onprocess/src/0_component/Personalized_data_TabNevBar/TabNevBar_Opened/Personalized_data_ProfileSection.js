import React from "react";
import UserStranger_icon from '../../../1_image_or_icon/Profile_Stranger_icon.jpg'

const Personalized_data_ProfileSection = (props) => {
        
        switch(typeof props.id){
            
            case ('object'):
                const UserData = props.id
                
                return <React.Fragment>

                <div id="UserProfile_Section_Container">
                    <p className="UserProfile_text">Profile</p>
                    <img id="UserProfile_img" src={UserStranger_icon}></img>

                    <span className="UserProfile_text">Welcome</span>
                    <br></br>
                    <span className="UserProfile_text">
                    {UserData.firstName}</span>
                </div>

            

            </React.Fragment>

            case (`undefined`): return;

        }

    }

export default Personalized_data_ProfileSection;