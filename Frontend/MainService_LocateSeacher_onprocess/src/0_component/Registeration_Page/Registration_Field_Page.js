import React from "react";

import { Link } from "react-router-dom";

import Tabicon from '../../1_image_or_icon/food_script_tabicon.png'
import Arrow from '../../1_image_or_icon/Arrow_Button_UpAhead.png'

export const Registration_Field_Page = (props) => {

    const Field_Dispenser = (type,name,id,value,readonly) => {

        return <React.Fragment>

        <div
        style={{
            width: 'inherit',

            display:'flex',
            flexDirection:'column',
            justifyContent:'space-around',

            fontFamily: '큐트신민상',
            fontSize: '4vw',
            fontWeight: 'bold',

            letterSpacing: '1vw',
            margin: '1.5vh 0vw'

        }}
        >

            <label htmlFor={id}
            style={{

            }}
            >
            {name.slice(0,1).toUpperCase()}{name.slice(1)}/
            </label>
            
            <input 
            type={type}
            name={name}
            id={id}
            value={value}
            style={{
                width:'inherit',
                
                margin: '1vh 0vw 1vh 0vw',
                padding: '0.5vh 3vw',

                borderRadius: '7px',

            }}
            readOnly={readonly}
            ></input>

        </div>

        </React.Fragment>

    }

    return <React.Fragment>
            <div
            style={{
            width:'inherit',
            height:'inherit',
            
            display:'flex',
            flexDirection:'column',

            justifyContent:'center',
            alignItems: 'center'
            }}
            >


                <Link
                    to={'..'}
                    >
                    <img
                    src={Arrow}
                    style={{
                        width: '10vw',

                        position: 'absolute',
                        top: '3vh',
                        left: '6vw',

                        transform: 'rotate(270deg)'
                    }}
                    ></img>
                    </Link>

                <span
                style={{
                    fontFamily:'큐트신민상',
                    fontSize: '10vw',

                    position: 'relative',
                    
                    bottom: '3vh',

                    textAlign: 'center'
                }}
                >
                Account
                <br></br>    
                Registration</span>
                <span
                style={{
                    fontFamily:'큐트신민상',
                    fontSize: '7vw',

                    position: 'relative',
                    
                    bottom: '2.5vh',

                    textAlign: 'center'
                }}
                >( as {props.purpose} )</span>

                <form
                action=""
                >

                <div
                style={{
                    width: 'fit-content',
                    backgroundColor: 'white',
                    padding: '1vh 2vw 1vh 2vw',
                    borderRadius: '15px',
                    border: 'black solid 1.5px'
                }}
                >

                    <div
                    style={{
                        border: 'black dashed 3px',
                        padding: '3vh 8vw 6vh 8vw',
                        borderRadius: '10px'
                    }}
                    >
                        
                        {Field_Dispenser('text','name','name')}

                        {Field_Dispenser('email','email','email')}


                        {Field_Dispenser('text','password','password')}

                        {Field_Dispenser('text', 'position', 'position', `${props.purpose}`, true)}

                        <input
                        type="button"
                        style={{
                            
                            width: '49vw',
                            // height: '3.5vh',

                            borderRadius: '10px',

                            padding: '1vh 0vw'
                        }}
                        value='Submit'
                        >
                        </input>

                    </div>

                </div>

                </form>

                <img
                src={Tabicon}
                style={{
                    width:'20vw',

                    position: 'relative',
                    top: '10vh'
                }}
                ></img>

            </div>

        </React.Fragment>
    

}

export default Registration_Field_Page