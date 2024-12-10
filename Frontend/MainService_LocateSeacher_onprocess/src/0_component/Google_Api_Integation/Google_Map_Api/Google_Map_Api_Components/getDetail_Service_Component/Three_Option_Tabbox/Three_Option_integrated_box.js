import React from "react";

import Post_Video_btn from './Post_Video'
import Post_Review_Btn from "./Post_reviews";
import Post_Journey_Btn from "./Post_Journey";

export const Three_Option_integrator = () => {

    return <React.Fragment>

    <div
    style={{
        display: "grid",
        gridRowGap: '2.5vh',
        marginTop: '40vh'
    }}
    >
    
    <Post_Video_btn/>
    <Post_Review_Btn/>
    <Post_Journey_Btn/>
    
    </div>

    <br></br>
    </React.Fragment>

}

export default Three_Option_integrator