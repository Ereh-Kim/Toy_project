import React, { useEffect, useState } from "react";

import Three_TabNevBar_TabPart from "./Three_instruction_TabNevbar_components/Three_TabNevbar_TabPart";

import Supporter_Contents_Container from "../Three_instruction_Tab_Contents/Supports_Contents/Supporter_Contents_Contianer";
import How_to_Use_Contents_Container from "../Three_instruction_Tab_Contents/How_to_Use_Contents/How_to_Use_Contents_Container";
import Purpose_Contents_Container from "../Three_instruction_Tab_Contents/Purpose_Contents/Purpose_Contents_Container";

export const Three_instruction_TabNevBar = (props) => {

    const [ Owned_Content, updateContent] = 
    useState([
        Supporter_Contents_Container,
        How_to_Use_Contents_Container,
        Purpose_Contents_Container
        ])

    return(
        <React.Fragment>
            <Three_TabNevBar_TabPart contents={Owned_Content}/>
        </React.Fragment>
    )

}

export default Three_instruction_TabNevBar