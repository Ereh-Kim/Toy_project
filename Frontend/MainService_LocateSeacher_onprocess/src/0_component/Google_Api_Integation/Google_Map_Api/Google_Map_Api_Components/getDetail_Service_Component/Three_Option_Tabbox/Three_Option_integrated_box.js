import React, { useState } from "react";

import Post_Video_btn from './Post_Video'
import Post_Review_Btn from "./Post_reviews";
import Post_Journey_Btn from "./Post_Journey";

import Review_Post_Box from "../../../../../User_Creator_Zone/Review_Post_Box";
import Journey_Post_Box from "../../../../../User_Creator_Zone/Journey_Post_Box";
import Video_Post_Box from "../../../../../User_Creator_Zone/Video_Post_Box";

export const Three_Option_integrator = (props) => {

    console.log(props.placename)

    const [ BtnState, updateBox ] = useState({
        Post_review_box_activated : false,
        Post_video_box_activated : false,
        Post_journey_box_activated : false
    })

    const post_box_btnEvent = (target) =>{
        
        let Renewed_State = {...BtnState}

        let keys = Object.keys(Renewed_State)
        const Delete_index = keys.indexOf(target)
        keys.splice(Delete_index,1)

        keys.forEach((element)=>{
            Renewed_State[element] = false
        })

        switch(Renewed_State[target]){
            case(false):
            Renewed_State[target] = true;
            break;

            default:
            break;
        }

        updateBox({...Renewed_State})
    }

    const Input_Box = () => {

        const key = Object.keys(BtnState)
        const Senser = Object.values(BtnState)

        switch(Senser.includes(true)){
            case(true):
            const index = Senser.indexOf(true)
                switch(key[index]){
                    case('Post_video_box_activated'):
                    return <Video_Post_Box/>

                    case('Post_review_box_activated'):
                    return <Review_Post_Box 
                            placename ={props.placename}
                            PostEvent={()=>{post_box_btnEvent()}}
                            />

                    case('Post_journey_box_activated'):
                    return <Journey_Post_Box/>
                }

            case(false):
            break;
        }
    }

    return <React.Fragment>

    <div
    style={{
        display: "grid",
        gridRowGap: '2.5vh',
     }}
    >

    <Input_Box/>

    
    <Post_Video_btn
    clickEvent={()=>{post_box_btnEvent('Post_video_box_activated')}}
    />

    <Post_Review_Btn
    clickEvent={()=>{post_box_btnEvent('Post_review_box_activated')}}
    />

    <Post_Journey_Btn
    clickEvent={()=>{post_box_btnEvent('Post_journey_box_activated')}}
    />
    
    </div>

    <br></br>
    </React.Fragment>

}

export default Three_Option_integrator