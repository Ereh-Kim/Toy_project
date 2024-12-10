import React from "react";

import { AdvancedMarker } from "@vis.gl/react-google-maps";

import Google_Map_Marker from '../Google_Map_Markers'
import Src from '../../../../../1_image_or_icon/Fock_icon_SearchNear.png'

export const nearbySearch_Result = (props) => {

    const Emiting_Places_Pins = (Places) => {
        return Places.map((place)=>{
            return <AdvancedMarker
            position={{ lat:place.geometry.location.lat(), lng:place.geometry.location.lng()}}>
            
                <Google_Map_Marker src={Src}/>
            </AdvancedMarker>
        })
    }

    return <React.Fragment>

    {Emiting_Places_Pins(props.places)}

    </React.Fragment>

}

export default nearbySearch_Result;