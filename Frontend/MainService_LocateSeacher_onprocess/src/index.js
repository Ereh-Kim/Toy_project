
import React from 'react'
import ReactDom from 'react-dom/client'
import { Route, Routes, BrowserRouter as Routers } from 'react-router-dom'

import {Provider} from 'react-redux'
import {store} from './2_reducer/reducer'

import { APIProvider } from '@vis.gl/react-google-maps'

import PERSONALIZED_DATA_PART from './0_component/Personalized_data_TabNevBar/Personalized_data_Part'
import LOCATIONSEARCH_FILTER_PART from './0_component/LocationSearch_filter_TebZone/LocationSearch_filter_Part'
import GETDETAILS_INTEGRATOR from './0_component/Google_Api_Integation/Google_Map_Api/Google_Map_Api_Components/getDetail_Service_Component/GetDetail_page_integrator'

import PERSONAILZED_DATA_PAGE_INTEGRATOR from './0_component/Personalized_Data_Page/Personalized_Data_Page_integrator'
import REGISTRATION_PAGE from './0_component/Registeration_Page/Registration_Page'
import Register_Page_integrator from './0_component/Register_page/Register_page_integrator'

import LOGIN_PAGE_INTEGRATOR from './0_component/Login_page/Login_page_integrator'
import FOODSCRIPT_LOGIN_PAGE from './0_component/Login_page/foodscript_version_LocalVersion/foodscript_login_page'

import FOODSCIPT_PAGE from './0_component/Foodscript_Api_Integation/Foodscript_map/foodscript_map_integrater.js'

const root = ReactDom.createRoot(document.getElementById('root'))

root.render(
    <React.Fragment>
        <Provider store={store}>
        
        <Routers basename='/search'>
            
            <PERSONALIZED_DATA_PART/>
            
                <APIProvider apiKey={`${process.env.REACT_APP_API}`}>
                    <LOCATIONSEARCH_FILTER_PART/>    
                    <GETDETAILS_INTEGRATOR/>
                </APIProvider>
            
            <PERSONAILZED_DATA_PAGE_INTEGRATOR/>

            <Routes>
                <Route
                    path='/log-visit'
                    element={<FOODSCIPT_PAGE/>}
                />
            </Routes>

        </Routers>

        <Routers basename='/registration'>
            <Routes>
                <Route
                    path='/'
                    element={<Register_Page_integrator/>}
                />
                <Route
                    path='/fieldpage'
                    element={<REGISTRATION_PAGE/>}
                >
                    <Route
                        path='business'
                        element={<REGISTRATION_PAGE/>}
                    />
                    <Route
                        path='reviewer'
                        element={<REGISTRATION_PAGE/>}
                    />

                </Route>
            </Routes>
        </Routers>

        <Routers basename='/login'>
            <Routes>
                <Route
                    path='/'
                    element={<LOGIN_PAGE_INTEGRATOR/>}
                />
                <Route
                    path='/foodscript-login'
                    element={<FOODSCRIPT_LOGIN_PAGE/>}
                />
            </Routes>
        </Routers>

        </Provider>
    </React.Fragment>
)