import React from "react";

import JourneyIcon from '../../../../../../1_image_or_icon/Picket_icon.jpg'

export const Post_Journey_Btn = () => {
    return <div
    className="place_detail_ActionBtn"
    >

    <div>
        <span>Add Journey</span>
        <br></br>
        <span>About Here</span>

    </div>

    <img
    src={JourneyIcon}
    className="place_detail_ActionBtn_Icon"
    >
    </img>

    </div>
}

export default Post_Journey_Btn