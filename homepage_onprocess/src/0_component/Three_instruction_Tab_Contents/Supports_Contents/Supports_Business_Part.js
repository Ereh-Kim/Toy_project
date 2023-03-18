import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Business_Content = () => {
    
    const [ Supporting_Businesses_Page , update_Page] = useState(0)
    
    const [ Supporting_Businesses_Icons , update_BusinessIcon] = useState()

    const [ Supporting_Businesses_Icons_TOTAL, update_List ] = useState()

    useEffect(()=>{
        axios.get('https://dummyjson.com/carts').then(
            (result)=>{
            
            update_List(result.data.carts)
            update_BusinessIcon(Generating_Business_icon())
                
        })
    },[Supporting_Businesses_Icons_TOTAL])

    const Generating_Business_icon = () =>{
        return <React.Fragment>
        <li className='Business_icon_Components'> {Supporting_Businesses_Icons_TOTAL[Supporting_Businesses_Page].id}</li>
        <li className='Business_icon_Components'> {Supporting_Businesses_Icons_TOTAL[Supporting_Businesses_Page+1].id}</li>
        <li className='Business_icon_Components'> {Supporting_Businesses_Icons_TOTAL[Supporting_Businesses_Page+2].id}</li>
        <li className='Business_icon_Components'> {Supporting_Businesses_Icons_TOTAL[Supporting_Businesses_Page+3].id}</li>
        <li className='Business_icon_Components'> {Supporting_Businesses_Icons_TOTAL[Supporting_Businesses_Page+4].id}</li>
        <li className='Business_icon_Components'> {Supporting_Businesses_Icons_TOTAL[Supporting_Businesses_Page+5].id}</li>
        <li className='Business_icon_Components'> {Supporting_Businesses_Icons_TOTAL[Supporting_Businesses_Page+6].id}</li>
        <li className='Business_icon_Components'> {Supporting_Businesses_Icons_TOTAL[Supporting_Businesses_Page+7].id}</li>
        </React.Fragment>
    }

    const Generating_Business_Page_Button = () => {

        async function Change_Contents  (tab) {
            const Value = Object.values(tab.target.parentNode.children)
            const Index = Value.indexOf(tab.target)
            update_Page(Index)
 
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
                {Supporting_Businesses_Icons}
            </div>
            <div id='Business_icon_Container_Page_Manager'>
                {Generating_Business_Page_Button()}
            </div>
        </div>

        </React.Fragment>
    )
}

export default Business_Content