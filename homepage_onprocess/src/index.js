import React from 'react';
import ReactDOM from 'react-dom/client';

import Account_nevbar from './0_component/Account_nevbar/Account_nevbar.js';
import Main_Logo_SearchBar from './0_component/Main_Logo_&_SearchBar/Main_Logo_&_SearchBar.js';
import Three_instruction_TabNevBar from './0_component/Three_instruction_TabNevbar/Three_instruction_TabNevbar.js';
import Business_Content from './0_component/Three_instruction_Tab_Contents/Supports_Contents/Supports_Business_Part.js'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

  <React.Fragment>
    
    <Account_nevbar />
    <Main_Logo_SearchBar/>
    <Three_instruction_TabNevBar/>
    <Business_Content/>
    

  </React.Fragment>
  
  </React.StrictMode>
);
