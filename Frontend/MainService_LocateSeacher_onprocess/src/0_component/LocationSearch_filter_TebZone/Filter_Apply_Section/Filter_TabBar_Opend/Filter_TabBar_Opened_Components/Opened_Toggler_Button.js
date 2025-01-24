import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const Closed_Toggler_Button = (props) => {

        const Dependecy = useLocation().search
        const Url = new URLSearchParams(Dependecy)
        Url.set('FilterTabBar',`${props.path}`)

        useEffect(()=>{
            Url.set('FilterTabBar',`${props.path}`)
        },[Dependecy])

        return <React.Fragment>

        <Link id='Closed_Toggler_Button' to={`?${Url.toString()}`}>
        <span>
        Close Filter 
        </span>
        </Link>

        </React.Fragment>

}

export default Closed_Toggler_Button;