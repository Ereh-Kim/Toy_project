import React, { useState, useEffect } from "react";

import {Link} from 'react-router-dom';

export const LogInOut_button = () => {

    const [ Button , updateBtn ] = useState(' Login')
    const [ BtnLink, updateLink ] = useState()

    const check_login = async () => {

        let status = await fetch(`http://localhost:8080/login_check`)
        let status_data = await status.json()
     
        console.log(status_data, 'at brower')
        switch(status_data.message){
           
           case 'undefined_user_accessed' : 
           updateBtn('Login')
           updateLink('/login')
           break;
     
           case undefined :
           updateBtn('Log Out')
           updateLink('/logout')
           break;
        }
     
       }

    useEffect(()=>{
        check_login()
    },[])

    return (
        <React.Fragment>

        <div className="LogInOut_button Account_nevbar_child_components" >
            <a href={`${BtnLink}`}>
        {Button}
            </a>
        </div>

        </React.Fragment>
    )
}