import React, {useState} from "react";

import Curved_Arrow from '../../../1_image_or_icon/curved_arrow-icon.png'
import Homepage_Btn from "./Homepage_Btn.js";

import {Buffer} from 'buffer';

export const My_Account = (props) => {

    const [ EditOrRead, updateStatus ] = useState(false)
    const [ Account, updateAccount ] = useState({})

    const Default_Info_Dispenser = (section,text,input,type,FontSizeOption,edit_status) => {
        
        switch(edit_status){

        case(true):
        return <React.Fragment>
        <div
            className="MyAccount_Dispenser_Container">
                    <span
                    style={{
                        fontSize: '5.5vw'
                    }}
                    > 
                    {text}
                    </span>

                    <div>
                        <img
                        src={Curved_Arrow}
                        style={{
                            width:'5.5vw',
                            transform: 'rotate(270deg)'
                        }}>
                        </img>

                        <input
                        style={{
                            fontSize: FontSizeOption,
                            position: "relative",
                            left: '0.5vw',
                            
                            width: '30vw',
                            margin: '1vh',
                            padding: '1vh 0vw 1vh 2.5vw',
                            
                            borderRadius: '15px'
                        }}
                        name={section}
                        type={type}
                        defaultValue={input}
                        onChange={(e)=>{

                            let renew_account = {...Account}
                            renew_account[`${e.target.name}`] = e.target.value

                            updateAccount({
                                ...renew_account})

                            console.log({
                                ...renew_account
                            })
                            
                        }
                        
                        }
                        >
                        
                        </input>
                        
                    </div>

        </div></React.Fragment>
        
        case(false):
        return <div
            className="MyAccount_Dispenser_Container">
                    <span
                    style={{
                        fontSize: '5.5vw'
                    }}
                    > {text}
                    </span>

                    <div>
                        <img
                        src={Curved_Arrow}
                        style={{
                            width:'5.5vw',
                            transform: 'rotate(270deg)'
                        }}>
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

        default:
        return;

        }
    }

    const Default_Info_Dispenser_Position = (section,text,input,FontSizeOption,edit_status) => {
        
        switch(edit_status){

        case(true):
        return <React.Fragment>
        <div
            className="MyAccount_Dispenser_Container">
                    <span
                    style={{
                        fontSize: '5.5vw'
                    }}
                    > 
                    {text}
                    </span>

                    <div>
                        <img
                        src={Curved_Arrow}
                        style={{
                            width:'5.5vw',
                            transform: 'rotate(270deg)'
                        }}>
                        </img>

                        

                        <select
                        style={{
                            fontSize: FontSizeOption,
                            position: "relative",
                            left: '0.5vw',
                            
                            width: '30vw',
                            margin: '1vh',
                            padding: '1vh 0vw 1vh 2.5vw',
                            
                            borderRadius: '15px'
                        }}
                        defaultValue={props.id.userinfo.position}
                        name={section}
                        >
                         <option value={'business'}>business</option>
                         <option value={'reviewer'}>reviewer</option> 
                        </select>
                        
                        
                    </div>

        </div></React.Fragment>
        
        case(false):
        return <div
            className="MyAccount_Dispenser_Container">
                    <span
                    style={{
                        fontSize: '5.5vw'
                    }}
                    > {text}
                    </span>

                    <div>
                        <img
                        src={Curved_Arrow}
                        style={{
                            width:'5.5vw',
                            transform: 'rotate(270deg)'
                        }}>
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

        default:
        return;

        }
    }

    const Default_Info_Dispenser_ProfileImage = (input,edit_status) => {
        
        switch(edit_status){

        case(true):
        return <React.Fragment>
            <div
            className="MyAccount_Dispenser_Container">

                    <span
                    style={{
                        fontSize: '5.5vw'
                    }}
                    > Profile_Image
                    </span>

                    <div>
                        
                        <label htmlFor="picture">
                            <img
                            src={input}
                            style={{
                                width: '50vw',
                                objectFit: 'cover',
                                borderRadius: '10px',
                                border: 'black solid 3px',
                                margin: '0.8vh 0vw',
                                position: 'relative',
                                top: '1vh',
                                left: '0vw',
                                zIndex: 1,
                                opacity: '50%'
                            }}>
                            </img>
                            <div
                            style={{
                                position: 'relative',
                                zIndex: 2,
                                bottom: '16vh',
                                left: '15vw',
                                backgroundColor: 'white',
                                padding: '1vh 2vw',
                                width: 'fit-content',
                                borderRadius: '10px'
                            }}
                            >
                                Click Here
                                <br></br>
                                to Change
                            </div>
                        </label>

                        <input
                            name="picture"
                            id="picture"
                            type="file"
                            style={{
                                display:'none'
                            }}
                            onChange={(e)=>{
                                const file = e.target.files[0]
                                
                                if(file){
                                    const readerForUrl = new FileReader();
                                    readerForUrl.onload = function (event){

                                        const label = document.querySelector('label[for="picture"]');
                                        label.childNodes[0].src = event.target.result

                                        console.log(event.target.result.split(',')[1])

                                        updateAccount({
                                            ...Account,
                                            picture: `${event.target.result.split(',')[1]}`
                                        })
                                    }
                                    readerForUrl.readAsDataURL(file)
                                }
                            }}
                        ></input>

                    </div>

                </div>
        
        </React.Fragment>
        
        case(false):
        return <div
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
                        src={input}
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

        default:
        return;
        }
    }

    const BackBtn = () => {
        
        switch(EditOrRead){
                case(true):
                return <React.Fragment>
                <div
                    style={{
                        display: 'grid',
                        placeItems: 'center',
                       
                        width: 'inherit',
                        minHeight:'5vh',

                        margin: '1vh 0vw',

                        border: 'black solid 3px',
                        borderRadius: '13px',

                        backgroundColor: '#e8e8e8',
                        
                        fontSize: '6vw',
                        letterSpacing: '0.5vw'
                    }}>
                    <span
                    onClick={
                    async (e)=>{
                        switch(EditOrRead){
                            case(true):
                            updateStatus(false)
                            return;

                            case(false):
                            return;

                            default:
                            return;
                        }
                    }}>
                    Back
                    </span>
                    </div>
                    </React.Fragment>

                case(false):
                    return;
                }
    }

    const EdisSaveBtn = () => {
                let defaultvalue;        

                switch(EditOrRead){
                    case(true):
                    defaultvalue = 'Save'
                    break;

                    case(false):
                    defaultvalue = 'Edit'
                    break;
                }

                return <React.Fragment>
                <div
                    style={{
                        display: 'grid',
                        placeItems: 'center',
                       
                        width: 'inherit',
                        minHeight:'5vh',

                        margin: '1vh 0vw',

                        border: 'black solid 3px',
                        borderRadius: '13px',

                        backgroundColor: '#e8e8e8',
                        
                        fontSize: '6vw',
                        letterSpacing: '0.5vw'
                    }}>

                    <span
                    onClick={
                    async (e)=>{
                        switch(EditOrRead){
                            case(true):
                            let update = await fetch(`/update`,{
                                method:'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(
                                    Account
                                )
                            })
                            const update_data = await update.json()
                            
                            alert(`${update_data.message}`)
                            window.location.reload()

                            return;

                            case(false):
                            updateStatus(true)
                            return;
                        }
                    }}
                    >
                    {defaultvalue}
                    </span>
                </div>
                </React.Fragment>
    }


    switch(typeof props.id){

    case('undefined'):
    return <div>'wrong access'</div>

    case('object'):
        switch(props.id.status){
            case('verified'):
            const UserData = props.id.userinfo

            const rawdata = UserData.picture.data
            const UserImage_Data = Buffer.from(rawdata)
            const base64Image = UserImage_Data.toString('base64')
            const imgsrc = `data:image/jpg;base64,${base64Image}`;

            return <React.Fragment>

                <div
                className="Personalize_Data_Page_Container"
                >

                <Homepage_Btn/>

                <div
                className="Personalized_Data_Container_Aligner"
                >

                <span
                className="Personalized_Data_Page_TextTitle">
                My Account
                </span>

                <form
                method="PATCH"
                action="/update"
                >

                {Default_Info_Dispenser_ProfileImage(imgsrc, EditOrRead)}

                {Default_Info_Dispenser('name', 'Name',`${UserData.name}`, 'text', '5.5vw', EditOrRead)}

                {Default_Info_Dispenser('email', 'Email_Address',`${UserData.email}`, 'email', '4vw', EditOrRead)}

                {Default_Info_Dispenser('password', 'Password',`${UserData.password}`, 'password','4vw', EditOrRead)}
                
                {Default_Info_Dispenser_Position('position', 'Position',`${UserData.position}`,'4vw',EditOrRead)}

                {EdisSaveBtn()}
                {BackBtn()}

                </form>
                </div>

                

                </div>

            </React.Fragment>

            case('unverified'):
                console.log('unverified')
                return <React.Fragment>

                <div
                className="Personalize_Data_Page_Container"
                >

                    <Homepage_Btn/>

                <div
                className="Personalized_Data_Container_Aligner"
                >

                    <span
                    className="Personalized_Data_Page_TextTitle"
                    >
                    My Account
                    </span>

                    <br></br>

                    <span
                    className="Personalized_Data_Page_TextTitle"
                    >
                    This Page
                    <br></br>
                    Need Login
                    </span>

                </div>

                </div>

            </React.Fragment>
            
        }
    }

}

export default My_Account