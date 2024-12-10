import React, { useEffect, useState } from "react";
import axios from 'axios';

import { Generating_SingleSupporters_icon } from "./Supports_Personal_IconProcesser";

export const Personal_Content = () => {
    
    const [ Supporters, update_SupporterList ] = useState()


        useEffect(()=>{
            axios.get('https://dummyjson.com/users').then(
                
            (result)=>{
                update_SupporterList(result.data.users)
                
            })
        },[])
    
    return <React.Fragment>
        
        <div id='Three_instruction_Tab_Content_Support_Personal_Part'>
            <div id='Personal_Supporters_Container_Title'>
                Supporters</div>
            <div id='Personal_Supporters_Container'>
                <Generating_SingleSupporters_icon list={Supporters}/>
                </div>
        </div>

    </React.Fragment>
}

export default Personal_Content