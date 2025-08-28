import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Buffer } from "buffer";

import Tabicon from '../../1_image_or_icon/food_script_tabicon.png'
import Arrow from '../../1_image_or_icon/Arrow_Button_UpAhead.png'

export const Registration_Field_Page = (props) => {

    const [imageURL, updateURL] = useState(false)
    const [notice,      updateNOTICE] = useState({
        nameField: { status: false,
                     OKorErr: true,
                     OK_message: ' This name is available',
                     Err_message: ' This name is already in use' },
        emailField: { status: false,
                     OKorErr: true,
                     OK_message: ' This email is available',
                     Err_message: ' This email is already in use' }
            })

    let nameTimer;
    let emailTimer;

    const Field_Dispenser = ( type, name, id, value, 
                            readonly, staticText, event, 
                            notice_option, notice_boolean, notice_section) => {

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

            <label htmlFor={id}>
            {name.slice(0,1).toUpperCase()}{name.slice(1)}/
            </label>

            {notice_option?<label
                                style={{
                                    fontSize:'15px',
                                    letterSpacing: '2px',
                                    width:'fit-content',
                                    padding: '3px 7px',
                                    borderRadius: '4px',
                                    margin: '5px 0px 0px 0px',
                                    border: notice_boolean?'':'',
                                    
                                    backgroundColor: notice_boolean?'#FFC300':'red'
                                }}

            
                            >
                            {notice_boolean
                            ?notice[`${notice_section}`][`OK_message`]
                            :notice[`${notice_section}`][`Err_message`]}
                            </label>
                            :''}

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
            readOnly={readonly?staticText:null}
            onChange={event}
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
                action='/registration'
                method='POST'
                encType="multipart/form-data"
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
                        
                        {Field_Dispenser('text','name','name', null, false, '',
                            async (e)=>{
                                const nameRegex = /^[a-zA-Z0-9가-힣]*$/;
                                clearTimeout(nameTimer)
                                
                                nameTimer = setTimeout(async ()=>{
                                        const nameVaild = nameRegex.test(e.target.value)

                                        switch(nameVaild){
                                            case(true):
                                            const result = await fetch(`/check_duplicates/account_name?name=${e.target.value}`)
                                            const result_data = await result.json()
                                            console.log(result_data)
                                            
                                            if(e.target.value.length>0 && result_data.check_result == true){
                                                updateNOTICE(prev=>({
                                                ...prev,
                                                nameField: { status: true,
                                                            OKorErr: true,
                                                            OK_message: 'This name is available',
                                                            Err_message: 'This name is already in use' }

                                            }))
                                            }

                                            if(e.target.value.length==0){
                                                updateNOTICE(prev=>({
                                                ...prev,
                                                nameField: { status: false,
                                                            OKorErr: true,
                                                            OK_message: 'This name is available',
                                                            Err_message: 'This name is already in use' }

                                            }))
                                            }

                                            if(e.target.value.length>0 && result_data.check_result == false){
                                                updateNOTICE(prev=>({
                                                ...prev,
                                                nameField: { status: true,
                                                            OKorErr: false,
                                                            OK_message: 'This name is available',
                                                            Err_message: 'This name is already in use' }
                                            }))
                                            }
                                            break;
                                        
                                            case(false):
                                            updateNOTICE(prev=>({
                                                ...prev,
                                                nameField: { status: true,
                                                            OKorErr: false,
                                                            OK_message: 'This name is available',
                                                            Err_message: 'Invaild user name...' }
                                            }))
                                        
                                        }
                                },500)
                            },notice.nameField.status, notice.nameField.OKorErr,'nameField'
                        )}

                        {Field_Dispenser('email','email','email', null, false, '',
                            async (e)=>{

                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                clearTimeout(nameTimer)
                                
                                nameTimer = setTimeout(async ()=>{
                                    const emailVaild = emailRegex.test(e.target.value)

                                    
                                    switch(emailVaild){
                                        case(true):
                                            const result = await fetch(`/check_duplicates/account_email?email=${e.target.value}`)
                                            const result_data = await result.json()
                                            console.log(result_data)
                                            
                                            if(result_data.check_result == true){
                                                updateNOTICE(prev=>({
                                                ...prev,
                                                emailField: { status: true,
                                                            OKorErr: true,
                                                            OK_message: ' This email is available',
                                                            Err_message: ' This email is already in use'}       

                                            }))
                                            }

                                            if(result_data.check_result == false){
                                                updateNOTICE(prev=>({
                                                ...prev,
                                                emailField: { status: true,
                                                            OKorErr: false,
                                                            OK_message: ' This email is available',
                                                            Err_message: ' This email is already in use'}       

                                            }))
                                            }

                                            break;

                                        case(false):
                                            updateNOTICE(prev=>({
                                                ...prev,
                                                emailField: { status: true,
                                                            OKorErr: false,
                                                            OK_message: ' This email is available',
                                                            Err_message: ' Invaild email address... '}
                                            }))

                                    }
                                    },500)
                            }, notice.emailField.status, notice.emailField.OKorErr, 'emailField'
                         )}

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

                                
                                
                                <div
                                style={{
                                    border: 'black dotted 5px',
                                    textAlign: 'center',
                                    padding: '1vh 0vw',
                                    borderRadius: '5px'
                                }}
                                >

                                <label 
                                 htmlFor={`picture`}
                                 id='picture_label'
                                 onChange={(e)=>{
                                    const target = e.target.files
                                    const reader = new FileReader()
                                    reader.readAsDataURL(target[0])
                                 }}
                                 
                                 >
                                    {imageURL?'':'Picture'}
                                    
                                    <img
                                 src={imageURL}
                                 style={{
                                    width: imageURL.length?'70%':'0%'
                                 }}
                                 >
                                 </img>
                                
                                </label>

                                </div>

                                <input 
                                type='file'
                                name='picture'
                                id='picture'
                                style={{
                                    display: 'none',
                                    maxWidth:'40vw',
                                    
                                    margin: '1vh 0vw 1vh 0vw',
                                    padding: '0.5vh 3vw',

                                    borderRadius: '7px',
                                }}
                                onChange={
                                    (e)=>{
                                        const file = e.target.files[0];  
        
                                        if (file) {
                                        const reader = new FileReader();
                                        reader.readAsDataURL(file);
        
                                        reader.onload = function(e) {
                                            const arrayBuffer = e.target.result;
                                            updateURL(arrayBuffer)  
                                            console.log(arrayBuffer)
                                        };
        
                                        reader.onerror = function(e) {
                                            console.error('Error reading file', e);
                                        }
                                        }
                                        
                                    }
                                    }
                                ></input>

                            </div>

                        {Field_Dispenser('text','password','password', null, false, '', null
                        )}

                        {Field_Dispenser('text', 'position', 'position', `${props.purpose}`, `${props.purpose}`, false)}

                        <input
                        type="submit"
                        style={{
                            
                            width: '54vw',
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