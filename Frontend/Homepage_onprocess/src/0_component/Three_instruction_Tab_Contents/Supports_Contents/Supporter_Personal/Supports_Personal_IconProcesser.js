import React from "react";
import Personal_Despenser from "./Supports_Personal_Despenser";

export const Generating_SingleSupporters_icon = (props) => {
    
    switch ( typeof props.list ){
    
    case 'object':return<React.Fragment>

        <li><Personal_Despenser list={props.list[0]} /></li>
        <li><Personal_Despenser list={props.list[1]} /></li>
        <li><Personal_Despenser list={props.list[2]} /></li>
        <li><Personal_Despenser list={props.list[3]} /></li>
        <li><Personal_Despenser list={props.list[4]} /></li>
        <li><Personal_Despenser list={props.list[5]} /></li>
        <li><Personal_Despenser list={props.list[6]} /></li>
        <li><Personal_Despenser list={props.list[7]} /></li>
        <li><Personal_Despenser list={props.list[8]} /></li>

    </React.Fragment>
    
    case 'undefined':return<p>'preparing'</p>

}
}