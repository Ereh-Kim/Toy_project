import React from "react";

import Curved_Arrow from '../../../1_image_or_icon/curved_arrow-icon.png'
import Profile_Stranger from '../../../1_image_or_icon/Profile_Stranger_icon.jpg'

export const My_Account = () => {

    const Default_Info_Dispenser = (section,input,FontSizeOption) => {
        return <div
            className="MyAccount_Dispenser_Container"
        >

                    <span
                    style={{
                        fontSize: '5.5vw'
                    }}
                    > {section}
                    </span>

            <div>
                <img
                src={Curved_Arrow}
                style={{
                    width:'5.5vw',
                    transform: 'rotate(270deg)'
                }}
                >
                </img>
                <span
                style={{
                    fontSize: FontSizeOption,
                    position: "relative",
                    left: '1.5vw',
                    bottom: '0.5vh'
                }}
                >
                {input}
                </span>
            </div>

        </div>
    }

    return <React.Fragment>

        <div
        className="Personalize_Data_Page_Container"
        >

        <a href="/search">
        go home
        </a>

        <div
        className="Personalized_Data_Container_Aligner"
        >

        

        <span
        className="Personalized_Data_Page_TextTitle"
        >
         My Account
        </span>

        <div
        className="MyAccount_Dispenser_Container"
        >

            <span
            style={{
                fontSize: '5.5vw'
            }}
            > Profile_Image
            </span>

            <div>
                
                <img
                src={Profile_Stranger}
                style={{
                    maxWidth: '20vw',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    border: 'black solid 3px',
                    margin: '0.8vh 0vw',
                    position: 'relative',
                    top: '1vh',
                    left: '0vw'
                }}
                onTouchStart={(e)=>{
                    e.target.style.maxWidth= '60vw'
                }}
                onTouchEnd={(e)=>{
                    e.target.style.maxWidth= '20vw'
                }}
                >
                
                </img>
            </div>

        </div>

        {Default_Info_Dispenser('Name',' "kim" ', '5.5vw')}

        {Default_Info_Dispenser('Phone Number', '010-4876-2977', '4vw')}

        {Default_Info_Dispenser('Email_Address', 'ereh_@naver.com', '4vw')}

        {Default_Info_Dispenser('Address', '서울특별시 송파구 풍성로 14길 44-5', '3vw')}
        
        {Default_Info_Dispenser('I D', 'ereh_@naver.com')}

        {Default_Info_Dispenser('Password', 'ereh0325')}
        
        {Default_Info_Dispenser('Position', 'Reviewer')}

        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',

                width: 'inherit',
                minHeight:'5vh',

                margin: '1vh 0vw',

                border: 'black solid 3px',
                borderRadius: '13px',

                backgroundColor: '#e8e8e8',
                
                fontSize: '6vw',
                letterSpacing: '0.5vw'
            }}
        >
            <span>
            Edit
            </span>
        </div>

        </div>

        

        </div>

    </React.Fragment>

}

export default My_Account