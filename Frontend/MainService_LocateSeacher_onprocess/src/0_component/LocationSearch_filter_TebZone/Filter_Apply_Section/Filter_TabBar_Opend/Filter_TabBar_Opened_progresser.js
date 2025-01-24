import React from "react";

import Filter_TabBar_Container from "./Filter_TabBar_Opened_Components/Filter_TabBar_Container";
import Filter_Option_Selector from "./Filter_TabBar_Opened_Components/Filter_Option_Selector";
import Opened_Toggler_Button from "./Filter_TabBar_Opened_Components/Opened_Toggler_Button";
import Keyword_popup from "./Filter_TabBar_Opened_Components/Keyword_popup";

import { useSelector } from "react-redux";

export const Filter_TabBar_Opened_progresser = (props) => {

    const options = props.options
    const NowUrl = useSelector(state => state.urlObject)

    return <React.Fragment>

        <Filter_TabBar_Container component={
            
            <React.Fragment>
            <Filter_Option_Selector option={options.option1} url={NowUrl}/>
            <Filter_Option_Selector option={options.option2}/>
            <Filter_Option_Selector option={options.option3}/>
            <Filter_Option_Selector option={options.option4}/>
            <Filter_Option_Selector option={options.option5}/>
            <Opened_Toggler_Button path={props.Gonna}/>

            <Keyword_popup/>
            
            </React.Fragment>} />
    
    </React.Fragment>

}

export default Filter_TabBar_Opened_progresser;