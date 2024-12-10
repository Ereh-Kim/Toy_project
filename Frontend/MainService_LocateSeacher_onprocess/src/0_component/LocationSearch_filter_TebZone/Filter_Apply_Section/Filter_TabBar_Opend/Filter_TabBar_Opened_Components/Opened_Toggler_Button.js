import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const Closed_Toggler_Button = (props) => {

        const Url = new URLSearchParams(document.location.search)
        Url.set('FilterTabBar',`${props.path}`)
        const Dependecy = useLocation().search

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