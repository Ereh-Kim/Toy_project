import React from "react";

import Personal_Content from "./Supporter_Personal/Supports_Personal_Part";
import Business_Content from "./Supporter_Businesses/Supports_Business_Part";

export const Supporter_Contents_Container = () => {

    return<React.Fragment>

        <Business_Content/>
        <Personal_Content/>

    </React.Fragment>

}

export default Supporter_Contents_Container