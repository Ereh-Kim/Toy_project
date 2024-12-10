import React, { useEffect } from "react";

import Default_Info from './Default_Info.js'
import { Route, Routes } from "react-router-dom";

export const GetDetails_integrator = () => {

    return <React.Fragment>
    
        <Routes>
            <Route 
            path="location/:placeid"
            element={<Default_Info/>}
            >
            </Route>

            <Route
            path='location/:placeid/:index'
            element={<Default_Info/>}
            >
                
            </Route>
        </Routes>

        </React.Fragment>
}

export default GetDetails_integrator