import React from "react";
import UserStranger_icon from '../../../1_image_or_icon/Profile_Stranger_icon.jpg'

import { Buffer } from "buffer";

const Personalized_data_ProfileSection = (props) => {
        
        switch(typeof props.id){
            
            case ('object'):
                
                const UserData = props.id.userinfo
                
                    switch(props.id.status){ 
                     
                        case('verified'):
                            const rawdata = UserData.picture.data
                            const UserImage_Data = Buffer.from(rawdata)
                            const base64Image = UserImage_Data.toString('base64')
                            const imgsrc = `data:image/jpg;base64,${base64Image}`;
                            
                            return <React.Fragment>
                            
                            <div id="UserProfile_Section_Container">
                                <p className="UserProfile_text">Profile</p>
                                <img id="UserProfile_img" src={imgsrc}></img>

                                <span className="UserProfile_text">Welcome</span>
                                <br></br>
                                <span className="UserProfile_text">
                                {UserData.name}</span>
                            </div>
                            </React.Fragment>
                        
                        case('unverified'):
                            return <React.Fragment>

                            <div id="UserProfile_Section_Container">
                                <p className="UserProfile_text">Profile</p>
                                <img id="UserProfile_img" src={UserStranger_icon}></img>

                                <span className="UserProfile_text">Welcome</span>
                                <br></br>
                                <span className="UserProfile_text">
                                {UserData.name}</span>
                            </div>
                            </React.Fragment>
                                            

                    }
            

            

            case ( 'undefined' ): return;

        }

    }

export default Personalized_data_ProfileSection;