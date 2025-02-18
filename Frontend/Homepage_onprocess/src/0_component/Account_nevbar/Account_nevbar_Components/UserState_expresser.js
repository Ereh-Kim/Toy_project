import React, { useEffect, useState } from "react";
import axios from 'axios'

export const UserState_expresser = (props) => {

  const [ Expresser, updateexpresser ] = useState()
  
  const check_login = async () => {

   let status = await fetch(`/login_check`)
   let status_data = await status.json()

    switch(status_data.message){
      
      case 'undefined_user_accessed' : 
        updateexpresser('새로운 계정으로 같이해요!');
        break;

      case undefined :
        updateexpresser(
          <div> 반가위용... 
          <a href="">{`${status_data.userinfo.name}`}</a>
            님 ! </div> );
        break;
    }

  }

  useEffect(()=>{
    check_login()
  },[])

  return (
    
    <React.Fragment>

      <div className="UserState_expresser Account_nevbar_child_components">
      {Expresser}
      </div>

    </React.Fragment>
  )
}

export default UserState_expresser