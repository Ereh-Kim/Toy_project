import React from "react";

import Closed_Toggler_Button from "./Filter_TabBar_Closed_Components/Closed_Toggler_Button";
import Filter_TabBar_Container from "./Filter_TabBar_Closed_Components/Filter_TabBar_Container";

export const Filter_TabBar_Closed_progresser = (props) => {

    return <React.Fragment>

        <Filter_TabBar_Container component={<Closed_Toggler_Button path={props.Gonna}/>} />
    </React.Fragment>

}

export default Filter_TabBar_Closed_progresser;