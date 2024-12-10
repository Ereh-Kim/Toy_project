import React, { useState } from "react";

export const Mini_Nevbar = (props) => {

    const [Current_paragraph, update_paragraph] = useState(props.paragraph[0])

    const Handle_Paragraph = (tab) => {
        
        const ParentNode = tab.target.parentNode.children
        const Values = Object.values(ParentNode)
        const Index = Values.indexOf(tab.target)

        update_paragraph(props.paragraph[Index])

    }

    return <React.Fragment>


        <p id="Mini_Nevbar_tab_section">
        
        <span onClick={Handle_Paragraph}>Client</span>
        &nbsp;/&nbsp;
        <span onClick={Handle_Paragraph}>Owner</span>

        </p>

        {Current_paragraph}


    </React.Fragment>

}