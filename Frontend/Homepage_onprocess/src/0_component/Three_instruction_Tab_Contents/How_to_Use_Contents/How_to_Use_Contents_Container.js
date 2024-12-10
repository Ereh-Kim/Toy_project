import React from "react";

import Client_paragraph from "./Clinet_Slide/Client_paragraph";
import Owner_paragraph from "./Owner_Slide/Owner_paragraph";
import { Mini_Nevbar } from "./Mini_Nevbar/Mini_Nevbar";

export const How_to_Use_Contents_Container = () => {

    return <React.Fragment>

        <Mini_Nevbar paragraph={[Client_paragraph,Owner_paragraph]}/>

    </React.Fragment>

}

export default How_to_Use_Contents_Container