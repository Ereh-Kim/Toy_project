import React from "react";

import { AdvancedMarker } from "@vis.gl/react-google-maps";

import Google_Map_Marker from '../Google_Map_Markers'
import Src from '../../../../../1_image_or_icon/Fock_icon_SearchNear.png'

export const nearbySearch_Result = (props) => {

    const Emiting_Places_Pins = (Places) => {
        return Places.map((place, index)=>{
            return <AdvancedMarker
            key={index}
            position={{ lat:place.location.latitude
                       ,lng:place.location.longitude}}>
            
                <Google_Map_Marker src={Src} width={'10vw'}/>
            </AdvancedMarker>
        })
    }

    return <React.Fragment>

    {Emiting_Places_Pins(props.places)}

    </React.Fragment>

}

export default nearbySearch_Result;