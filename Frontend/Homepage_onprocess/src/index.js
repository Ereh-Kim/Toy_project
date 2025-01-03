import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  BrowserRouter as Routers,
  Route,
  Routes } from 'react-router-dom'

import Account_nevbar from './0_component/Account_nevbar/Account_nevbar.js';
import Main_Logo_SearchBar from './0_component/Main_Logo_&_SearchBar/Main_Logo_&_SearchBar.js';

import Three_instruction_TabNevBar from './0_component/Three_instruction_TabNevbar/Three_instruction_TabNevbar.js';

import Footer from './0_component/Footer_nevbar/Footer_nevbar.js';
import Page_Preparing_Noticement from './0_component/Footer_nevbar/Footer_nevbar_Components/Page_Preaparing_Noticement.js';

import Login_Page_integrator from './0_component/Login_page/Login_page_integrator.js';
import Foodscript_login_page from './0_component/Login_page/foodscript_version_LocalVersion/foodscript_login_page.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

  <React.Fragment>

    <Routers
    basename='/homepage'
    >
    <Account_nevbar />
    <Main_Logo_SearchBar/>

    <Routes>
    
      <Route
      path='/'
      element={<Three_instruction_TabNevBar/>}
      />
    
      <Route
      path='/Notice'
      element={<Page_Preparing_Noticement/>}
      />

      <Route
      path='/How_to_Contact'
      element={<Page_Preparing_Noticement/>}
      />

      <Route
      path='/Community'
      element={<Page_Preparing_Noticement/>}
      />

      <Route
      path='/About_us'
      element={<Page_Preparing_Noticement/>}
      />

    </Routes>
    <Footer/>

    </Routers>

    <Routers
    basename='/login'>
      <Routes>

      <Route
      path='/'
      element={<Login_Page_integrator/>}
      />

      <Route
      path='/foodscript-login'
      element={<Foodscript_login_page/>}
      />

      </Routes>

    </Routers>

  </React.Fragment>
  
  </React.StrictMode>
);
