import React, { useState } from "react";

export const LogInOut_button = (props) => {

    const [ Button , updatestate ] = useState(' Login')
    const ChangeState_Of_Button = () => {

        switch(Button){
            case ' Login': updatestate(' Log Out')
                break
            case ' Log Out': updatestate(' Login')
                break
            }

    }

    return (
        <React.Fragment>

        <div className="LogInOut_button Account_nevbar_child_components" onClick={ChangeState_Of_Button}>
        {Button}
        </div>

        </React.Fragment>
    )
}