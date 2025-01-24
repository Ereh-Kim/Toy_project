import React, { useEffect, useState } from "react";

import Filter_TabBar_Closed_progresser from "../Filter_Apply_Section/Filter_TabBar_Closed/Filter_TabBar_Closed_progresser";
import Filter_TabBar_Opened_progresser from "./Filter_TabBar_Opend/Filter_TabBar_Opened_progresser";
import { useLocation } from "react-router-dom";

export const Filter_TabBar_Part = () => {

    const Dependency = useLocation().search
    const Url = new URLSearchParams(Dependency)
    const Status = Url.get('FilterTabBar')
    

    useEffect(()=>{
    },[Status])


    switch(Status){

    case(null): return <React.Fragment>

    <Filter_TabBar_Closed_progresser Gonna='opened'/>

    </React.Fragment>

    case('opened'): return <React.Fragment>

    <Filter_TabBar_Opened_progresser 
        Gonna='closed'
        options={{
            option1:'What-(Menu)',
            option2:'Where-(Place)',
            option3:'When-(Purpose)',
            option4:'With Who-(Pernter)',
            option5:'Free Describe-(HashTag)'
        }}
        />

    </React.Fragment>

    case('closed'): return <React.Fragment>

    <Filter_TabBar_Closed_progresser Gonna='opened'/>

    </React.Fragment>

    }
}

export default Filter_TabBar_Part