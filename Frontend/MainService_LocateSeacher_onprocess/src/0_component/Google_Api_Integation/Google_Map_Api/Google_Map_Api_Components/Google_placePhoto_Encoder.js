import React, { useEffect, useState } from "react";

import STREETADDRESS_ALT_IMG from '../../../../1_image_or_icon/img_street_address_spot.png'

export const Google_placePhoto_Encoder = (props) => {

    const [PHOTOURL, updateURL] = useState('')

    const Encoding_Photo = async (input) => {

        switch(props.in_road){
            
            case(true):
                updateURL(STREETADDRESS_ALT_IMG)
                break;

            case(false):
                await fetch(`/google_map_api/fetch_img_new_ver/${input}`).then( async(res)=>{
                    let result = await res.json()
                    updateURL(result.url)
                })
                break;
            }
        
        
    }

    useEffect(()=>{

        Encoding_Photo(props.spot)

    },[props.spot])

    return <React.Fragment>
    
    <img
    
    style={{
        width: '30vw',
        aspectRatio: '1',
        objectFit: 'cover',
        borderRadius: '10px',
        border: 'solid white 3px',
        justifySelf: 'center',
        margin: '0 3vw'
    }}

    src={PHOTOURL}
    alt="none"
    ></img>

    </React.Fragment>
}

export default Google_placePhoto_Encoder;