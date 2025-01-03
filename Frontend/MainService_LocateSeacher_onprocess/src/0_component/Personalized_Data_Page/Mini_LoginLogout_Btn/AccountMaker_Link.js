import React from "react";

import pen_icon from '../../../1_image_or_icon/pen2.png'

export const ACCOUNT_MAKER_LINK = () =>{

    return <React.Fragment>

        <a
        href="../registration"
        >

        <div
        style={{
            display:'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            fontFamily: '큐트신민상',
            whiteSpace: "nowrap",
            height: '7vh'
        }}
        >

        <span>
        Join Us as a Memeber
        </span>

        <span>

        <img
        src={pen_icon}
        style={{
            width:'5vw'
        }}
        ></img>

        &nbsp;Sign up&nbsp;

        <img
        src={pen_icon}
        style={{
            width:'5vw',
            transform: 'scaleX(-1)'
        }}
        ></img>

        </span>
        

        </div>

        </a>


    </React.Fragment>

}

export default ACCOUNT_MAKER_LINK;