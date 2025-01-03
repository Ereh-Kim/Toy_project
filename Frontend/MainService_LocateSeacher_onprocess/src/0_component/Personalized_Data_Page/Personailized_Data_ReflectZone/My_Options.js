import React from "react";

import Homepage_Btn from './Homepage_Btn.js'

export const My_Options = () => {

    return <React.Fragment>

        <div
        className="Personalize_Data_Page_Container"
        >
            <Homepage_Btn/>

            <div
            className="Personalized_Data_Container_Aligner"
            >
                <span
                className="Personalized_Data_Page_TextTitle"
                >
                My Options
                </span>
                <br></br>

                <span
                className="Personalized_Data_Page_TextTitle"
                >
                This Page
                <br></br>
                is Preparing
                </span>
            

            </div>

        </div>

    </React.Fragment>

}

export default My_Options