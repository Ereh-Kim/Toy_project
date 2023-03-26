import React, { useEffect, useState } from "react";
import axios from 'axios';

export const Personal_Content = () => {
    
    const [ Supporters, update_SupporterList ] = useState()
    const [ Page, update_page ] = useState(0)

        useEffect(()=>{
            axios.get('https://dummyjson.com/users').then(
                
            (result)=>{
                update_SupporterList(result.data)
                console.log(result.data.users)
            })
        },[])
    
    return <React.Fragment>
        
        <div id='Three_instruction_Tab_Content_Support_Personal_Part'>
            <div id='Personal_Supporters_Container_Title'>
                Supporters</div>
            <div id='Personal_Supporters_Container'>

                </div>
        </div>

    </React.Fragment>
}

export default Personal_Content