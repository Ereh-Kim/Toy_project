import React, { useState, useEffect } from "react";

export const Three_TabNevBar_TabPart = () => {

    const Activate_Highlight = (tab) => {
        
        const ParentNode = tab.target.parentNode.children

        const TotalTabList = Object.keys(ParentNode)
        TotalTabList.forEach((element)=>{ParentNode[element].style.fontSize = '5vw'})

        tab.target.style.fontSize = '7vw'

    }

    return(
        <React.Fragment>

        <div id="Three_TabNevBar_TabPart">
         <li onClick={Activate_Highlight}> Supports </li>
         <li onClick={Activate_Highlight}> How to Use </li>
         <li onClick={Activate_Highlight}> Purpose </li>
        </div>

        </React.Fragment>
        
    )

}

export default Three_TabNevBar_TabPart