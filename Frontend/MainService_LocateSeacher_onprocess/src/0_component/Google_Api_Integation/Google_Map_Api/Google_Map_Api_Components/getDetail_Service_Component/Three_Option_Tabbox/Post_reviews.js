import React from "react";

import ReivewIcon from '../../../../../../1_image_or_icon/Pen_icon.jpg'

export const Post_Review_Btn = (props) => {
    
    return <div
    className="place_detail_ActionBtn"
    onClick= {props.clickEvent}
    >

    <div>
        <span>Add Reviews</span>
        <br></br>
        <span>About Here</span>
    </div>

    <img
    src={ReivewIcon}
    className="place_detail_ActionBtn_Icon"
    >
    </img>

    </div>
}

export default Post_Review_Btn