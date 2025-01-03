import React from "react";

export const Logout_Btn = (props) => {

    return <React.Fragment>

        <div
        style={{
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'end',
            fontFamily: '큐트신민상'
        }}
        >

        <span
        style={{
            padding: '0.5vh 2vw'
        }}
        >
        Welcome Back, {props.username}
        </span>

        <span
        style={{
            backgroundColor: 'white',
            padding: '0.5vh 2vw',
            borderRadius: '10px',
            
        }}
        >
        <a href="/logout">
        Logout
        </a>

        </span>

        </div>


    </React.Fragment>

}

export default Logout_Btn