import React, { useState } from "react";
import Homepage_Standby_Image from './food_script_tabicon.png'

export const Three_TabNevBar_TabPart = (props) => {

    const [Current_Content, update_Content] = useState(
    
            <>

            <img id="Homepage_Standby_Image" src={Homepage_Standby_Image}/>
            <p id="Homepage_Standby_Instruction">
                <span>Welcome to Food Script</span>
                <br></br>
                <br></br>
                Click links 
                <br></br>
                <span>to interact with options</span>

            </p>


            </>

            )
    
    const Activate_Highlight = (tab) => {
        
        const ParentNode = tab.target.parentNode.children

        const TotalTabList = Object.keys(ParentNode)
        TotalTabList.forEach((element)=>{ParentNode[element].style.fontSize = '5vw'})

        tab.target.style.fontSize = '7vw'

    }

    const Handle_Body = (tab) => {

        const ParentNode_For_Handle = tab.target.parentNode.children
        
        const Values = Object.values(ParentNode_For_Handle)
        const Index = Values.indexOf(tab.target)

        update_Content(props.contents[Index])
    }

    const Homepage_Nevbar_Handler = (tab) => {
        Activate_Highlight(tab)
        Handle_Body(tab)
    }

    return(
        <React.Fragment>

        <div id="Three_TabNevBar_TabPart">
         <li onClick={Homepage_Nevbar_Handler}> Supports </li>
         <li onClick={Homepage_Nevbar_Handler}> How to Use </li>
         <li onClick={Homepage_Nevbar_Handler}> Purpose </li>
        </div>

        {Current_Content}

        </React.Fragment>
        
    )

}

export default Three_TabNevBar_TabPart