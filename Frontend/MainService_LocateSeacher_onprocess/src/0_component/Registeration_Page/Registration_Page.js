import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import Registration_Default_Page from "./Registration_Default_Page";
import Registration_Field_Page from "./Registration_Field_Page";


export const Registration_Page = () => {

    return <React.Fragment>

        <Routes>
        <Route
        path='/'
        element= {<Registration_Default_Page/>}
        />

        <Route
        path="/business"
        element= {<Registration_Field_Page purpose='business'/>}
        />
        
        <Route
        path="/reviewer"
        element= {<Registration_Field_Page purpose='reviewer'/>}
        />

        </Routes>
        


    </React.Fragment>

}

export default Registration_Page