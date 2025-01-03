import React from "react"

export const Login_Btn = () => {

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
        Welcome Join &#8658;
        </span>

        <a href="/login">
        <span
        style={{
            backgroundColor: 'white',
            padding: '0.5vh 2vw',
            borderRadius: '10px',
        }}
        >
        Login
        </span>
        </a>

        </div>

    </React.Fragment>

}

export default Login_Btn;