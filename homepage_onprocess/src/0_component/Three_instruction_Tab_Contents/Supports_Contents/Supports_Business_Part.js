import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Generating_Business_icon from './Supports_Business_icon'

export const Business_Content = () => {

    const [Apidata,updateApi] = useState()
    const [Page, update_Page] = useState(0)

    useEffect(()=>{
        axios.get('https://dummyjson.com/carts').then(
            (result)=>{
            
            updateApi(result.data.carts)

            })
    },[])

    const Generating_Business_Page_Button = () => {

        async function Change_Contents  (tab) {
            const Value = Object.values(tab.target.parentNode.children)
            const Index = Value.indexOf(tab.target)
            update_Page(Index*8)
 
            const ParentNode = tab.target.parentNode.children
            const TotalList = Object.keys(ParentNode)
            TotalList.forEach((element)=>{
                ParentNode[element].style.fontSize = '5vw'
            })

            tab.target.style.fontSize = '7.5vw';
        }

        return <React.Fragment>
            
            <div className='Business_icon_Container_Page_Button_Component' onClick={Change_Contents}>•</div>
            <div className='Business_icon_Container_Page_Button_Component' onClick={Change_Contents}>•</div>
            <div className='Business_icon_Container_Page_Button_Component' onClick={Change_Contents}>•</div>
        
        </React.Fragment>
    }

    return(
        <React.Fragment>

        <div id='Three_instruction_Tab_Content_Support_Business_Part'>
            <div id='Business_icon_Container_Title'> Supporter Businesses </div>
            <div id='Business_icon_Container'>
                <Generating_Business_icon 
                object={Apidata}
                page={Page}
               />
            </div>
            <div id='Business_icon_Container_Page_Manager'>
                {Generating_Business_Page_Button()}
            </div>
        </div>

        </React.Fragment>
    )
}

export default Business_Content