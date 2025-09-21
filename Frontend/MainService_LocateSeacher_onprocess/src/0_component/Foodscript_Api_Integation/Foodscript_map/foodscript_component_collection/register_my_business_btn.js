import React from "react";

export const register_my_business_btn = () => {

    return <React.Fragment>

        <div
        style={{
        fontFamily: '큐트신민상',
        width: '75%',
        textAlign: 'center',
        fontSize: '22px',
        letterSpacing: '1.5px',
        wordSpacing: '5px',
        border: 'black solid 3px',
        borderBottom: 'black solid 6px',
        padding: '8px 0px',
        borderRadius:'15px',
        position: 'relative',
        zIndex: 3,
        backgroundColor: 'rgba(252, 183, 181, 1)'
        }}
        >
            
            Register 
            <br></br>
            My Business
        </div>

        <div
        style={{
            fontSize:'60px',
            backgroundColor: 'white',
            width: '70%',
            textAlign: 'center',
            padding: '0 0 30px 0',
            position: 'relative',
            bottom: '10px',
            zIndex: 1,
            borderRadius: '15px',
            borderBottom: '#afafafff solid 7.5px'
        }}
        >
        {`\u{1F4BC}`}
        </div>


        <span
        style={{
            position:'relative',
            fontSize:'14px',
            bottom:'45px',
            zIndex: 5
        }}
        >
            Click here to Save
        </span>
    
    
    </React.Fragment>

}

export default register_my_business_btn;