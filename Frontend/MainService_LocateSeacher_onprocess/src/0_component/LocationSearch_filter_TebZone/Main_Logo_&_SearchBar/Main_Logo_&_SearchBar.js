import React from "react";

import MainLogo from '../Main_Logo_&_SearchBar/Main_Logo_&_SearchBar_Components/Main_logo'
import SearchBar from "../Main_Logo_&_SearchBar/Main_Logo_&_SearchBar_Components/SearchBar";

export const Main_Logo_SearchBar = () => {

    return <React.Fragment>

        <div id='MainLogo_SearchBar_Container'>
        <MainLogo/>
        <SearchBar/>
        </div>

    </React.Fragment>

}

export default Main_Logo_SearchBar;