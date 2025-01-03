
import React from "react";
import { LogInOut_button } from "./Account_nevbar_Components/LogInOut_button";
import { UserState_expresser } from "./Account_nevbar_Components/UserState_expresser";

export const Account_nevbar = () => {
    return(
        <React.Fragment>

        <div id="Account_nevbar">
        <UserState_expresser/>
        <LogInOut_button/>
        </div>

        </React.Fragment>
    )
}

export default Account_nevbar
