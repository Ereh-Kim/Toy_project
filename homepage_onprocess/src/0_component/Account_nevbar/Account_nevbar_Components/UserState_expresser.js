import React, { useEffect, useState } from "react";
import axios from 'axios'

export const UserState_expresser = (props) => {

  const [ UserState, updatestate ] = useState()
  const [ Expresser, updateexpresser ] = useState()
  
  useEffect(()=>{
    axios.get(
    // api url이나 session cookie 로, 회원데이터 로딩 및 확인
    'https://dummyjson.com/users/1'
    ).then((result)=>{

      switch(typeof result.data){
        
        case 'null' : 
          updatestate('Stranger');
        case 'object' :
          updatestate('User');
          return result.data.username;
      }
      // 개인정보 확인 이후, 컴포넌트에 전달 (인증절차 추가 예정)

      return result.data.username
    }).then((result)=>{

      switch(UserState){
        case 'Stranger' : updateexpresser('Join us with new account!');
        case 'User' : updateexpresser(
           <div> Hello user <a href="">{result}</a> ! </div> );
           // ㄴ> anchor 태그에 개인 계정으로 가는 참조 url 추가 예정
      }

    })
  })

  return (
    
    <React.Fragment>

      <div className="UserState_expresser Account_nevbar_child_components">
      {Expresser}
      </div>

    </React.Fragment>
  )
}

export default UserState_expresser