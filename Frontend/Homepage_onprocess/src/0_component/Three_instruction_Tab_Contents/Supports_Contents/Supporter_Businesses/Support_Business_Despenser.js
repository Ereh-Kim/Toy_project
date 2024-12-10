import React from "react";

export const Business_Despenser = (props) => {

    switch(typeof props.object[props.page]){
        case('object'): return <li className='Business_icon_Components'> {props.object[props.page].userId} </li>
        case('undefined'): return <li className='Business_icon_Components'> </li>
}}

export default Business_Despenser