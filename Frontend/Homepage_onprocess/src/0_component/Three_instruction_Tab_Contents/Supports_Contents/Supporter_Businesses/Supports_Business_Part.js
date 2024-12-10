import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Generating_Business_icon from './Supports_Business_IconProsesser'

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

        function Change_Contents  (tab) {
            const Value = Object.values(tab.target.parentNode.children)
            const Index = Value.indexOf(tab.target)
            update_Page((Index-1)*8)
            Highlighter_IndexPart(tab)
        }

        function Highlighter_IndexPart (tab){
            const ParentNode = tab.target.parentNode.children
            const TotalList = Object.keys(ParentNode)
            TotalList.forEach((element)=>{
                ParentNode[element].style.color = 'white'           })

            tab.target.style.color = '#50bcdf';
        }

        function Swip_Next (tab){
            switch(Page){
                
                case 16:
                return;

                default:
                update_Page(Page => Page + 8)
                Highlighter_ArrowPart(tab,'increase')
            }
        }

        function Swip_Before (tab){
            switch(Page){
                
                case 0:
                return;

                default:
                update_Page(Page => Page - 8)
                Highlighter_ArrowPart(tab,'decrease')
            }
        }

        function Highlighter_ArrowPart (tab,heading) {

            let Value = Object.values(tab.target.parentNode.children)

            
            switch(heading){
            case 'increase':
            
            const Gonna_Highlight_Increased_Index = Value[Page/8+2]

            Value.forEach((element)=>{element.style.color = 'white'})
            Gonna_Highlight_Increased_Index.style.color = '#50bcdf';
            break;

            case 'decrease':

            const Gonna_Highlight_Index = Value[Page/8]

            Value.forEach((element)=>{element.style.color = 'white'})
            Gonna_Highlight_Index.style.color = '#50bcdf';
            break;

            }
        }

        return <React.Fragment>
            <div className='Business_icon_Container_Page_Button_Component' onClick={Swip_Before}> &lt;</div>            
            
            <div className='Business_icon_Container_Page_Button_Component' onClick={Change_Contents}>•</div>
            <div className='Business_icon_Container_Page_Button_Component' onClick={Change_Contents}>•</div>
            <div className='Business_icon_Container_Page_Button_Component' onClick={Change_Contents}>•</div>
        
            <div className='Business_icon_Container_Page_Button_Component' onClick={Swip_Next}> &gt;</div>
        </React.Fragment>
    }

    return(
        <React.Fragment>

        <div id='Three_instruction_Tab_Content_Support_Business_Part'>
            <div id='Business_icon_Container_Title'> Sponsor Businesses </div>
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