import React from "react";

import VideoIcon from '../../../../../../1_image_or_icon/video-add-icon.png'

export const Post_Video_Btn = () => {
    return <div
    className="place_detail_ActionBtn"
    >

    <div>
        <span>Add Video</span>
        <br></br>
        <span>About Here</span>

    </div>

    <img
    src={VideoIcon}
    className="place_detail_ActionBtn_Icon"
    >
    </img>

    </div>
}

export default Post_Video_Btn