
import React from 'react'
import ReactDom from 'react-dom/client'
import { BrowserRouter as Routers } from 'react-router-dom'

import {Provider} from 'react-redux'
import {store} from './2_reducer/reducer'

import { APIProvider } from '@vis.gl/react-google-maps'

import Personalized_data_Part from './0_component/Personalized_data_TabNevBar/Personalized_data_Part'
import LocationSearch_filter_Part from './0_component/LocationSearch_filter_TebZone/LocationSearch_filter_Part'
import GetDetails_integrator from './0_component/Google_Api_Integation/Google_Map_Api/Google_Map_Api_Components/getDetail_Service_Component/GetDetail_page_integrator'

import Personalized_Data_Page_integrator from './0_component/Personalized_Data_Page/Personalized_Data_Page_integrator'
import Registration_Page from './0_component/Registeration_Page/Registration_Page'

const root = ReactDom.createRoot(document.getElementById('root'))

root.render(
    <React.Fragment>
        <Provider store={store}>
        
        <Routers basename='/search'>
            <Personalized_data_Part/>
                <APIProvider apiKey={`${process.env.REACT_APP_API}`}>
                    <LocationSearch_filter_Part/>    
                    <GetDetails_integrator/>
                </APIProvider>
            <Personalized_Data_Page_integrator/>
        </Routers>
           
        <Routers basename='/registration'>
            <Registration_Page/>

        </Routers>

        </Provider>
    </React.Fragment>
)