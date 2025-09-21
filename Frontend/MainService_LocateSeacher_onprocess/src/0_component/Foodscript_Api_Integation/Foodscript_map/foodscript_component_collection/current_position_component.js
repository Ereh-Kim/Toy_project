import React, { useEffect, useState, useRef } from "react";
import { Marker, Popup } from "react-leaflet";

import L from "leaflet"
import marker_icon from '../../../../1_image_or_icon/Fock_icon.jpg'

export const current_position_marker = (props) =>{

    // const customicon = new L.Icon({
    //     iconUrl: marker_icon,
    //     iconSize: [32, 32],      
    //     iconAnchor: [16, 32],    
    //     popupAnchor: [0, -32],
    // })

    const markerRef = useRef(null);

    useEffect(() => {
        if (markerRef.current) {
        markerRef.current.openPopup(); 
        }
    }, []);

    return <React.Fragment>

    <Marker
    // icon={customicon}
    position={props.position}
    ref={markerRef}
    >
    <Popup>내 위치</Popup>
    </Marker>

    </React.Fragment>

}

export default current_position_marker;