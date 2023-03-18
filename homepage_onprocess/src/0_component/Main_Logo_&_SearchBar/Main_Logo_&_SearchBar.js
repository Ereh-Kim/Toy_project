import React from "react";
import { Main_Logo } from "./Main_Logo_&_SearchBar_Components/Main_Logo";
import { SearchBar } from "./Main_Logo_&_SearchBar_Components/SearchBar";


export const Main_Logo_SearchBar = () => {
    return(
        <React.Fragment>
            
            <Main_Logo/>
            <SearchBar/>

        </React.Fragment>
    )
}

export default Main_Logo_SearchBar