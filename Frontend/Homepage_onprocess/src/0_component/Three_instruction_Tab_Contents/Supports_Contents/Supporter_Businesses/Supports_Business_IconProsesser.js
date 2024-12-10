import React from "react"
import Business_Despenser from "./Support_Business_Despenser"

export const Generating_Business_icon = (props) =>{

        switch(typeof props.object){
            case(undefined): 
            
            return <React.Fragment>
            <li className='Business_icon_Components'> 'preparing...' </li>
            <li className='Business_icon_Components'> 'preparing...' </li>
            <li className='Business_icon_Components'> 'preparing...' </li>
            <li className='Business_icon_Components'> 'preparing...' </li>
            <li className='Business_icon_Components'> 'preparing...' </li>
            <li className='Business_icon_Components'> 'preparing...' </li>
            <li className='Business_icon_Components'> 'preparing...' </li>
            <li className='Business_icon_Components'> 'preparing...' </li>
            </React.Fragment>
            case('object'): 
            
            return <React.Fragment>
            <Business_Despenser object={props.object} page={props.page}/>
            <Business_Despenser object={props.object} page={props.page+1}/>
            <Business_Despenser object={props.object} page={props.page+2}/>
            <Business_Despenser object={props.object} page={props.page+3}/>
            <Business_Despenser object={props.object} page={props.page+4}/>
            <Business_Despenser object={props.object} page={props.page+5}/>
            <Business_Despenser object={props.object} page={props.page+6}/>
            <Business_Despenser object={props.object} page={props.page+7}/>
            </React.Fragment>
        }
    }


export default Generating_Business_icon